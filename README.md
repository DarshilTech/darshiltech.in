# DarshilTech — Next.js 15

Premium engineering portfolio for **darshiltech.in** built with Next.js 15 App Router, TypeScript, Tailwind CSS, GSAP, and Lenis smooth scroll. SEO-optimized with structured data, sitemap, robots.txt, and full metadata API.

## 1. Setup

```bash
# Install dependencies
npm install

# Copy env file and fill in your Web3Forms key
cp .env.example .env.local
```

## 2. Web3Forms — How form submissions reach hello@darshiltech.in

The contact form delivers submissions straight to your inbox via [Web3Forms](https://web3forms.com/) — no backend, no signup, free forever.

### One-time setup (takes 30 seconds):

1. Go to **https://web3forms.com/**
2. Enter `hello@darshiltech.in` in the "Create Access Key" box
3. Check your inbox — Web3Forms emails you an access key
4. Open `.env.local` and paste it:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=abc123-your-key-here
   ```
5. Restart the dev server: `npm run dev`

That's it. Every form submission now arrives at `hello@darshiltech.in` with:
- Subject: `New Brief from [Name] — DarshilTech`
- All form fields (name, email, company, engagement type, message)
- Honeypot-protected against bots
- The form shows a custom success state matching the rest of the site

### Verifying it works

Submit the form locally — you'll get an email within seconds. If you don't, check:
- The access key is in `.env.local` (not `.env`)
- The dev server was restarted after adding the key
- Spam folder (first email from Web3Forms sometimes lands there)

## 3. SEO — Already wired in

This site is built for ranking. Every piece is in place:

### Metadata (`app/layout.tsx`)
- Title template with site name fallback
- Description optimized for commerce + Magento + Hyvä keywords
- Full Open Graph + Twitter cards
- Canonical URL
- Robots directives with `max-image-preview: large`
- Theme color, viewport, format detection

### Structured Data / JSON-LD (`lib/structured-data.ts`)
Five schemas inject into every page for rich search results:
- **Organization** — your brand entity
- **ProfessionalService** — service types, area served, price range
- **WebSite** — search action for sitelinks
- **Person** — Darshil Patel as founder, with skills
- **FAQPage** — three Q&As that can appear directly in Google results

### Sitemap (`app/sitemap.ts`)
Auto-generated at `/sitemap.xml`. Submit it to Google Search Console once you're live.

### Robots (`app/robots.ts`)
Auto-generated at `/robots.txt`. Allows everything except `/api/` and Next internals.

### Performance signals Google cares about
- Next.js Image/Font optimization (system fonts swap to web fonts cleanly)
- `display: swap` on all Google Fonts
- `preconnect` to Web3Forms API
- Compressed assets, no powered-by header
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)

### Things to do once deployed
1. **Google Search Console** — add the property, submit `/sitemap.xml`
2. **Google verification** — add the verification code to `app/layout.tsx` → `metadata.verification.google`
3. **Bing Webmaster Tools** — same drill
4. **OG image** — generate a 1200×630 image and drop it at `public/og.jpg`. Until then, social previews fall back to the URL
5. **Favicon set** — replace `public/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-icon.png` with your branded versions
6. **Update social handles** in `lib/site-config.ts` (Twitter, GitHub, LinkedIn URLs)

## 4. Dev commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm start        # Run production build locally
npm run lint     # Lint
```

## 5. Deployment (Vercel — recommended)

```bash
# One-time
npm i -g vercel
vercel

# Subsequent deploys
vercel --prod
```

In the Vercel dashboard, add the env var:
- `NEXT_PUBLIC_WEB3FORMS_KEY` = your access key
- `NEXT_PUBLIC_SITE_URL` = `https://darshiltech.in`

Point your domain at Vercel via DNS, and you're live.

## 6. Project structure

```
darshiltech-next/
├── app/
│   ├── layout.tsx          # Root layout + metadata + JSON-LD
│   ├── page.tsx            # Home page composition
│   ├── globals.css         # Design tokens, grid overlay, animations
│   ├── sitemap.ts          # /sitemap.xml
│   └── robots.ts           # /robots.txt
├── components/
│   ├── Nav.tsx             # Fixed top navigation
│   ├── Hero.tsx            # Animated hero with architecture SVG
│   ├── About.tsx           # Origin story + timeline
│   ├── Expertise.tsx       # 3×3 capability grid
│   ├── Philosophy.tsx      # Workflow + principles
│   ├── Process.tsx         # Six-stage SVG path
│   ├── Insights.tsx        # Editorial card grid + filters
│   ├── Contact.tsx         # Contact section wrapper
│   ├── ContactForm.tsx     # Web3Forms-wired form
│   ├── Footer.tsx
│   ├── SmoothScroll.tsx    # Lenis + GSAP sync
│   └── SectionPrimitives.tsx
├── lib/
│   ├── site-config.ts      # Centralized SEO config
│   └── structured-data.ts  # JSON-LD schemas
├── public/                 # Static assets
└── .env.example
```

## 7. Adding R3F / Three.js later

Per your original spec, when you want to bring in React Three Fiber for the hero architecture visual:

```bash
npm install three @react-three/fiber @react-three/drei
```

Replace the SVG in `components/Hero.tsx → ArchitectureVisual()` with a Canvas component. Wrap it in `next/dynamic` with `ssr: false` to keep the LCP fast:

```tsx
const ArchitectureCanvas = dynamic(() => import('./ArchitectureCanvas'), {
  ssr: false,
  loading: () => <ArchitectureFallbackSVG />,
});
```

The fallback SVG (currently in Hero.tsx) keeps SEO crawlers happy while the 3D scene loads on the client.

## 8. CMS integration later (Directus)

The Insights section is ready for Directus. Replace the hardcoded `insights` array in `components/Insights.tsx` with:

```tsx
async function getInsights() {
  const res = await fetch(`${process.env.DIRECTUS_URL}/items/insights?fields=*&sort=-published_at`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}
```

Then convert `Insights.tsx` to a Server Component (remove `'use client'`, move filter state to a child client component).

---

**Built with intent. Documented as architecture.**
