/**
 * Build a Resend "from" string from an env value that may be
 * `Name <email@domain>` or a plain `email@domain`.
 */
export function resendFromWithDisplayName(displayName: string, fromEnv: string): string {
  const trimmed = fromEnv.trim()
  if (!trimmed) return trimmed
  if (trimmed.includes('<')) {
    return trimmed.replace(/^[^<]*/, `${displayName.trim()} `).replace(/\s+/g, ' ').trim()
  }
  if (trimmed.includes('@')) {
    return `${displayName.trim()} <${trimmed}>`
  }
  return trimmed
}
