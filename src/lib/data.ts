import { CurrencyCode, CurrencyConfig, ChartPoint, InsightItem, FinancialGoal, SpendingCategory, Timeframe } from '../types/finance';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rateFromINR: 1.0,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateFromINR: 0.012,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateFromINR: 0.011,
  },
};

export function formatCurrency(amountINR: number, currency: CurrencyCode = 'INR', compact = false): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = amountINR * config.rateFromINR;

  if (compact) {
    if (currency === 'INR') {
      if (Math.abs(converted) >= 10000000) {
        return `${config.symbol}${(converted / 10000000).toFixed(2)} Cr`;
      }
      if (Math.abs(converted) >= 100000) {
        return `${config.symbol}${(converted / 100000).toFixed(1)} L`;
      }
      if (Math.abs(converted) >= 1000) {
        return `${config.symbol}${(converted / 1000).toFixed(0)}k`;
      }
    } else {
      if (Math.abs(converted) >= 1000000) {
        return `${config.symbol}${(converted / 1000000).toFixed(2)}M`;
      }
      if (Math.abs(converted) >= 1000) {
        return `${config.symbol}${(converted / 1000).toFixed(1)}k`;
      }
    }
  }

  // Standard readable currency formatting
  if (currency === 'INR') {
    return `${config.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  } else {
    return `${config.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  }
}

