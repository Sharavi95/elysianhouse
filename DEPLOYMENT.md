# Deployment

## Production
- **Host:** Vercel project `elysianhouse` under the **ElysianHouse** team (Hobby plan).
- **Domain:** https://www.elysianhouseglobal.com (+ apex `elysianhouseglobal.com`).
- **Source branch:** `main`.

## The two Hobby-plan facts that govern deploys

This project is a **private-repo-turned-public commercial site on a Hobby plan**,
which produces two non-obvious constraints. Both are verified from real deploys:

1. **The repo must stay PUBLIC.** On Hobby, builds for a *private* repo are
   blocked for any commit author who isn't the Vercel account owner
   ("commit author did not have contributing access… Hobby does not support
   collaboration for private repositories"). Public repos build fine. **Do not
   set the repo private** unless the account is upgraded to Pro.

2. **A normal `git push` does NOT deploy production.** Even with the repo public,
   the Vercel Git integration blocks pushes whose author (`Sharavi95`) isn't an
   owner/member of the Hobby account — the deployment shows **"Deployment was
   blocked" / "Git author must have access."** Pushing to `main` is still correct
   for source control; it just won't publish the site.

> No secrets live in the repo (the `api/` functions read them from Vercel env
> vars), so a public repo does not expose credentials.

## How to actually deploy production

Trigger a build under the **project's own authority**, which is not gated on the
commit author:

- **Deploy hook (primary):** builds the latest `main`.
  ```sh
  curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
  ```
  Keep the hook URL in `~/.secrets` / an env var — **never commit it.**

- **Owner-token CLI (alternative):**
  ```sh
  vercel deploy --prod \
    --token="$(cat ~/.secrets/elysianhouse-vercel-token.txt)" \
    --scope=elysian-house
  ```
  (Token generated from the ElysianHouse account → Settings → Tokens.)

After either, confirm the new deployment is `Ready` and aliased to
`www.elysianhouseglobal.com`.

## Developer mirror
- `sharavis-projects/elysianhouse` → https://elysianhouse.vercel.app (no custom
  domain). The developer owns this project, so it **does** build on every `git
  push` — use it to preview/verify before triggering production.

## The permanent fix
The push-to-deploy workflow only returns if the account is **upgraded to Pro** and
`Sharavi95` is added as a team member (Pro supports private repos + collaborators).
Until then, deploy production via the hook/CLI above.

## Troubleshooting
- **"commit author did not have contributing access"** → repo went private; make
  it public (GitHub → Settings → Danger Zone → visibility), or upgrade to Pro.
- **Build stuck `UNKNOWN` / never runs (0 ms)** → check for an **"Action
  required"** banner on the Vercel account (billing/usage/verification).
