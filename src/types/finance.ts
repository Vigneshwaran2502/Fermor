export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromINR: number;
}

export type Timeframe = '1M' | '6M' | '1Y' | 'ALL';

export interface ChartPoint {
  label: string;
  date: string;
  netWorth: number;
  cash: number;
  investments: number;
  liabilities: number;
}

export interface InsightItem {
  id: string;
  category: 'spending' | 'cash_drag' | 'goal' | 'subscription';
  tag: string;
  title: string;
  dataPoint: string;
  insight: string;
  recommendedAction: string;
  estimatedImpact: string;
  impactValueINR: number;
  status: 'active' | 'applied' | 'dismissed';
}

export interface FinancialGoal {
  id: string;
  name: string;
  category: string;
  targetAmountINR: number;
  currentAmountINR: number;
  monthlyContributionINR: number;
  targetTimelineMonths: number;
  iconName: string;
}

export interface SpendingCategory {
  category: string;
  amountINR: number;
  percentage: number;
  changePercent: number; // vs previous period
  color: string;
}

export interface FinancialMetric {
  label: string;
  valueINR: number;
  changePercent: number;
  isPositive: boolean;
  contextText: string;
}