export const TIMEFRAME_DATA: Record<Timeframe, {
  summary: {
    netWorthINR: number;
    growthPercent: number;
    growthINR: number;
    inflowINR: number;
    outflowINR: number;
    savingsRatePercent: number;
    runwayMonths: number;
  };
  points: ChartPoint[];
  breakdown: SpendingCategory[];
}> = {
  '1M': {
    summary: {
      netWorthINR: 2480000,
      growthPercent: 2.8,
      growthINR: 67400,
      inflowINR: 195000,
      outflowINR: 118000,
      savingsRatePercent: 39.5,
      runwayMonths: 8.6,
    },
    points: [
      { label: 'Sep 05', date: '5 Sep', netWorth: 2412600, cash: 480000, investments: 2050000, liabilities: 117400 },
      { label: 'Sep 12', date: '12 Sep', netWorth: 2428000, cash: 520000, investments: 2020000, liabilities: 112000 },
      { label: 'Sep 19', date: '19 Sep', netWorth: 2445000, cash: 495000, investments: 2055000, liabilities: 105000 },
      { label: 'Sep 26', date: '26 Sep', netWorth: 2461000, cash: 470000, investments: 2089000, liabilities: 98000 },
      { label: 'Oct 05', date: '5 Oct', netWorth: 2480000, cash: 545000, investments: 2025000, liabilities: 90000 },
    ],
    breakdown: [
      { category: 'Housing & Utilities', amountINR: 42000, percentage: 35.6, changePercent: 0.0, color: '#0E4F3E' },
      { category: 'Investments & SIPs', amountINR: 38000, percentage: 32.2, changePercent: +8.5, color: '#1B7358' },
      { category: 'Food & Groceries', amountINR: 16500, percentage: 14.0, changePercent: -14.2, color: '#329375' },
      { category: 'Transport & Commute', amountINR: 7200, percentage: 6.1, changePercent: -3.0, color: '#5DB599' },
      { category: 'Discretionary / Leisure', amountINR: 14300, percentage: 12.1, changePercent: -11.5, color: '#8AD2BC' },
    ],
  },
  '6M': {
    summary: {
      netWorthINR: 2480000,
      growthPercent: 14.2,
      growthINR: 308000,
      inflowINR: 1170000,
      outflowINR: 735000,
      savingsRatePercent: 37.2,
      runwayMonths: 8.6,
    },
    points: [
      { label: 'May', date: 'May 2026', netWorth: 2172000, cash: 390000, investments: 1940000, liabilities: 158000 },
      { label: 'Jun', date: 'Jun 2026', netWorth: 2225000, cash: 410000, investments: 1960000, liabilities: 145000 },
      { label: 'Jul', date: 'Jul 2026', netWorth: 2298000, cash: 440000, investments: 1990000, liabilities: 132000 },
      { label: 'Aug', date: 'Aug 2026', netWorth: 2364000, cash: 460000, investments: 2025000, liabilities: 121000 },
      { label: 'Sep', date: 'Sep 2026', netWorth: 2420000, cash: 505000, investments: 2020000, liabilities: 105000 },
      { label: 'Oct', date: 'Oct 2026', netWorth: 2480000, cash: 545000, investments: 2025000, liabilities: 90000 },
    ],
    breakdown: [
      { category: 'Housing & Utilities', amountINR: 252000, percentage: 34.3, changePercent: +1.2, color: '#0E4F3E' },
      { category: 'Investments & SIPs', amountINR: 235000, percentage: 32.0, changePercent: +15.4, color: '#1B7358' },
      { category: 'Food & Groceries', amountINR: 108000, percentage: 14.7, changePercent: -6.8, color: '#329375' },
      { category: 'Transport & Commute', amountINR: 48000, percentage: 6.5, changePercent: -1.5, color: '#5DB599' },
      { category: 'Discretionary / Leisure', amountINR: 92000, percentage: 12.5, changePercent: -8.0, color: '#8AD2BC' },
    ],
  },
  '1Y': {
    summary: {
      netWorthINR: 2480000,
      growthPercent: 26.5,
      growthINR: 520000,
      inflowINR: 2340000,
      outflowINR: 1460000,
      savingsRatePercent: 37.6,
      runwayMonths: 8.6,
    },
    points: [
      { label: 'Nov 25', date: 'Nov 2025', netWorth: 1960000, cash: 320000, investments: 1850000, liabilities: 210000 },
      { label: 'Jan 26', date: 'Jan 2026', netWorth: 2045000, cash: 350000, investments: 1885000, liabilities: 190000 },
      { label: 'Mar 26', date: 'Mar 2026', netWorth: 2130000, cash: 380000, investments: 1920000, liabilities: 170000 },
      { label: 'May 26', date: 'May 2026', netWorth: 2210000, cash: 410000, investments: 1950000, liabilities: 150000 },
      { label: 'Jul 26', date: 'Jul 2026', netWorth: 2315000, cash: 460000, investments: 1985000, liabilities: 130000 },
      { label: 'Sep 26', date: 'Sep 2026', netWorth: 2410000, cash: 510000, investments: 2010000, liabilities: 110000 },
      { label: 'Oct 26', date: 'Oct 2026', netWorth: 2480000, cash: 545000, investments: 2025000, liabilities: 90000 },
    ],
    breakdown: [
      { category: 'Housing & Utilities', amountINR: 504000, percentage: 34.5, changePercent: +2.0, color: '#0E4F3E' },
      { category: 'Investments & SIPs', amountINR: 470000, percentage: 32.2, changePercent: +22.8, color: '#1B7358' },
      { category: 'Food & Groceries', amountINR: 216000, percentage: 14.8, changePercent: -4.5, color: '#329375' },
      { category: 'Transport & Commute', amountINR: 96000, percentage: 6.6, changePercent: -1.0, color: '#5DB599' },
      { category: 'Discretionary / Leisure', amountINR: 174000, percentage: 11.9, changePercent: -9.2, color: '#8AD2BC' },
    ],
  },
  'ALL': {
    summary: {
      netWorthINR: 2480000,
      growthPercent: 54.0,
      growthINR: 870000,
      inflowINR: 4680000,
      outflowINR: 2950000,
      savingsRatePercent: 36.9,
      runwayMonths: 8.6,
    },
    points: [
      { label: '2024 H1', date: 'Q2 2024', netWorth: 1610000, cash: 220000, investments: 1680000, liabilities: 290000 },
      { label: '2024 H2', date: 'Q4 2024', netWorth: 1740000, cash: 260000, investments: 1730000, liabilities: 250000 },
      { label: '2025 H1', date: 'Q2 2025', netWorth: 1890000, cash: 310000, investments: 1800000, liabilities: 220000 },
      { label: '2025 H2', date: 'Q4 2025', netWorth: 2040000, cash: 360000, investments: 1870000, liabilities: 190000 },
      { label: '2026 H1', date: 'Q2 2026', netWorth: 2240000, cash: 430000, investments: 1960000, liabilities: 150000 },
      { label: 'Current', date: 'Oct 2026', netWorth: 2480000, cash: 545000, investments: 2025000, liabilities: 90000 },
    ],
    breakdown: [
      { category: 'Housing & Utilities', amountINR: 1015000, percentage: 34.4, changePercent: +3.0, color: '#0E4F3E' },
      { category: 'Investments & SIPs', amountINR: 960000, percentage: 32.5, changePercent: +34.0, color: '#1B7358' },
      { category: 'Food & Groceries', amountINR: 435000, percentage: 14.7, changePercent: -5.0, color: '#329375' },
      { category: 'Transport & Commute', amountINR: 195000, percentage: 6.6, changePercent: -0.8, color: '#5DB599' },
      { category: 'Discretionary / Leisure', amountINR: 345000, percentage: 11.7, changePercent: -12.4, color: '#8AD2BC' },
    ],
  },
};

