# DeveloperLook — Frontend

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://developerlookfrontendproject.netlify.app/)

> A high-fidelity frontend recreation of [riseatseven.com](https://riseatseven.com/), built with **React 19 + Vite + Tailwind CSS v4 + GSAP**.

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Component Library |
| Vite | 8 | Build Tool & Dev Server |
| Tailwind CSS | v4 | Utility-first Styling |
| Framer Motion | 12 | Page Animations & Transitions |
| GSAP + ScrollTrigger | 3 | Scroll-driven Animations & Pinning |
| React Intersection Observer | 10 | Viewport-based Reveal Animations |

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Sticky smart header with mega-menu dropdowns & mobile hamburger
│   ├── Hero.jsx             # Full-screen hero with dynamic background image & award badges
│   ├── BrandsIntro.jsx      # Brand logos / introductory strip
│   ├── FeaturedWork.jsx     # GSAP-pinned dual-scroll client portfolio (desktop)
│   ├── Services.jsx         # Services section
│   ├── ChasingMarquee.jsx   # Animated horizontal marquee ticker
│   ├── WhyUs.jsx            # Why Us / pillars section
│   ├── WhatsNew.jsx         # What's New / latest content section
│   ├── ReadyToScroll.jsx    # Desktop-only scroll-driven text animation (GSAP)
│   ├── ScrollRevealText.jsx # Reusable scroll-reveal text component
│   ├── TextTicker.jsx       # Animated text ticker utility
│   └── Footer.jsx           # Full footer with offices, social links & legal
├── App.jsx
├── main.jsx
├── index.css                # Tailwind v4 base + custom design tokens + animations
└── responsive.css           # Responsive layout overrides
```

## 🎨 Design System

- **Primary Accent**: `#b2f6e3` (Mint Green)
- **Background**: `#efeeec` (Off-White / Warm Gray)
- **Dark Surface**: `#0d0d0d` / `#121212`
- **Font**: Custom `saans` font with system-ui fallback
- **Design Language**: Clean, minimal, high-contrast with smooth scroll animations

## 🖥️ Sections

1. **Alert Banner** — Mint green notification bar linking to report
2. **Navbar** — Sticky smart header (hides on scroll down, reveals on scroll up) with animated mega-menu dropdowns, badge counter, and mobile full-screen hamburger menu
3. **Hero** — Full-screen dark hero with randomised background image, award badge strip, and animated headline
4. **Brands Intro** — Introductory brand/partner strip
5. **Featured Work** — GSAP `ScrollTrigger` pinned dual-scroll layout (left: client name list, right: synced image stack) with hover overlay effects — desktop only
6. **Services** — Services overview section
7. **Chasing Marquee** — Infinite horizontal scrolling ticker
8. **Why Us** — Key differentiators / pillars section
9. **What's New** — Latest content / blog section with GSAP animations
10. **Ready To Scroll** — Desktop-only scroll-driven GSAP text animation
11. **Footer** — 4-column footer with global offices, social links, and legal copy

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## 📱 Responsive Breakpoints

| Breakpoint | Size | Notes |
|---|---|---|
| Mobile | ≤ 768px | Static stacked layout, no GSAP pinning |
| Tablet | 769px – 1024px | GSAP pinned, full-card images |
| Desktop | > 1024px | Full dual-scroll pinned layout |

## 🎬 Animations

- **GSAP ScrollTrigger** — Pinned dual-scroll for Featured Work section; instant animation start on scroll entry
- **GSAP Scrub Timeline** — Synchronized left/right column transitions between work items
- **Framer Motion** — Navbar mega-menu fade/scale, hero section entrance, mobile menu
- **Smart Navbar** — Hides on scroll down (>150px), re-appears instantly on scroll up
- **Custom Cursor** — Mint circle cursor activates on Featured Work card hover
- **Hover Effects** — Image scale, colour overlay, and caption reveal on work cards
- **CSS Marquee** — Infinite horizontal ticker animation

## 🚀 Deployment

Deployed on **Netlify** via `netlify.toml`. Every push to `main` triggers an automatic redeployment.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔗 Links

- **🌐 Live Site**: [developerlookfrontendproject.netlify.app](https://developerlookfrontendproject.netlify.app/)
- **Reference Site**: [riseatseven.com](https://riseatseven.com/)
- **Repository**: [GitHub](https://github.com/SHUVASHIS01/Frontend-for-DeveloperLook)
