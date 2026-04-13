import { Resend } from 'resend'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { normalizeMethod } from '../server/api-lib/http-method.js'
import { resendFromWithDisplayName } from '../server/api-lib/resend-from.js'

const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY_FORMS || process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY_FORMS or RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

function sanitizeInput(input: string): string {
  const withoutHtml = input.replace(/<[^>]*>/g, '')
  return withoutHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

function validateAndSanitizeFormData(data: Record<string, string>): {
  isValid: boolean
  sanitized: Record<string, string>
  errors: string[]
} {
  const errors: string[] = []
  const sanitized: Record<string, string> = {}

  const requiredFields = ['firstName', 'lastName', 'email', 'vision']

  requiredFields.forEach((field) => {
    const value = data[field]
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      const fieldName =
        field === 'firstName'
          ? 'First name'
          : field === 'lastName'
            ? 'Last name'
            : field === 'email'
              ? 'Email'
              : 'Message'
      errors.push(`${fieldName} is required`)
    } else {
      sanitized[field] = sanitizeInput(value.trim())
    }
  })

  if (data.email && typeof data.email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email.trim())) {
      errors.push('Invalid email format')
    }
  }

  if (data.phone && typeof data.phone === 'string' && data.phone.trim().length > 0) {
    sanitized.phone = sanitizeInput(data.phone.trim())
  }

  if (data.service && typeof data.service === 'string' && data.service.trim().length > 0) {
    sanitized.service = sanitizeInput(data.service.trim())
  }

  if (data.requestedService && typeof data.requestedService === 'string' && data.requestedService.trim().length > 0) {
    sanitized.requestedService = sanitizeInput(data.requestedService.trim())
    if (sanitized.requestedService.length > 500) {
      errors.push('Interest description exceeds maximum length')
    }
  }

  if (sanitized.firstName && sanitized.firstName.length > 100) {
    errors.push('First name exceeds maximum length')
  }
  if (sanitized.lastName && sanitized.lastName.length > 100) {
    errors.push('Last name exceeds maximum length')
  }
  if (sanitized.email && sanitized.email.length > 255) {
    errors.push('Email exceeds maximum length')
  }
  if (sanitized.vision && sanitized.vision.length > 5000) {
    errors.push('Message exceeds maximum length')
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  }
}

function formatEmailBody(data: Record<string, string>): string {
  let body = 'New Elysian House contact form submission\n\n'
  if (data.requestedService) {
    body += `Interest: ${data.requestedService}\n\n`
  }
  body += `First name: ${data.firstName || 'Not provided'}\n`
  body += `Last name: ${data.lastName || 'Not provided'}\n`
  body += `Email: ${data.email || 'Not provided'}\n`
  body += `Phone: ${data.phone || 'Not provided'}\n\n`
  body += `Message:\n${data.vision || 'Not provided'}\n`
  return body
}

function parseContactToEmails(): string[] {
  const raw = process.env.CONTACT_TO_EMAIL?.trim()
  if (!raw) return []
  return raw
    .split(/[\s,]+/)
    .map((e) => e.trim())
    .filter(Boolean)
}

/** When true, send with Resend's test sender. Recipients must be allowed by Resend (typically the account owner email). */
function contactUseResendSandbox(): boolean {
  return /^(1|true|yes)$/i.test((process.env.CONTACT_USE_RESEND_SANDBOX || '').trim())
}

/** Bare address from `Name <addr@domain>` or `addr@domain` (lowercase). */
function envelopeAddressFromFromField(from: string): string | null {
  const t = from.trim()
  const bracket = t.match(/<([^>]+)>\s*$/)
  if (bracket) return bracket[1].trim().toLowerCase()
  if (/^[^\s<]+@[^\s<]+\.[^\s<>]+$/.test(t)) return t.toLowerCase()
  return null
}

/** Domains Resend will not accept as verified "from" (use your site domain instead). */
function isConsumerMailboxDomain(address: string): boolean {
  const at = address.lastIndexOf('@')
  if (at < 0) return false
  const domain = address.slice(at + 1)
  const blocked = new Set([
    'gmail.com',
    'googlemail.com',
    'live.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'icloud.com',
    'me.com',
  ])
  return blocked.has(domain)
}

const RESEND_CONFIG_HINT =
  'Set CONTACT_FORM_EMAIL or CONTACT_FROM_EMAIL (or NEWSLETTER_FROM_EMAIL) to an address on your verified Resend domain, e.g. Elysian House <hello@elysianhouseglobal.com>. CONTACT_TO_EMAIL can remain your personal inbox. For test sends only: CONTACT_USE_RESEND_SANDBOX=true and CONTACT_TO_EMAIL = your Resend login email.'

