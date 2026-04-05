import type { VercelRequest } from '@vercel/node'

/** Normalize method: some proxies send lowercase; strict === 'POST' would wrongly 405. */
export function normalizeMethod(req: VercelRequest): string {
  return String(req.method ?? 'GET').toUpperCase()
}
