# Rise at Seven — Frontend Recreation

> Pixel-perfect recreation of [riseatseven.com](https://riseatseven.com/) built with **React + Vite + Tailwind CSS v4**.

![Hero Section Preview](./docs/hero-preview.png)

## 🚀 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Component Library |
| Vite | 6 | Build Tool & Dev Server |
| Tailwind CSS | v4 | Utility-first Styling |
| Framer Motion | latest | Animations & Transitions |
| React Intersection Observer | latest | Scroll-triggered Animations |

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky nav with dropdowns + mobile hamburger
│   ├── Hero.jsx          # Full-screen hero section with brand list
│   ├── TextTicker.jsx    # Animated red marquee strip
│   ├── FeaturedWork.jsx  # Client portfolio grid
│   ├── Services.jsx      # Service tabs + "Chasing Consumers" CTA
│   ├── WhyUs.jsx         # Pillars + stats section
│   ├── WhatsNew.jsx      # Blog cards + newsletter signup
│   └── Footer.jsx        # Full footer with social links
├── App.jsx
├── main.jsx
└── index.css             # Tailwind v4 + custom tokens + animations
```

## 🎨 Design System

- **Primary Color**: `#ff3c00` (Rise Red)
- **Background**: `#0a0a0a` (Near Black)
- **Font**: Inter (Google Fonts)
- **Design Language**: Dark, bold, high-contrast with red accents

## 🖥️ Sections Recreated

1. **Alert Banner** — Red notification bar linking to report
2. **Navbar** — Sticky with mega dropdown menus, badge counter, mobile hamburger
3. **Hero** — Large bold headline, CTAs, brand showcase
4. **Text Ticker** — Animated "Driving Demand & Discovery" marquee
5. **Featured Work** — 9-card portfolio grid with hover effects
6. **Services** — Pill tabs, animated content panel, "Chasing Consumers" CTA
7. **Why Us** — Three pillars (Pioneers, Award Winning, Speed) + stat counters
8. **What's New** — Blog cards with categories + newsletter form
9. **Footer** — Full 4-column footer with offices, social links, legal

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Responsive Breakpoints

| Breakpoint | Size |
|---|---|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

## 🎬 Animations

- **Framer Motion** scroll-triggered fade-in-up on all sections
- **CSS ticker** for the marquee band
- **Hover effects** on work cards (scale + color transitions)
- **Dropdown menus** with smooth fade-in
- **Hamburger** to X morphing transition

## 🔗 Links

- **Live Site**: [riseatseven.com](https://riseatseven.com/)
- **Repository**: [GitHub](https://github.com/SHUVASHIS01/Frontend-for-DeveloperLook)
