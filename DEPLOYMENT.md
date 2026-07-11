# Deployment

## Production
- **Host:** Vercel project `elysianhouse` under the **ElysianHouse** team (Hobby plan).
- **Domain:** https://www.elysianhouseglobal.com (+ apex).
- **Branch:** `main`. Every push to `main` auto-builds via the Vercel GitHub App.

## Developer mirror
- `sharavis-projects/elysianhouse` → https://elysianhouse.vercel.app (no custom domain).
- Also builds on push; use it to preview/verify a change before it hits production.

## Deploy rule — commit author

The production build can show **"Blocked"** when the Git commit author email is
not a recognised member of the Vercel account. Deploy-triggering commits on
`main` must be authored with the developer's **Vercel member email**:

```sh
git -c user.name="Sharavi" -c user.email="sharavi.ravi@live.com" commit -m "…"
git push origin main
```

To ship work already merged into `main`, an empty trigger commit is enough:

```sh
git -c user.name="Sharavi" -c user.email="sharavi.ravi@live.com" commit --allow-empty \
  -m "chore(deploy): trigger production build"
git push origin main
```

> Do **not** author deploy commits as the account owner's personal email — use
> your own authorised member email above.

## Alternative — deploy hook
The project has a Deploy Hook that builds `main` under the project's own
authority (no Git author needed). POST to it to trigger a production build:

```sh
curl -X POST "$VERCEL_DEPLOY_HOOK_URL"
```

Keep the hook URL in `~/.secrets` / an env var — never commit it.

## If a deployment is stuck "Blocked"
1. Check the account isn't flagged — an **"Action required"** banner in the Vercel
   dashboard blocks production builds at the account level (usage/limits/payment).
   Clear it first.
2. Confirm the commit author email (`git log -1 --format='%ae'`) is a Vercel member.
3. Re-trigger with an authorised author (above) or the deploy hook.
