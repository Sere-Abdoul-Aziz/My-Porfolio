# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on http://localhost:3005 (not 3000)
npm run build      # Build → .output/
npm run preview    # Preview production build locally
npm run start      # Run production build (node .output/server/index.mjs)
```

**Production deployment** (run on server at `/srv/Dev/Perso/My-Porfolio/myporfolio`):
```bash
./deploy.sh        # git pull + build + pm2 restart
pm2 restart portfolio
pm2 logs portfolio
```

No test suite exists in this project.

## Architecture

### Page composition
`app.vue` → splash screen + `<router-view />` → `pages/index.vue` → `pages/home.vue`

`pages/home.vue` is the main composition file — it imports and assembles all section components in order: `AnimatedBackground`, `IcebergImage`, `GlassBox`, `ProjectsSection`, `InteractiveDeveloperSection`, `ServiceSection`, `TechnologiesSection`, `CertificationsSection`, `ExperienceSection`, `LanguagesSection`, `CtaSection`, `Footer`.

Nuxt file-based routing is used, but `pages/index.vue` simply re-exports `pages/home.vue`. The `layouts/default.vue` and `router/index.js` are legacy files not actively used by Nuxt.

### SSR
`ssr: false` in `nuxt.config.ts` — this is a client-side SPA. Only `/api/**` routes have SSR enabled via `routeRules`. Static prerendering is configured only for `/`.

### Animation stack
- **GSAP + ScrollTrigger** — used in `pages/home.vue` for entry animations (H1/H2 fade-in, GlassBox), and in most section components for scroll-triggered effects.
- **Three.js + RoundedBoxGeometry + OrbitControls** — used in `TechnologiesSection.vue` for the 3D cube grid with vortex scroll interaction.
- Always register ScrollTrigger: `gsap.registerPlugin(ScrollTrigger)` before use.

### Styling
Tailwind CSS (v3) with no custom theme extensions. Scoped `<style scoped>` blocks per component. Global styles in `assets/css/main.css`. Fonts loaded manually via Google Fonts link (Fira Code + Inter) — not via `@nuxtjs/google-fonts` module.

### Analytics / GDPR
Consent-based GTM setup (`GTM-W6X7JWVF`). Two client plugins orchestrate this:
- `plugins/google-analytics.client.js` — initialises `window.dataLayer` and `window.gtag`, sets consent `denied` by default (GDPR), provides `$gtag` and `$gtagId`.
- `plugins/analytics-consent.client.js` — reads `localStorage('analytics-consent')` and grants/denies `analytics_storage` accordingly, provides `$analyticsConsent`.

The `composables/useAnalytics.js` composable wraps `trackEvent`, `trackPageView`, etc., all conditional on consent.

### Production infrastructure
- **PM2** (`ecosystem.config.cjs`): process name `portfolio`, port `3003`, fork mode (1 instance), logs in `./logs/`.
- **Nginx** (`nginx-azizsere-eveilon.conf`): HTTPS on `azizsere.eveilon.com`, serves `.output/public` for static files, proxies everything else to `127.0.0.1:3003`. SSL via Certbot/Let's Encrypt.
