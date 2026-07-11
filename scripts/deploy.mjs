// Trigger a production deploy of `main` via the Vercel Deploy Hook.
//
// A plain `git push` does NOT publish this site (Hobby plan blocks the commit
// author) — see DEPLOYMENT.md. The deploy hook builds under the project's own
// authority, which is the working path.
//
// The hook URL is a SECRET and is never stored in the repo. It is read from:
//   1. the VERCEL_DEPLOY_HOOK_URL environment variable, or
//   2. ~/.secrets/elysianhouse-deploy-hook.txt
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

function loadHookUrl() {
  const fromEnv = process.env.VERCEL_DEPLOY_HOOK_URL?.trim()
  if (fromEnv) return fromEnv

  const secretPath = join(homedir(), '.secrets', 'elysianhouse-deploy-hook.txt')
  try {
    return readFileSync(secretPath, 'utf8').trim()
  } catch {
    console.error(
      'No deploy hook URL found.\n' +
        'Set VERCEL_DEPLOY_HOOK_URL, or put the hook URL in:\n  ' +
        secretPath,
    )
    process.exit(1)
  }
}

const url = loadHookUrl()
console.log('Triggering production deploy via Vercel deploy hook…')

const res = await fetch(url, { method: 'POST' })
const body = await res.text()

if (!res.ok) {
  console.error(`Deploy hook failed (HTTP ${res.status}):\n${body}`)
  process.exit(1)
}

console.log(body)
console.log(
  '\nBuild queued. Track it in the Vercel dashboard — production is https://www.elysianhouseglobal.com',
)
