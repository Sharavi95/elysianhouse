/**
 * Single Vercel serverless entry for /api/* routes.
 * Handlers live in api/_*.ts (underscore = not deployed as separate functions).
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

/** Matches @vercel/node handlers that return after chaining on `res` (e.g. `return res.status(200).json(...)`). */
type ApiHandler = (
  req: VercelRequest,
  res: VercelResponse,
) => void | VercelResponse | Promise<void | VercelResponse>
type ApiHandlerLoader = () => Promise<{ default: ApiHandler }>

const routes: Record<string, ApiHandlerLoader> = {
  'send-contact': () => import('./_send-contact.js'),
}

function getRouteKey(req: VercelRequest): string {
  const q = req.query.path
  if (Array.isArray(q)) return q[0] || ''
  if (typeof q === 'string') return q.split('/')[0] || ''
  let pathname = (req.url || '').split('?')[0] || ''
  try {
    if (pathname.startsWith('http')) pathname = new URL(pathname).pathname
  } catch {
    /* keep pathname */
  }
  const m = pathname.match(/^\/api\/([^/?]+)/)
  return m ? m[1] : ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = getRouteKey(req)
  const loadHandler = routes[key]
  if (!loadHandler) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  try {
    const mod = await loadHandler()
    return mod.default(req, res)
  } catch (error) {
    console.error(`Route load failed for "${key}":`, error)
    return res.status(500).json({
      error: 'Route module failed to load',
      details: error instanceof Error ? error.message : 'Unknown module load error',
      route: key,
    })
  }
}
