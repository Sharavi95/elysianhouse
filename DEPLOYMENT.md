# Deployment

## Production
- **Host:** Vercel project `elysianhouse` under the **ElysianHouse** team (Hobby plan).
- **Domain:** https://www.elysianhouseglobal.com (+ apex `elysianhouseglobal.com`).
- **Branch:** `main`. Every push/merge to `main` auto-builds via the Vercel GitHub
  App (~20s) and is promoted to production automatically.

## ⚠️ The repo must stay PUBLIC

This is the load-bearing rule. **Vercel's Hobby plan does not allow deployments
from non-owner commit authors on _private_ repositories.** While the repo is
private, only the Vercel account owner's commits build — everyone else's are
**"Blocked"** with:

> "The deployment was blocked because the commit author did not have contributing
> access to the project on Vercel. The Hobby Plan does not support collaboration
> for private repositories."

Keeping `Sharavi95/elysianhouse` **public** sidesteps this entirely — Hobby
deploys public repos from **any** author. That is the working setup, and it's how
production deployed successfully.

**Do not switch the repo to private** unless the account is first upgraded to
**Pro** (Pro supports private-repo collaboration / team members). Making it
private again will silently break every non-owner deploy.

> No secrets live in the repo — the `api/` functions read them from Vercel
> environment variables — so a public repo does not expose credentials.

## How to deploy

- **Normal:** push or merge to `main`. Vercel builds and promotes automatically.
- **Manual re-trigger (main already correct):** fire the deploy hook —
  ```sh
  curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
  ```
  Keep the hook URL in `~/.secrets` / an env var — **never commit it**.
- **CLI (owner token), bypasses Git entirely:**
  ```sh
  vercel deploy --prod \
    --token="$(cat ~/.secrets/elysianhouse-vercel-token.txt)" \
    --scope=elysian-house
  ```

## Developer mirror
- `sharavis-projects/elysianhouse` → https://elysianhouse.vercel.app (no custom
  domain). Owned by the developer, so it builds on every push regardless of repo
  visibility — use it to preview/verify a change before/independent of production.

## Troubleshooting a "Blocked" deployment
1. **"commit author did not have contributing access"** → the repo went
   **private**. Make it public again (GitHub → Settings → General → Danger Zone →
   Change visibility → Public), or upgrade the Vercel account to Pro.
2. **Stuck `UNKNOWN` / build never runs (0 ms)** → check for an **"Action
   required"** banner on the Vercel account and resolve it (usage / billing /
   verification).
