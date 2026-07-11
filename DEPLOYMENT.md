# Deployment

## Production
- **Host:** Vercel project `elysianhouse` under the **ElysianHouse** team (owner `zitadeine@gmail.com`), Hobby plan.
- **Domain:** https://www.elysianhouseglobal.com (+ apex).
- **Branch:** `main`. Every push to `main` auto-builds via the Vercel GitHub App.

## Developer mirror
- `sharavis-projects/elysianhouse` → https://elysianhouse.vercel.app (no custom domain).
- Also builds on push; use it to preview/verify a change before it hits production.

## ⚠️ Production deploy rule — commit author

The production Vercel account (Hobby) **blocks** any deployment whose Git commit
author email is not an authorized identity on the account. If a deployment shows
**"Blocked"** in the Vercel dashboard, the commit author is the cause — not the build.

**Rule:** the deploy-triggering commit on `main` must be authored with the
account's deploy identity:

```sh
git -c user.name="Zita Deine" -c user.email="zitadeine@gmail.com" commit -m "…"
git push origin main
```

To ship work that is already merged into `main`, an empty trigger commit is enough:

```sh
git -c user.name="Zita Deine" -c user.email="zitadeine@gmail.com" commit --allow-empty \
  -m "chore(deploy): trigger production build"
git push origin main
```

Everyday feature commits keep the developer's own identity
(`sharavi.ravi@live.com`). Only the deploy-triggering commit on `main` uses the
deploy identity above.

## If a deployment is stuck "Blocked"
1. Confirm the offending commit's author email (`git log -1 --format='%ae'`).
2. Re-trigger with a commit authored as `zitadeine@gmail.com` (see above), **or**
3. In Vercel → the account/project settings, authorize the commit author's email.
