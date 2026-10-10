# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দাম এক নজরে — a Bangla grocery price tracker showing daily prices, rises/falls and market-wise comparison.

## Technologies
Next.js 14 (App Router) · Tailwind CSS · DaisyUI · BetterAuth (email/password, Google, GitHub) · PostgreSQL (`pg`) · react-hot-toast

## Features
1. Responsive UI for mobile, tablet and desktop with Bangla date navbar and infinite price-ticker marquee
2. Home page with top-6 risers, top-6 fallers and an all-products grid (Bengali numerals, ▲/▼ badges)
3. Category pages with skeleton loading, 404-style empty state and a numeric-correct sort dropdown
4. Protected product detail page with min / max / average and bazar-wise prices
5. BetterAuth authentication (email/password + Google + GitHub) with toast feedback
6. Profile page with Update Name (BetterAuth `updateUser`) and a friendly global 404 page

## Setup
```bash
npm install
cp .env.example .env.local      # fill in the values
npx @better-auth/cli migrate    # create auth tables in your Postgres DB
npm run dev
```
OAuth callback URLs: `<APP_URL>/api/auth/callback/google` and `/github`.

## Deploy (Vercel)
Add every variable from `.env.example` in Vercel (set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the live domain) and add the live callback URLs in the Google/GitHub consoles.

## API
`https://api.api-store.workers.dev/api/bazardor` (fallback: `api.abcz.workers.dev`). If field names differ, adjust `normalize()` in `lib/api.js`.