function getCorsHeaders(origin: string | null) {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://www.elysianhouseglobal.com',
    'https://elysianhouseglobal.com',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean) as string[]

  const isVercelPreview = origin && origin.includes('.vercel.app')
  const allowedOrigin =
    origin && (allowedOrigins.includes(origin) || isVercelPreview)
      ? origin
      : (allowedOrigins[0] || '*')

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = normalizeMethod(req)

  const origin = (req.headers.origin || req.headers.Origin || '*') as string | null
  const corsHeaders = getCorsHeaders(origin)
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  if (method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const to = parseContactToEmails()
  if (to.length === 0) {
    return res.status(500).json({
      error: 'Email delivery is not configured',
      details: 'Set CONTACT_TO_EMAIL in the server environment to one or more recipient addresses.',
    })
  }

  try {
    let rawBody: Record<string, unknown> = {}
    if (req.body != null) {
      try {
        rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body as Record<string, unknown>)
      } catch (parseErr) {
        console.error('Body parse error:', parseErr)
        return res.status(400).json({ error: 'Invalid request body', details: 'JSON could not be parsed' })
      }
    }
    const body: Record<string, string> = {}
    for (const [k, v] of Object.entries(rawBody)) {
      body[k] = v != null && typeof v === 'string' ? v : String(v ?? '')
    }

    const { isValid, sanitized, errors } = validateAndSanitizeFormData(body)

    if (!isValid) {
      return res.status(400).json({ error: 'Validation failed', errors })
    }

    let resend
    try {
      resend = getResend()
    } catch (resendError) {
      console.error('Resend initialization error:', resendError)
      return res.status(500).json({
        error: 'Email service is not configured',
        details:
          resendError instanceof Error ? resendError.message : 'RESEND_API_KEY missing',
      })
    }

    const emailBody = formatEmailBody(sanitized)

    // Align with PeeApproved-Editorial-Website: always resolve "from" from env unless sandbox is explicit.
    // (Do not tie to VERCEL_ENV — Preview deployments must use the same verified-domain From as Production.)
    const useResendSandbox = contactUseResendSandbox()

    let from: string
    if (useResendSandbox) {
      from = 'Elysian House <onboarding@resend.dev>'
    } else {
      from = (process.env.CONTACT_FORM_EMAIL || process.env.CONTACT_FROM_EMAIL)?.trim() ?? ''
      if (!from) {
        const newsletterFrom = process.env.NEWSLETTER_FROM_EMAIL?.trim()
        if (newsletterFrom && newsletterFrom.includes('@')) {
          from = resendFromWithDisplayName('Elysian House', newsletterFrom)
        }
      }
      if (!from) {
        return res.status(500).json({
          error: 'Contact form email not configured',
          details: RESEND_CONFIG_HINT,
        })
      }
      const bare = envelopeAddressFromFromField(from)
      if (bare && isConsumerMailboxDomain(bare)) {
        return res.status(500).json({
          error: 'Invalid contact form sender configuration',
          details: `Resend cannot send with "${bare}" as the From address. ${RESEND_CONFIG_HINT}`,
        })
      }
    }

    let emailResult
    try {
      emailResult = await resend.emails.send({
        from,
        to,
        subject: 'New Elysian House contact form submission',
        text: emailBody,
      })
    } catch (sendError) {
      console.error('Resend send error:', sendError)
      const detailMsg =
        sendError instanceof Error
          ? sendError.message
          : typeof sendError === 'object' &&
              sendError !== null &&
              'message' in sendError
            ? String((sendError as { message: unknown }).message)
            : typeof sendError === 'string'
              ? sendError
              : 'Unknown send error'
      const domainHint =
        /domain is not verified|verify your domain/i.test(detailMsg) ? ` ${RESEND_CONFIG_HINT}` : ''
      return res.status(500).json({
        error: 'Failed to send email',
        details: detailMsg + domainHint,
      })
    }

    if (!emailResult) {
      console.error('No result from Resend')
      return res.status(500).json({ error: 'Failed to send email', details: 'No response from email service' })
    }

    const { data, error } = emailResult

    if (error) {
      console.error('Resend API error:', error)
      const detailMsg =
        typeof error === 'string'
          ? error
          : typeof error === 'object' && error !== null && 'message' in error
            ? String((error as { message: unknown }).message)
            : JSON.stringify(error)
      const domainHint = /domain is not verified|verify your domain/i.test(detailMsg) ? ` ${RESEND_CONFIG_HINT}` : ''
      return res.status(500).json({
        error: 'Failed to send email',
        details: detailMsg + domainHint,
      })
    }

    return res.status(200).json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error('API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    return res.status(500).json({
      error: 'Internal server error',
      details: errorMessage,
      ...(process.env.NODE_ENV === 'development' && errorStack ? { stack: errorStack } : {}),
    })
  }
}