export const INITIAL_INSIGHTS: InsightItem[] = [
  {
    id: 'insight-1',
    category: 'spending',
    tag: 'Spending Efficiency',
    title: 'Dining Spend Optimization',
    dataPoint: 'Dining expenses decreased 14.2% (₹16,500 vs ₹19,250 30-day baseline)',
    insight: 'Discretionary dining slipped below your ₹18,000 threshold without sacrificing quality of life.',
    recommendedAction: 'Sweep the ₹2,750 unspent dining surplus into your equity index auto-SIP.',
    estimatedImpact: '+₹33,000/year invested surplus',
    impactValueINR: 33000,
    status: 'active',
  },
  {
    id: 'insight-2',
    category: 'cash_drag',
    tag: 'Liquid Yield Optimization',
    title: 'Idle Checking Cash Drag Detected',
    dataPoint: '₹1,45,000 sitting in standard savings checking at 2.7% p.a.',
    insight: 'Your emergency buffer target of 6 months (₹3,80,000) is fulfilled. This extra cash is losing real purchasing power.',
    recommendedAction: 'Move ₹95,000 surplus to a 7.15% instant-access liquid debt fund or sweep-in FD.',
    estimatedImpact: '+₹4,220 additional post-tax annual return with same-day liquidity',
    impactValueINR: 4220,
    status: 'active',
  },
  {
    id: 'insight-3',
    category: 'goal',
    tag: 'Milestone Velocity',
    title: 'Emergency Fund 2 Months Ahead of Target',
    dataPoint: 'Savings velocity averaged ₹38,000/mo over the last 90 days vs ₹30,000 target',
    insight: 'At current velocity, your ₹3,00,000 emergency buffer completes in November rather than January.',
    recommendedAction: 'Lock in date and route future surplus to the "House Down Payment" tier.',
    estimatedImpact: '60 days saved on primary financial milestone',
    impactValueINR: 16000,
    status: 'active',
  },
  {
    id: 'insight-4',
    category: 'subscription',
    tag: 'Silent Leakage Audit',
    title: 'Inactive Recurring Subscriptions',
    dataPoint: '2 digital tools (₹1,499/mo and ₹699/mo) zero card-token logins in 60+ days',
    insight: 'Unused recurring billing represents ₹26,376 in annual passive friction.',
    recommendedAction: '1-click review and auto-cancel token approval.',
    estimatedImpact: '+₹2,198 immediate monthly cash-flow freed',
    impactValueINR: 26376,
    status: 'active',
  },
];

export const FINANCIAL_GOALS_PRESETS: FinancialGoal[] = [
  {
    id: 'emergency-fund',
    name: 'Emergency Reserve',
    category: 'Security & Runway',
    targetAmountINR: 300000,
    currentAmountINR: 186000,
    monthlyContributionINR: 25000,
    targetTimelineMonths: 5,
    iconName: 'ShieldCheck',
  },
  {
    id: 'down-payment',
    name: 'Home Down Payment',
    category: 'Long-term Asset',
    targetAmountINR: 1500000,
    currentAmountINR: 675000,
    monthlyContributionINR: 45000,
    targetTimelineMonths: 19,
    iconName: 'Home',
  },
  {
    id: 'seed-portfolio',
    name: 'Wealth Seed Tier 1',
    category: 'Compounding Base',
    targetAmountINR: 1000000,
    currentAmountINR: 720000,
    monthlyContributionINR: 35000,
    targetTimelineMonths: 8,
    iconName: 'TrendingUp',
  },
  {
    id: 'sabbatical',
    name: '6-Month Sabbatical',
    category: 'Lifestyle Autonomy',
    targetAmountINR: 500000,
    currentAmountINR: 310000,
    monthlyContributionINR: 30000,
    targetTimelineMonths: 7,
    iconName: 'Compass',
  },
];

