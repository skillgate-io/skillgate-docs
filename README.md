# SkillGate Docs (`docs.skillgate.io`)

Enterprise-grade documentation site starter for SkillGate.

## Canonical URLs

- `/rules`
- `/policy`

These routes are first-class and should remain stable.

## Local Development

```bash
npm install
npm run dev
```

## Quality Gates

```bash
npm run lint
npm run type-check
npm run build
```

## Deploy (Local Script + Netlify)

This repo is configured for local operator-driven deploys (not GitHub auto-deploy).

```bash
# one-time: link local folder to your Netlify site
netlify link

# preview deploy
./deploy.sh preview

# production deploy
./deploy.sh prod
```

`deploy.sh` runs Netlify builds and publishes using your local Netlify CLI session.

## Governance

- CODEOWNERS at `.github/CODEOWNERS`
- CI checks in `.github/workflows/ci.yml`
- Link checks in `.github/workflows/link-check.yml`
- Security checks in `.github/workflows/security.yml`
- No GitHub deploy workflow (deployment is local-script only)

## DNS Cutover

Point `docs.skillgate.io` CNAME to your hosting provider target and verify TLS before changing product links.

## License

Proprietary. All rights reserved. See [LICENSE](./LICENSE).
