# Act Website

Public site for Act, built with React + Vite, with content loaded from Sanity.

## Requirements

- Node.js 20+
- npm

## Frontend: local setup

```bash
npm ci
cp .env.example .env
npm run dev
```

## Frontend: production build

```bash
npm run build
npm run preview
```

## Environment variables

Defaults are in `.env.example`:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`
- `VITE_SANITY_HOME_PAGE_ID`

## Sanity Studio (`innhold/`)

```bash
cd innhold
npm ci
npm run dev
```

Deploy Studio:

```bash
cd innhold
npm run deploy
```

## Deployment (GitHub Pages)

- Push to `main` triggers `.github/workflows/deploy.yml`
- Frontend output is deployed from `dist/`
- Vite uses `base: "./"` so asset paths work for both repo pages and custom-domain root hosting
