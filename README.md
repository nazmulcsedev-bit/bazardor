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

