# Fermor

## Overview

Fermor is a modern personal finance web application built to bring clarity to personal wealth. It bridges the gap between passive transaction spreadsheets and cluttered budgeting apps by helping users understand where they stand, identify high-leverage financial actions, and grow their net worth over time.

## Design Direction

The experience is structured around a deliberate product narrative:

$$\textbf{UNDERSTAND} \quad\longrightarrow\quad \textbf{ACT} \quad\longrightarrow\quad \textbf{GROW}$$

1. **Understand**: Aggregates balances, normalizes expenses across accounts, and provides an unencumbered view of liquid cash runway without manual spreadsheet maintenance.
2. **Act**: Synthesizes raw data into prioritized, actionable moves—such as eliminating cash drag on idle checking balances, stopping unused subscription leaks, and sweeping surpluses into yield-bearing accounts.
3. **Grow**: Visualizes compounding momentum, showing how small monthly habit improvements accelerate major financial milestones.

This structure was chosen to guide users from financial uncertainty into actionable clarity and long-term confidence.

## Features

- **Responsive Homepage**: Polished, editorial layout optimized for mobile (375px+), tablet, and desktop viewports with zero horizontal scrolling.
- **Interactive Dashboard Preview**: Working SVG Bézier trajectory chart with timeframe toggles (`1M`, `6M`, `1Y`, `ALL`), interactive hover inspection crosshairs, and dynamic categorical expense breakdowns.
- **Demo Authentication**: Client-side authentication flow preloaded with a realistic financial profile, seamless login modal, success notifications, and persistent session state.
- **Protected Application Dashboard (`/dashboard`)**: Dedicated authenticated product interface featuring personalized net worth tracking, financial health diagnostics (86/100 *Strong*), actionable recommendations, upcoming milestone goals, and recent activity streams.
- **Financial Insights**: Structured **DATA → INSIGHT → ACTION** cards demonstrating product thinking with working execution and archive states.
- **Goal Simulator**: Dynamic milestone engine with interactive sliders for target amount, accumulated savings, monthly contributions, and an acceleration toggle modeling surplus optimization.
- **Multi-Currency Switcher**: Real-time currency toggle (`₹ INR`, `$ USD`, `€ EUR`) that converts all financial figures consistently across the platform.
- **Accessible & Subtle Motion**: Accessible focus indicators (`focus-visible`), Escape key and click-outside listeners, semantic markup, and `prefers-reduced-motion` compliance.

## Tech Stack

- **React**: React 19 SPA with React Router (`react-router-dom`)
- **TypeScript**: Strict type definitions for financial data, authentication, and layout states
- **Tailwind CSS**: Tailwind CSS v4 with custom typographic scales, hairline borders, and warm neutral surfaces
- **Lucide React**: Clean, semantic iconography
- **Pure SVG/CSS**: High-precision Bézier curves and radial progress gauges with zero heavy external charting dependencies

## Local Setup

```bash
# Install dependencies
npm install

# Start development server (runs on port 3000)
npm run dev
```

## Production Build

```bash
# Compile and build production bundle
npm run build

# Preview production build locally
npm run preview
```

## Demo Access

- **Profile**: Rohan K. — Engineer
- **Status**: Authenticated demo session with preloaded financial metrics (Net Worth: ₹12,48,000, 86/100 Financial Health Score).
- **Disclaimer**: All figures and projections are demonstration data illustrative of Fermor's user experience and algorithmic modeling.

## Deployment

The application is configured as a standalone single-page application ready for deployment to any modern hosting platform (such as Vercel, Netlify, or Cloud Run) using the standard build command `npm run build` and output directory `dist`.
