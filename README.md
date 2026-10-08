# Fermor 📈

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-v19.0.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-v7.0.2-blue.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.3.3-blue.svg)

> A modern personal finance web application built to bring clarity to personal wealth. 

Fermor bridges the gap between passive transaction spreadsheets and cluttered budgeting apps by helping users understand where they stand, identify high-leverage financial actions, and grow their net worth over time.

## 📑 Table of Contents

- [Overview](#-overview)
- [Design Direction](#-design-direction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Demo Access](#-demo-access)
- [Deployment](#-deployment)
- [License](#-license)

## 📖 Overview

Fermor is designed to be your personal wealth companion. It helps you aggregate your financial data, understand your cash flow, and take actionable steps towards growing your net worth.

## 🎨 Design Direction

The experience is structured around a deliberate product narrative:

$$\textbf{UNDERSTAND} \quad\longrightarrow\quad \textbf{ACT} \quad\longrightarrow\quad \textbf{GROW}$$

1. **Understand**: Aggregates balances, normalizes expenses across accounts, and provides an unencumbered view of liquid cash runway without manual spreadsheet maintenance.
2. **Act**: Synthesizes raw data into prioritized, actionable moves—such as eliminating cash drag on idle checking balances, stopping unused subscription leaks, and sweeping surpluses into yield-bearing accounts.
3. **Grow**: Visualizes compounding momentum, showing how small monthly habit improvements accelerate major financial milestones.

This structure was chosen to guide users from financial uncertainty into actionable clarity and long-term confidence.

## ✨ Features

- **Responsive Homepage**: Polished, editorial layout optimized for mobile (375px+), tablet, and desktop viewports with zero horizontal scrolling.
- **Interactive Dashboard Preview**: Working SVG Bézier trajectory chart with timeframe toggles (`1M`, `6M`, `1Y`, `ALL`), interactive hover inspection crosshairs, and dynamic categorical expense breakdowns.
- **Demo Authentication**: Client-side authentication flow preloaded with a realistic financial profile, seamless login modal, success notifications, and persistent session state.
- **Protected Application Dashboard (`/dashboard`)**: Dedicated authenticated product interface featuring personalized net worth tracking, financial health diagnostics (86/100 *Strong*), actionable recommendations, upcoming milestone goals, and recent activity streams.
- **Financial Insights**: Structured **DATA → INSIGHT → ACTION** cards demonstrating product thinking with working execution and archive states.
- **Goal Simulator**: Dynamic milestone engine with interactive sliders for target amount, accumulated savings, monthly contributions, and an acceleration toggle modeling surplus optimization.
- **Multi-Currency Switcher**: Real-time currency toggle (`₹ INR`, `$ USD`, `€ EUR`) that converts all financial figures consistently across the platform.
- **Accessible & Subtle Motion**: Accessible focus indicators (`focus-visible`), Escape key and click-outside listeners, semantic markup, and `prefers-reduced-motion` compliance.

## 🛠 Tech Stack

- **Frontend**: React 19 SPA with React Router (`react-router-dom`)
- **Language**: Strict TypeScript for type definitions
- **Styling**: Tailwind CSS v4 with custom typographic scales, hairline borders, and warm neutral surfaces
- **Icons**: Lucide React for clean, semantic iconography
- **Charts & Animations**: Pure SVG/CSS (High-precision Bézier curves and radial progress gauges) and Motion for animations.
- **Build Tool**: Vite

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm installed on your local machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vigneshwaran2502/Fermor.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Fermor
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be running on `http://localhost:3000`.

## 🔒 Demo Access

- **Profile**: Rohan K. — Engineer
- **Status**: Authenticated demo session with preloaded financial metrics (Net Worth: ₹12,48,000, 86/100 Financial Health Score).
- **Disclaimer**: All figures and projections are demonstration data illustrative of Fermor's user experience and algorithmic modeling.

## 📦 Deployment

The application is configured as a standalone single-page application ready for deployment to any modern hosting platform (such as Vercel, Netlify, or Cloud Run) using the standard build command:

```bash
# Compile and build production bundle
npm run build

# Preview production build locally
npm run preview
```
The compiled assets will be available in the `dist` directory.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
