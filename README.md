# Fermor

Fermor is a modern personal finance web application built to bring clarity to personal wealth. It bridges the gap between passive transaction spreadsheets and cluttered budgeting apps by helping users understand where they stand, identify high-leverage financial actions, and grow their net worth over time.

## Preview

![Fermor Homepage](./screenshots/homepage.png)

**Live Demo:** [Add deployed URL here]

**GitHub:** [Add repository URL here]

## About the Project

This project is a new homepage and product experience concept for Fermor, a fintech platform focused on helping users understand their finances, take meaningful actions, and grow financially. 

The core product narrative is designed to guide users sequentially:
**Understand → Act → Grow**

## Design Direction

The homepage was intentionally designed from the ground up, rather than following a fixed template, to establish a unique and compelling brand identity. Key design decisions include:

- Premium fintech visual language
- Calm and trustworthy aesthetic
- Strong typography for numerical clarity
- Generous whitespace to reduce cognitive load
- Purposeful financial data visualization
- Warm neutral background
- Deep ink/green palette representing growth and stability
- Clear information hierarchy
- Subtle, accessible motion
- Responsive-first thinking

## Key Features

### Marketing Experience

- Responsive navigation
- Hero experience
- Understand → Act → Grow narrative
- Product showcase
- Financial insights
- How it works
- Why Fermor
- Goal simulator
- Final CTA
- Responsive footer

### Product Experience

- Demo login
- Persistent demo authentication
- Protected dashboard route
- Interactive net-worth chart
- Timeframe selection
- Financial health visualization
- Financial insights
- Goal progress
- Currency switcher
- Recommended actions
- Profile menu
- Logout flow

## Screenshots

### 1. Homepage & Marketing Experience

![Homepage](./screenshots/homepage.png)
*The landing page hero section introduces the core "Understand. Act. Grow." product narrative. It establishes a premium, trustworthy fintech aesthetic with a clean, grid-based layout and generous whitespace.*

![Product Showcase](./screenshots/product-showcase.png)
*An interactive preview of the Fermor Financial Console right on the homepage. This allows visitors to immediately grasp the value proposition by seeing data visualizations before signing up.*

### 2. Interactive Dashboard & Features

![Dashboard Overview](./screenshots/dashboard.png)
*The authenticated executive dashboard provides a personalized financial picture. It aggregates total net worth, liquid burn runway, and a proprietary financial health score into one unified view.*

![Financial Insights](./screenshots/marketing-insights.png)
*The Insights and Actions view demonstrates how Fermor transforms raw financial data into prioritized tasks. It continuously monitors accounts to identify "lazy cash" and redundant fees.*

![Goals & Milestones](./screenshots/goal-simulator.png)
*The milestone velocity engine tracks progress across various life objectives, such as an Emergency Fund or Home Down Payment. It dynamically projects runway buffers and compound wealth over time.*

### 3. Demo Login & Mobile

![Demo Login](./screenshots/demo-login.png)

![Mobile Homepage](./screenshots/mobile-homepage.png)
![Mobile Dashboard](./screenshots/mobile-dashboard.png)

## User Flow

The platform guides users through a seamless end-to-end journey:

Visitor
↓
Homepage
↓
Demo Login
↓
Demo Profile Activated
↓
Dashboard
↓
Explore financial insights/goals
↓
Logout
↓
Homepage

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Motion
- Lucide React

## Project Structure

```
src/
├── components/
├── context/
├── lib/
├── pages/
├── types/
├── App.tsx
├── index.css
└── main.tsx
screenshots/
README.md
package.json
vite.config.ts
```

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```