export const WORKFLOW_STEPS = [
  {
    number: '01',
    phase: 'Understand',
    headline: 'See your complete financial picture clearly.',
    subtitle: 'No spreadsheets. No manual data entry. No blind spots.',
    description: 'Fermor unifies checking accounts, investments, credit lines, and emergency buffers into one coherent balance sheet. Clean categorization eliminates noise and illuminates your true net cash velocity.',
    bullets: [
      'Automated read-only aggregation across banking & portfolios',
      'Accurate net worth and real-time liquid cash runway',
      'True monthly operating cost calculation without spreadsheet errors',
    ],
    previewData: {
      type: 'balance',
      headline: 'Unified Net Worth',
      metric: '₹24,80,000',
      submetric: 'Across 6 verified accounts · 0 manual updates',
    },
  },
  {
    number: '02',
    phase: 'Act',
    headline: 'Turn financial information into useful actions.',
    subtitle: 'Dashboards don’t build wealth. Prioritized decisions do.',
    description: 'Raw balances don’t tell you what to do on Monday morning. Fermor continuously compares your cash flow against your goals to generate prioritized, concrete actions: sweep idle balances, optimize subscription leakage, and rebalance allocations.',
    bullets: [
      'Ranked by real financial impact, not advertising commission',
      'Concrete actions with 1-click execution guidelines',
      'Smart warnings before overspending breaches monthly safety runway',
    ],
    previewData: {
      type: 'action',
      headline: 'Recommended Action',
      metric: 'Sweep ₹65,000 Idle Cash',
      submetric: 'Earn +₹4,600/yr risk-free yield with zero lock-in',
    },
  },
  {
    number: '03',
    phase: 'Grow',
    headline: 'Build better financial habits over time.',
    subtitle: 'Compounding is quiet. We make the trajectory visible.',
    description: 'Watch milestones accelerate as sound decisions compound. Fermor models the multi-year impact of minor monthly adjustments, showing how small habit improvements shave years off financial independence targets.',
    bullets: [
      'Visual timeline simulations showing goal acceleration',
      'Habit tracking that rewards discipline, not constant trading',
      'Fiduciary peace of mind with verifiable long-term growth',
    ],
    previewData: {
      type: 'growth',
      headline: 'Goal Trajectory',
      metric: '+14.2% 6-Month Growth',
      submetric: 'Milestone reached 64 days earlier than scheduled',
    },
  },
];

export const WHY_FERMOR_POINTS = [
  {
    title: 'Clarity over Complexity',
    highlight: 'Finance shouldn’t require a spreadsheet.',
    description: 'Legacy tools dump raw transaction logs and complex pivot tables onto your screen. Fermor synthesizes signals into simple, human conclusions.',
    statLabel: 'Zero manual formulas',
  },
  {
    title: 'Action over Vanity',
    highlight: 'Knowing your numbers is only the beginning.',
    description: 'Most budgeting apps act like rear-view mirrors. Fermor acts like a GPS navigator, pointing out what single action produces the highest financial leverage this week.',
    statLabel: 'Ranked priority actions',
  },
  {
    title: 'Fiduciary Trust',
    highlight: 'No predatory ads or sponsored card traps.',
    description: 'Traditional fintech makes money selling you high-interest debt and credit cards you do not need. Fermor is built purely for you, with zero conflicting kickbacks.',
    statLabel: 'Unbiased alignment',
  },
  {
    title: 'Read-Only Architecture',
    highlight: 'Strict separation of concerns.',
    description: 'Fermor operates in read-only mode to visualize and organize your finances. The platform never requests or holds transactional or withdrawal permissions.',
    statLabel: 'Read-only access',
  },
];

export const COMPARISON_ROWS = [
  {
    feature: 'Core Philosophy',
    spreadsheets: 'Passive data entry, breaks easily',
    traditionalApps: 'Shows pretty charts, pushes credit cards',
    fermor: 'Proactive guidance: Understand → Act → Grow',
  },
  {
    feature: 'Effort Required',
    spreadsheets: '3–5 hours monthly maintenance',
    traditionalApps: 'Constant manual tag fixing',
    fermor: 'Automated sync with intelligent normalization',
  },
  {
    feature: 'Action Guidance',
    spreadsheets: 'None. You must derive own formulas',
    traditionalApps: 'Vague tips & sponsored lender ads',
    fermor: 'Ranked, mathematically substantiated steps',
  },
  {
    feature: 'Business Model',
    spreadsheets: 'None',
    traditionalApps: 'Monetized via loan & credit card referrals',
    fermor: 'Member-funded, strictly fiduciary',
  },
  {
    feature: 'Goal Modeling',
    spreadsheets: 'Complex static math',
    traditionalApps: 'Generic percentage bars',
    fermor: 'Dynamic acceleration & surplus simulation',
  },
];
