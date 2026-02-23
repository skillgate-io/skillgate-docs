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

## Deploy (GitHub + Vercel)

Set repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

`deploy.yml` publishes `main` to production.

## Governance

- CODEOWNERS at `.github/CODEOWNERS`
- CI checks in `.github/workflows/ci.yml`
- Link checks in `.github/workflows/link-check.yml`
- Security checks in `.github/workflows/security.yml`

## DNS Cutover

Point `docs.skillgate.io` CNAME to your hosting provider target and verify TLS before changing product links.
