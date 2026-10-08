import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  Wallet, 
  Lightbulb, 
  Target, 
  Clock, 
  ChevronDown, 
  Menu, 
  X,
  CreditCard,
  Building,
  PiggyBank,
  ArrowRight,
  ExternalLink,
  Search,
  Download,
  RefreshCw,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Lock,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { CurrencyCode, Timeframe } from '../types/finance';
import { formatCurrency, CURRENCIES } from '../lib/data';

type DashboardTab = 'overview' | 'money' | 'insights' | 'goals' | 'activity';

interface DashboardPageProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
}

interface AccountItem {
  id: string;
  name: string;
  institution: string;
  type: 'checking' | 'investment' | 'vault' | 'mutual_fund';
  balance: number;
  badge: string;
  accountNumber: string;
  rateInfo?: string;
}

interface GoalItem {
  id: string;
  name: string;
  category: string;
  currentAmount: number;
  targetAmount: number;
  monthlyPace: number;
  targetDate: string;
}

interface TransactionItem {
  id: string;
  title: string;
  category: string;
  account: string;
  date: string;
  amount: number;
  type: 'inflow' | 'outflow' | 'transfer';
  status: 'cleared' | 'automated';
}

export function DashboardPage({ currentCurrency, onCurrencyChange }: DashboardPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  // Read initial tab from URL query param if present
  const tabParam = searchParams.get('tab') as DashboardTab | null;
  const initialTab: DashboardTab = (tabParam && ['overview', 'money', 'insights', 'goals', 'activity'].includes(tabParam)) 
    ? tabParam 
    : 'overview';

  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Synchronize state if URL query param changes
  useEffect(() => {
    if (tabParam && ['overview', 'money', 'insights', 'goals', 'activity'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Tab switch handler with instant drawer close & scroll to top
  const handleTabChange = (tabId: DashboardTab) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProfileDropdownOpen(false);
        setCurrencyDropdownOpen(false);
        setMobileSidebarOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[role="menu"]') && !target.closest('button')) {
        setProfileDropdownOpen(false);
        setCurrencyDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Rohan K.'s core financial data
  const baseNetWorth = 1248000;
  const liquidCash = 482000;
  const investments = 640000;
  const savings = 126000;

  // Dynamic interactive action states (Insights)
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});

  // Dynamic accounts state (Money)
  const [accounts, setAccounts] = useState<AccountItem[]>([
    {
      id: 'hdfc-salary',
      name: 'Salary Checking Account',
      institution: 'HDFC Bank',
      type: 'checking',
      balance: 182000,
      badge: 'Primary Operating',
      accountNumber: '•••• 4192',
      rateInfo: '2.7% p.a.'
    },
    {
      id: 'icici-direct',
      name: 'Index Equity & ETF Portfolio',
      institution: 'ICICI Direct',
      type: 'investment',
      balance: 640000,
      badge: 'Core Wealth',
      accountNumber: '•••• 8821',
      rateInfo: '+12.4% CAGR'
    },
    {
      id: 'sbi-vault',
      name: 'High-Yield Liquid Vault',
      institution: 'State Bank of India',
      type: 'vault',
      balance: 300000,
      badge: 'Emergency Buffer',
      accountNumber: '•••• 1044',
      rateInfo: '7.15% p.a.'
    },
    {
      id: 'ppfas-flexi',
      name: 'Flexi-Cap Equity Fund',
      institution: 'Parag Parikh AMC',
      type: 'mutual_fund',
      balance: 126000,
      badge: 'Long-term SIP',
      accountNumber: '•••• 7730',
      rateInfo: 'Active SIP ₹15k/mo'
    }
  ]);

  // Account filter
  const [accountFilter, setAccountFilter] = useState<'all' | 'checking' | 'investment' | 'vault'>('all');
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
    institution: 'HDFC Bank',
    name: '',
    type: 'checking' as 'checking' | 'investment' | 'vault',
    balance: ''
  });

  // Dynamic goals state (Goals)
  const [goals, setGoals] = useState<GoalItem[]>([
    {
      id: 'emergency-fund',
      name: 'Emergency Fund (6-Mo Runway)',
      category: 'Safety & Liquidity',
      currentAmount: 216000,
      targetAmount: 300000,
      monthlyPace: 25000,
      targetDate: 'Dec 2026'
    },
    {
      id: 'home-downpayment',
      name: 'Home Down Payment',
      category: 'Real Estate Asset',
      currentAmount: 510000,
      targetAmount: 1500000,
      monthlyPace: 35000,
      targetDate: 'Aug 2028'
    },
    {
      id: 'annual-travel',
      name: 'Japan & Alps Autumn Travel',
      category: 'Experience & Leisure',
      currentAmount: 135000,
      targetAmount: 180000,
      monthlyPace: 15000,
      targetDate: 'Oct 2026'
    },
    {
      id: 'financial-independence',
      name: 'Financial Independence (FI)',
      category: 'Retirement Freedom',
      currentAmount: 1248000,
      targetAmount: 15000000,
      monthlyPace: 45000,
      targetDate: '2042'
    }
  ]);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalForm, setNewGoalForm] = useState({
    name: '',
    category: 'General Wealth',
    targetAmount: '',
    monthlyPace: ''
  });

  // Goal simulator state
  const [simMonthlySavings, setSimMonthlySavings] = useState(35000);
  const [simHorizonYears, setSimHorizonYears] = useState(5);
  const [simReturnRate, setSimReturnRate] = useState(11.5);

  // Dynamic transactions state (Activity)
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: 'tx-1',
      title: 'Quarterly Dividend Accrual',
      category: 'Yield Inflow · Index Holdings',
      account: 'ICICI Direct',
      date: '5 Oct 2026',
      amount: 4200,
      type: 'inflow',
      status: 'cleared'
    },
    {
      id: 'tx-2',
      title: 'Monthly Rent & Utilities',
      category: 'Essential Outflow · Auto-Debit',
      account: 'HDFC Checking',
      date: '4 Oct 2026',
      amount: -38000,
      type: 'outflow',
      status: 'cleared'
    },
    {
      id: 'tx-3',
      title: 'Liquid Vault Auto-Sweep',
      category: 'Surplus Sweep · 7.15% Yield',
      account: 'SBI Vault',
      date: '3 Oct 2026',
      amount: -20000,
      type: 'transfer',
      status: 'automated'
    },
    {
      id: 'tx-4',
      title: 'Auto-SIP to Equity Fund',
      category: 'Investments · Recurring Transfer',
      account: 'Parag Parikh AMC',
      date: '2 Oct 2026',
      amount: -35000,
      type: 'transfer',
      status: 'automated'
    },
    {
      id: 'tx-5',
      title: 'Salary Deposit (Tech Engineering)',
      category: 'Primary Inflow · Payroll',
      account: 'HDFC Checking',
      date: '1 Oct 2026',
      amount: 165000,
      type: 'inflow',
      status: 'cleared'
    },
    {
      id: 'tx-6',
      title: 'Organic Food & Groceries',
      category: 'Discretionary Outflow',
      account: 'HDFC Checking',
      date: '29 Sep 2026',
      amount: -6420,
      type: 'outflow',
      status: 'cleared'
    },
    {
      id: 'tx-7',
      title: 'High-Speed Fiber Internet',
      category: 'Utility Bill · Auto-Pay',
      account: 'HDFC Checking',
      date: '28 Sep 2026',
      amount: -1850,
      type: 'outflow',
      status: 'automated'
    },
    {
      id: 'tx-8',
      title: 'Artisan Cafe & Weekend Dining',
      category: 'Dining & Entertainment',
      account: 'HDFC Checking',
      date: '27 Sep 2026',
      amount: -1420,
      type: 'outflow',
      status: 'cleared'
    },
    {
      id: 'tx-9',
      title: 'SBI Vault Monthly Interest Credit',
      category: 'Yield Inflow · 7.15% Accrual',
      account: 'SBI Vault',
      date: '26 Sep 2026',
      amount: 1780,
      type: 'inflow',
      status: 'cleared'
    },
    {
      id: 'tx-10',
      title: 'Annual Tech Cloud Subscription',
      category: 'Professional Software',
      account: 'HDFC Checking',
      date: '24 Sep 2026',
      amount: -2890,
      type: 'outflow',
      status: 'cleared'
    }
  ]);

  // Activity filters
  const [activitySearch, setActivitySearch] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState<'all' | 'inflow' | 'outflow' | 'transfer'>('all');

  // Chart data points customized for Rohan K.
  const chartDatasets: Record<Timeframe, {
    points: { label: string; date: string; value: number }[];
    growthPercent: number;
    periodLabel: string;
  }> = {
    '1M': {
      growthPercent: 1.6,
      periodLabel: 'this month',
      points: [
        { label: 'Sep 05', date: '5 Sep 2026', value: 1228000 },
        { label: 'Sep 12', date: '12 Sep 2026', value: 1234000 },
        { label: 'Sep 19', date: '19 Sep 2026', value: 1240000 },
        { label: 'Sep 26', date: '26 Sep 2026', value: 1243000 },
        { label: 'Oct 05', date: '5 Oct 2026', value: 1248000 },
      ],
    },
    '6M': {
      growthPercent: 4.8,
      periodLabel: 'last 6 months',
      points: [
        { label: 'May', date: 'May 2026', value: 1191000 },
        { label: 'Jun', date: 'Jun 2026', value: 1205000 },
        { label: 'Jul', date: 'Jul 2026', value: 1218000 },
        { label: 'Aug', date: 'Aug 2026', value: 1230000 },
        { label: 'Sep', date: 'Sep 2026', value: 1241000 },
        { label: 'Oct', date: 'Oct 2026', value: 1248000 },
      ],
    },
    '1Y': {
      growthPercent: 8.4,
      periodLabel: 'this year',
      points: [
        { label: 'Nov 25', date: 'Nov 2025', value: 1151000 },
        { label: 'Jan 26', date: 'Jan 2026', value: 1172000 },
        { label: 'Mar 26', date: 'Mar 2026', value: 1190000 },
        { label: 'May 26', date: 'May 2026', value: 1210000 },
        { label: 'Jul 26', date: 'Jul 2026', value: 1228000 },
        { label: 'Sep 26', date: 'Sep 2026', value: 1242000 },
        { label: 'Oct 26', date: 'Oct 2026', value: 1248000 },
      ],
    },
    'ALL': {
      growthPercent: 24.2,
      periodLabel: 'all time',
      points: [
        { label: '2024 H1', date: 'Q2 2024', value: 1005000 },
        { label: '2024 H2', date: 'Q4 2024', value: 1060000 },
        { label: '2025 H1', date: 'Q2 2025', value: 1115000 },
        { label: '2025 H2', date: 'Q4 2025', value: 1180000 },
        { label: '2026 H1', date: 'Q2 2026', value: 1225000 },
        { label: 'Current', date: 'Oct 2026', value: 1248000 },
      ],
    },
  };

  const activeDataset = chartDatasets[timeframe];
  const chartPoints = activeDataset.points;

  // Chart coordinate mapping
  const svgWidth = 650;
  const svgHeight = 220;
  const paddingX = 35;
  const paddingY = 25;

  const rawValues = chartPoints.map((p) => p.value);
  const minVal = Math.min(...rawValues) * 0.97;
  const maxVal = Math.max(...rawValues) * 1.03;

  const coords = chartPoints.map((p, idx) => {
    const x = paddingX + (idx / (chartPoints.length - 1)) * (svgWidth - 2 * paddingX);
    const y = svgHeight - paddingY - ((p.value - minVal) / (maxVal - minVal)) * (svgHeight - 2 * paddingY);
    return { x, y, pt: p };
  });

  const generateBezier = () => {
    if (coords.length === 0) return '';
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cx1 = curr.x + (next.x - curr.x) / 2;
      const cy1 = curr.y;
      const cx2 = curr.x + (next.x - curr.x) / 2;
      const cy2 = next.y;
      d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const lineD = generateBezier();
  const areaD = coords.length > 0
    ? `${lineD} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`
    : '';

  const hoveredCoord = hoveredPointIdx !== null ? coords[hoveredPointIdx] : null;

  const handleLogout = () => {
    logout();
    showToast('info', 'Logged Out', 'You have been safely signed out. Returning to homepage.');
    navigate('/');
  };

  const handleActionToggle = (actionKey: string, successMessage: string) => {
    const nextState = !appliedActions[actionKey];
    setAppliedActions((prev) => ({ ...prev, [actionKey]: nextState }));
    if (nextState) {
      showToast('success', '✓ Recommendation Executed', successMessage);
    } else {
      showToast('info', 'Action Reverted', 'Reset action back to pending queue.');
    }
  };

  // Trigger accounts sync animation
  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('success', 'Institutions Synced', 'All 4 banking and investment feeds are fully up-to-date.');
    }, 900);
  };

  // Perform smart cash sweep
  const handleSmartSweep = () => {
    showToast('success', 'Smart Sweep Initiated', 'Moved ₹82,000 checking surplus into SBI 7.15% High-Yield Vault.');
    setAppliedActions((prev) => ({ ...prev, 'move-cash': true }));
  };

  // Export CSV statement
  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'Title', 'Category', 'Account', 'Amount (INR)', 'Type', 'Status'],
      ...transactions.map(t => [t.date, t.title, t.category, t.account, t.amount.toString(), t.type, t.status])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `fermor-transactions-rohan-k-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Ledger Exported', 'Downloaded fermor-transactions.csv successfully.');
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = 
        t.title.toLowerCase().includes(activitySearch.toLowerCase()) ||
        t.category.toLowerCase().includes(activitySearch.toLowerCase()) ||
        t.account.toLowerCase().includes(activitySearch.toLowerCase());
      
      const matchesType = 
        activityTypeFilter === 'all' ? true : t.type === activityTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [transactions, activitySearch, activityTypeFilter]);

  // Filtered accounts
  const filteredAccounts = useMemo(() => {
    if (accountFilter === 'all') return accounts;
    return accounts.filter(a => a.type === accountFilter);
  }, [accounts, accountFilter]);

  // Goal simulator compounding projection
  const simCalculation = useMemo(() => {
    const months = simHorizonYears * 12;
    const monthlyRate = (simReturnRate / 100) / 12;
    let corpus = 0;
    let totalInvested = 0;

    for (let m = 1; m <= months; m++) {
      corpus = (corpus + simMonthlySavings) * (1 + monthlyRate);
      totalInvested += simMonthlySavings;
    }

    const wealthGained = Math.max(0, corpus - totalInvested);
    return {
      totalInvested,
      corpus: Math.round(corpus),
      wealthGained: Math.round(wealthGained)
    };
  }, [simMonthlySavings, simHorizonYears, simReturnRate]);

  const sidebarLinks = [
    { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
    { id: 'money' as const, label: 'Money', icon: Wallet },
    { id: 'insights' as const, label: 'Insights', icon: Lightbulb },
    { id: 'goals' as const, label: 'Goals', icon: Target },
    { id: 'activity' as const, label: 'Activity', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121820] flex flex-col font-sans">
      
      {/* Top Application Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/90 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/50 transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="flex items-center gap-2 group focus:outline-none"
              title="Return to Fermor Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-2xs transition-transform group-hover:scale-105">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-[#121820]">
                Fermor
              </span>
            </a>
            <span className="hidden sm:inline-block text-xs font-semibold text-neutral-400 pl-2 border-l border-neutral-300">
              Workspace
            </span>
          </div>

          {/* Right: Currency Toggle, Sync Badge & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors shadow-2xs"
                aria-label="Change currency"
              >
                <span>{CURRENCIES[currentCurrency].symbol}</span>
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-50 text-xs font-medium">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onCurrencyChange(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                        currentCurrency === c ? 'text-[#0E4F3E] font-semibold bg-[#0E4F3E]/5' : 'text-neutral-700'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-neutral-400 font-normal">{CURRENCIES[c].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Read-only sync status button */}
            <button
              onClick={handleSyncNow}
              className="hidden md:flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full hover:bg-emerald-100/70 transition-colors"
              title="Click to refresh account sync"
            >
              <RefreshCw className={`w-3 h-3 text-emerald-600 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Read-only sync active'}</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all text-xs font-semibold text-neutral-800 shadow-2xs"
                aria-label="User profile options"
                aria-expanded={profileDropdownOpen}
              >
                <span className="hidden sm:inline">{user?.name || 'Rohan K.'}</span>
                <div className="w-6 h-6 rounded-full bg-[#0E4F3E] text-white flex items-center justify-center text-[11px] font-bold">
                  {user?.avatar || 'RK'}
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-52 bg-white border border-neutral-200 rounded-xl shadow-xl py-1.5 z-50 text-xs"
                  role="menu"
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="font-bold text-neutral-900">{user?.name || 'Rohan K.'}</p>
                    <p className="text-[11px] text-neutral-500">{user?.role || 'Engineer'} · Demo Profile</p>
                  </div>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                    role="menuitem"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Return to Marketing Page</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      showToast('info', 'Settings', 'Account preferences are configured for demo mode.');
                    }}
                    className="w-full text-left px-3 py-2 flex items-center gap-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                    role="menuitem"
                  >
                    <Settings className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Settings</span>
                  </button>

                  <div className="border-t border-neutral-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-700 hover:bg-red-50 transition-colors font-medium"
                      role="menuitem"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* Main Workspace Frame: Sidebar + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex py-6 lg:py-8 gap-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col justify-between w-56 shrink-0 space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 block mb-2">
              Workspace
            </span>
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0E4F3E] text-white shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Bottom Controls */}
          <div className="space-y-1 pt-6 border-t border-neutral-200/80">
            <button
              onClick={() => showToast('info', 'Settings', 'Preferences: Auto-sweep active. Notifications enabled.')}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
            >
              <Settings className="w-4 h-4 text-neutral-400" />
              <span>Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay (As shown in user screenshot) */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs" 
              onClick={() => setMobileSidebarOpen(false)} 
            />
            <div className="relative w-64 bg-[#FAF8F5] border-r border-neutral-200 p-6 flex flex-col justify-between z-50 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-xs">
                      F
                    </div>
                    <span className="font-bold text-sm text-[#121820]">Fermor</span>
                  </div>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)} 
                    className="p-1.5 rounded-lg hover:bg-neutral-200/60 text-neutral-600 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {sidebarLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#0E4F3E] text-white shadow-2xs'
                            : 'text-neutral-700 hover:bg-white hover:text-neutral-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    showToast('info', 'Settings', 'Preferences: Auto-sweep active. Read-only mode.');
                  }}
                  className="w-full flex items-center gap-2 py-2 px-3 text-xs font-medium text-neutral-600 hover:bg-white rounded-xl"
                >
                  <Settings className="w-4 h-4 text-neutral-400" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-red-700 bg-red-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace Body */}
        <main className="flex-1 min-w-0 space-y-6 sm:space-y-8">
          
          {/* Quick Tab Selector for Mobile (Ensures single-tap access even without drawer!) */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200/80 -mx-1 px-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#0E4F3E] text-white shadow-2xs'
                      : 'bg-white text-neutral-600 border border-neutral-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Top Greeting Lead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121820]">
                  {activeTab === 'overview' && `Good morning, ${user?.name.split(' ')[0] || 'Rohan'}.`}
                  {activeTab === 'money' && 'Money & Accounts'}
                  {activeTab === 'insights' && 'Financial Insights & Actions'}
                  {activeTab === 'goals' && 'Goals & Runway Milestones'}
                  {activeTab === 'activity' && 'Activity & Transaction Ledger'}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-200/70 text-neutral-700">
                  {activeTab}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mt-1">
                {activeTab === 'overview' && "Here is your executive financial picture, net worth trajectory, and prioritized actions."}
                {activeTab === 'money' && "Complete breakdown of liquid cash balances, portfolio investments, and cashflow."}
                {activeTab === 'insights' && "Data-driven recommendations to plug leaks, eliminate drag, and compound surplus."}
                {activeTab === 'goals' && "Track milestone velocity, runway buffers, and compound wealth projections."}
                {activeTab === 'activity' && "Real-time chronological record of verified inflows, outflows, and auto-sweeps."}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-neutral-500">
                All 4 accounts synchronized 2m ago
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW                                                           */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Executive Summary Metrics Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl border border-neutral-300/80 p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block">Total Net Worth</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-bold text-[#121820] font-mono-tabular">
                      {formatCurrency(baseNetWorth, currentCurrency)}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-0.5 mt-1">
                    <TrendingUp className="w-3 h-3" /> +8.4% this year
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-300/80 p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block">Liquid Burn Runway</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-bold text-[#121820] font-mono-tabular">
                      7.4 Months
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    {formatCurrency(liquidCash, currentCurrency, true)} liquid reserves
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-300/80 p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block">Health Score</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-bold text-[#121820] font-mono-tabular">
                      86 / 100
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0E4F3E] bg-[#0E4F3E]/10 px-1.5 py-0.5 rounded-md inline-block mt-1">
                    Strong · Top Tier
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-300/80 p-4 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase text-neutral-400 block">Savings Rate</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl sm:text-2xl font-bold text-[#121820] font-mono-tabular">
                      38.2%
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    +₹71,800 monthly surplus
                  </span>
                </div>
              </div>

              {/* NET WORTH CARD & INTERACTIVE CHART */}
              <section className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(18,24,32,0.03)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                      Net Worth Trajectory
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121820] font-mono-tabular">
                        {formatCurrency(baseNetWorth, currentCurrency)}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center">
                        <TrendingUp className="w-3.5 h-3.5 mr-1" />
                        +{activeDataset.growthPercent}% {activeDataset.periodLabel}
                      </span>
                    </div>
                  </div>

                  {/* Timeframe Selector Buttons */}
                  <div className="flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
                    {(['1M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => {
                          setTimeframe(tf);
                          setHoveredPointIdx(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          timeframe === tf
                            ? 'bg-[#0E4F3E] text-white shadow-2xs'
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                        aria-pressed={timeframe === tf}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive SVG Chart */}
                <div className="pt-6">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span>Trajectory projection</span>
                    {hoveredCoord ? (
                      <span className="font-semibold text-[#0E4F3E] bg-[#0E4F3E]/8 px-2 py-0.5 rounded-md">
                        {hoveredCoord.pt.date}: {formatCurrency(hoveredCoord.pt.value, currentCurrency)}
                      </span>
                    ) : (
                      <span>Hover points to inspect exact value</span>
                    )}
                  </div>

                  <div className="relative w-full aspect-[2.9/1] min-h-[200px]">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0E4F3E" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#0E4F3E" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#F3F4F6" strokeWidth="1" />
                      <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#F3F4F6" strokeWidth="1" />
                      <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#E5E7EB" strokeWidth="1" />

                      {areaD && <path d={areaD} fill="url(#dashboardGrad)" />}

                      {lineD && (
                        <path
                          d={lineD}
                          fill="none"
                          stroke="#0E4F3E"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {hoveredCoord && (
                        <line
                          x1={hoveredCoord.x}
                          y1={paddingY}
                          x2={hoveredCoord.x}
                          y2={svgHeight - paddingY}
                          stroke="#0E4F3E"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {coords.map((coord, idx) => {
                        const isHovered = hoveredPointIdx === idx;
                        return (
                          <g
                            key={idx}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredPointIdx(idx)}
                            onClick={() => setHoveredPointIdx(idx)}
                          >
                            <circle
                              cx={coord.x}
                              cy={coord.y}
                              r={isHovered ? 5.5 : 3.5}
                              fill={isHovered ? '#0E4F3E' : '#FFFFFF'}
                              stroke="#0E4F3E"
                              strokeWidth={isHovered ? 2.5 : 2}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="flex justify-between text-xs text-neutral-400 font-mono-tabular pt-3 border-t border-neutral-100">
                    {chartPoints.map((p, idx) => (
                      <span
                        key={idx}
                        className={hoveredPointIdx === idx ? 'text-[#0E4F3E] font-bold' : ''}
                      >
                        {p.label}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* DUAL COLUMN: FINANCIAL OVERVIEW & FINANCIAL HEALTH */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left 7 Columns: Financial overview */}
                <div className="md:col-span-7 bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                      <h3 className="text-base font-bold text-[#121820]">
                        Asset Allocation
                      </h3>
                      <button 
                        onClick={() => handleTabChange('money')}
                        className="text-xs text-[#0E4F3E] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Manage Money</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-100 mt-2">
                      <div className="py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                            <Wallet className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">Liquid cash</p>
                            <p className="text-xs text-neutral-500">Checking & operating buffer</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#121820] font-mono-tabular">
                          {formatCurrency(liquidCash, currentCurrency)}
                        </span>
                      </div>

                      <div className="py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0E4F3E]/8 text-[#0E4F3E] flex items-center justify-center">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">Investments</p>
                            <p className="text-xs text-neutral-500">Index equity & debt portfolio</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#121820] font-mono-tabular">
                          {formatCurrency(investments, currentCurrency)}
                        </span>
                      </div>

                      <div className="py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                            <PiggyBank className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">Savings Vault</p>
                            <p className="text-xs text-neutral-500">High-yield liquid buffer</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#121820] font-mono-tabular">
                          {formatCurrency(savings, currentCurrency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>Liabilities: {formatCurrency(0, currentCurrency)} (Zero Debt)</span>
                    <span className="text-[#0E4F3E] font-medium">4 Linked Accounts</span>
                  </div>
                </div>

                {/* Right 5 Columns: Financial health */}
                <div className="md:col-span-5 bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                      <h3 className="text-base font-bold text-[#121820]">
                        Financial health
                      </h3>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Strong
                      </span>
                    </div>

                    <div className="mt-6 flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-neutral-100"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-[#0E4F3E]"
                            strokeDasharray="86, 100"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-bold text-[#121820] font-mono-tabular">
                            86
                          </span>
                          <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                            / 100
                          </span>
                        </div>
                      </div>

                      <p className="text-sm font-bold text-neutral-900 mt-3">
                        Top Tier Stability
                      </p>
                      <p className="text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed">
                        Zero credit interest drag, 7.4 months liquid burn runway, and steady automated SIP execution.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 bg-[#FAF8F5] rounded-xl">
                      <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Runway</span>
                      <span className="font-bold text-neutral-800">7.4 Months</span>
                    </div>
                    <div className="p-2 bg-[#FAF8F5] rounded-xl">
                      <span className="text-[10px] text-neutral-400 block uppercase font-semibold">Savings Rate</span>
                      <span className="font-bold text-neutral-800">38.2%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* DUAL COLUMN: QUICK ACTIONS & GOALS SNAPSHOT */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left 6 Columns: Top Recommended Actions */}
                <div className="md:col-span-6 bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <h3 className="text-base font-bold text-[#121820]">
                        Top Recommendation
                      </h3>
                    </div>
                    <button 
                      onClick={() => handleTabChange('insights')}
                      className="text-xs text-[#0E4F3E] font-semibold hover:underline"
                    >
                      View all (5) →
                    </button>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/90">
                    <p className="text-xs font-bold text-neutral-900">
                      Move excess cash into 7.15% savings vault
                    </p>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      You have {formatCurrency(82000, currentCurrency, true)} above your 6-month buffer. Moving it earns 7.15% p.a.
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-800">+₹5,863 annual yield</span>
                      <button
                        type="button"
                        onClick={() => handleActionToggle('move-cash', 'Scheduled sweep of ₹82,000 into 7.15% savings vault.')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          appliedActions['move-cash']
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-[#0E4F3E] text-white hover:bg-[#0A3A2E]'
                        }`}
                      >
                        {appliedActions['move-cash'] ? 'Applied ✓' : 'Execute Sweep'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right 6 Columns: Upcoming Goals Snapshot */}
                <div className="md:col-span-6 bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#0E4F3E]" />
                      <h3 className="text-base font-bold text-[#121820]">
                        Active Milestone
                      </h3>
                    </div>
                    <button 
                      onClick={() => handleTabChange('goals')}
                      className="text-xs text-[#0E4F3E] font-semibold hover:underline"
                    >
                      All goals →
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-baseline text-xs">
                      <div>
                        <span className="font-bold text-neutral-900">Emergency Fund</span>
                        <span className="text-neutral-500 block text-[11px]">
                          Target: {formatCurrency(300000, currentCurrency)}
                        </span>
                      </div>
                      <span className="font-bold text-[#0E4F3E] text-sm font-mono-tabular">
                        72%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200">
                      <div className="h-full bg-[#0E4F3E] rounded-full" style={{ width: '72%' }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-neutral-500 font-mono-tabular pt-1">
                      <span>Saved: {formatCurrency(216000, currentCurrency)}</span>
                      <span>Target: Dec 2026</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MONEY (Balances, Accounts, Liquidity, Cash Flow)                   */}
          {/* ========================================================================= */}
          {activeTab === 'money' && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Cash Flow Balance Card */}
              <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-8 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                      Monthly Cash Flow Engine
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121820] font-mono-tabular">
                        +{formatCurrency(71800, currentCurrency)}
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        42.4% Net Surplus Rate
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSmartSweep}
                      className="px-3.5 py-2 bg-[#0E4F3E] text-white hover:bg-[#0A3A2E] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Smart Sweep Surplus</span>
                    </button>
                    <button
                      onClick={() => setShowAddAccountModal(true)}
                      className="px-3.5 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Connect Institution</span>
                    </button>
                  </div>
                </div>

                {/* Cash Flow Visual Bar */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-xs text-neutral-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                      Monthly Inflow: <strong>{formatCurrency(169200, currentCurrency)}</strong> (Salary + Dividends)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block" />
                      Monthly Outflow: <strong>{formatCurrency(97400, currentCurrency)}</strong> (Living + SIPs)
                    </span>
                  </div>

                  <div className="w-full h-4 bg-neutral-100 rounded-full overflow-hidden flex p-0.5 border border-neutral-200">
                    <div className="bg-emerald-600 rounded-l-full h-full" style={{ width: '63.5%' }} title="Inflows" />
                    <div className="bg-neutral-700 rounded-r-full h-full" style={{ width: '36.5%' }} title="Outflows" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-100 text-xs">
                    <div className="p-3 bg-[#FAF8F5] rounded-xl">
                      <span className="text-[10px] text-neutral-400 block uppercase font-bold">Total Assets</span>
                      <span className="text-base font-bold text-[#121820] font-mono-tabular">
                        {formatCurrency(baseNetWorth, currentCurrency)}
                      </span>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] rounded-xl">
                      <span className="text-[10px] text-neutral-400 block uppercase font-bold">Total Debt / Credit Drag</span>
                      <span className="text-base font-bold text-emerald-800 font-mono-tabular">
                        {formatCurrency(0, currentCurrency)} (Debt Free)
                      </span>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] rounded-xl">
                      <span className="text-[10px] text-neutral-400 block uppercase font-bold">Idle Checking Surplus</span>
                      <span className="text-base font-bold text-[#0E4F3E] font-mono-tabular">
                        {formatCurrency(82000, currentCurrency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Linked Accounts Header & Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-neutral-500" />
                  <h2 className="text-base font-bold text-[#121820]">
                    Linked Financial Accounts ({filteredAccounts.length})
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-white border border-neutral-200 rounded-xl text-xs font-medium">
                  {(['all', 'checking', 'investment', 'vault'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setAccountFilter(filter)}
                      className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                        accountFilter === filter 
                          ? 'bg-[#0E4F3E] text-white font-semibold' 
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {filter === 'all' ? 'All Accounts' : filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accounts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAccounts.map((account) => (
                  <div 
                    key={account.id} 
                    className="bg-white rounded-2xl border border-neutral-300/80 p-5 shadow-2xs hover:border-[#0E4F3E]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-[#0E4F3E] font-bold text-sm">
                          {account.type === 'checking' && <Wallet className="w-5 h-5 text-emerald-800" />}
                          {account.type === 'investment' && <TrendingUp className="w-5 h-5 text-[#0E4F3E]" />}
                          {account.type === 'vault' && <PiggyBank className="w-5 h-5 text-amber-800" />}
                          {account.type === 'mutual_fund' && <Building className="w-5 h-5 text-indigo-800" />}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-neutral-900">{account.name}</h3>
                          <p className="text-xs text-neutral-500">{account.institution} · {account.accountNumber}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full">
                        {account.badge}
                      </span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold block">Current Balance</span>
                        <span className="text-lg font-bold text-[#121820] font-mono-tabular">
                          {formatCurrency(account.balance, currentCurrency)}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-neutral-500">
                        {account.rateInfo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: INSIGHTS (Prioritized Actions & Recommendations)                   */}
          {/* ========================================================================= */}
          {activeTab === 'insights' && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Top Insights Status Bar */}
              <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <div>
                      <h2 className="text-base font-bold text-[#121820]">
                        Decisive Action Queue
                      </h2>
                      <p className="text-xs text-neutral-500">
                        {Object.values(appliedActions).filter(Boolean).length} of 5 actions implemented this period
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      +₹16,663 Potential Annual Gain
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
                  Fermor continuously monitors your transactions and balances to identify lazy cash, redundant fees, and acceleration windows. Click <strong>Execute</strong> on any card to simulate the action.
                </p>
              </div>

              {/* Action Cards List */}
              <div className="space-y-4">
                
                {/* 1. Excess Cash Sweep */}
                <div className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-2xs transition-all ${
                  appliedActions['move-cash'] ? 'border-emerald-300 bg-emerald-50/20' : 'border-neutral-300/80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                          Yield Optimization
                        </span>
                        <span className="text-xs font-bold text-neutral-400">High Impact</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                        Move ₹82,000 excess checking cash into 7.15% savings vault
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        <strong>Data:</strong> Your HDFC salary checking currently holds ₹1,82,000, which exceeds your target operating cushion by ₹82,000.<br />
                        <strong>Insight:</strong> Idle balances earn 2.7%. Moving surplus into your SBI Maxima Vault generates ₹5,863/year in interest while maintaining instant liquidity.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleActionToggle('move-cash', 'Scheduled sweep of ₹82,000 into 7.15% savings vault.')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-2xs ${
                        appliedActions['move-cash']
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-[#0E4F3E] text-white hover:bg-[#0A3A2E]'
                      }`}
                    >
                      {appliedActions['move-cash'] ? 'Sweep Scheduled ✓' : 'Execute Transfer'}
                    </button>
                  </div>
                </div>

                {/* 2. Dining Spend Ceiling */}
                <div className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-2xs transition-all ${
                  appliedActions['dining-spend'] ? 'border-emerald-300 bg-emerald-50/20' : 'border-neutral-300/80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                          Budget Momentum
                        </span>
                        <span className="text-xs font-bold text-neutral-400">Spending Control</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                        Lock in dining spend reduction (-14% this month)
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        <strong>Data:</strong> Food & delivery spend is currently tracking ₹3,400 below your 3-month historical baseline.<br />
                        <strong>Insight:</strong> Maintaining this weekly ceiling for the next 21 days will convert this temporary dip into permanent surplus for your Emergency Fund.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleActionToggle('dining-spend', 'Locked in monthly dining budget target.')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-2xs ${
                        appliedActions['dining-spend']
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                      }`}
                    >
                      {appliedActions['dining-spend'] ? 'Ceiling Locked ✓' : 'Lock Target'}
                    </button>
                  </div>
                </div>

                {/* 3. Emergency Fund Boost */}
                <div className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-2xs transition-all ${
                  appliedActions['emergency-on-track'] ? 'border-emerald-300 bg-emerald-50/20' : 'border-neutral-300/80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                          Milestone Velocity
                        </span>
                        <span className="text-xs font-bold text-neutral-400">Milestone</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                        Accelerate Emergency Fund milestone to November
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        <strong>Data:</strong> Emergency Fund currently at 72% (₹2,16,000 / ₹3,00,000). Remaining deficit is ₹84,000.<br />
                        <strong>Insight:</strong> Current pace reaches completion in December. Increasing monthly SIP by ₹10,000 completes the safety cushion 60 days early.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleActionToggle('emergency-on-track', 'Emergency fund milestone pace boosted by ₹10,000/mo.')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-2xs ${
                        appliedActions['emergency-on-track']
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                      }`}
                    >
                      {appliedActions['emergency-on-track'] ? 'Pace Boosted ✓' : 'Boost Pace (+₹10k)'}
                    </button>
                  </div>
                </div>

                {/* 4. Section 80C Tax Window */}
                <div className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-2xs transition-all ${
                  appliedActions['tax-harvest'] ? 'border-emerald-300 bg-emerald-50/20' : 'border-neutral-300/80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
                          Tax Efficiency
                        </span>
                        <span className="text-xs font-bold text-neutral-400">Tax Harvest</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                        Utilize remaining ₹35,000 Section 80C deduction window
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        <strong>Data:</strong> You have utilized ₹1,15,000 of your ₹1,50,000 annual 80C limit for this financial year.<br />
                        <strong>Insight:</strong> Routing ₹35,000 into your Parag Parikh Flexi-Cap / ELSS will save you ₹10,800 in direct income tax.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleActionToggle('tax-harvest', 'Scheduled ₹35,000 ELSS tax-saving SIP.')}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors shadow-2xs ${
                        appliedActions['tax-harvest']
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                      }`}
                    >
                      {appliedActions['tax-harvest'] ? 'Scheduled ✓' : 'Schedule Tax SIP'}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: GOALS (Milestones, Progress & Wealth Simulator)                    */}
          {/* ========================================================================= */}
          {activeTab === 'goals' && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Goals Header & Add Action */}
              <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#0E4F3E]" />
                    <h2 className="text-base font-bold text-[#121820]">
                      Milestone Velocity Engine
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    4 active milestones · Total target: {formatCurrency(16980000, currentCurrency, true)}
                  </p>
                </div>

                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="px-4 py-2 bg-[#0E4F3E] text-white hover:bg-[#0A3A2E] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Goal</span>
                </button>
              </div>

              {/* Goals Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {goals.map((g) => {
                  const percent = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
                  const gap = Math.max(0, g.targetAmount - g.currentAmount);

                  return (
                    <div 
                      key={g.id} 
                      className="bg-white rounded-2xl border border-neutral-300/80 p-6 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                              {g.category}
                            </span>
                            <h3 className="text-base font-bold text-neutral-900 mt-0.5">{g.name}</h3>
                          </div>
                          <span className="text-lg font-bold text-[#0E4F3E] font-mono-tabular">
                            {percent}%
                          </span>
                        </div>

                        <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200">
                          <div 
                            className="h-full bg-[#0E4F3E] rounded-full transition-all duration-500" 
                            style={{ width: `${percent}%` }} 
                          />
                        </div>

                        <div className="flex justify-between text-xs text-neutral-500 font-mono-tabular pt-1">
                          <span>Saved: {formatCurrency(g.currentAmount, currentCurrency)}</span>
                          <span>Target: {formatCurrency(g.targetAmount, currentCurrency)}</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <span className="text-neutral-500">
                          Pace: <strong>{formatCurrency(g.monthlyPace, currentCurrency)}/mo</strong>
                        </span>
                        <button
                          onClick={() => {
                            setGoals(prev => prev.map(item => 
                              item.id === g.id 
                                ? { ...item, currentAmount: Math.min(item.targetAmount, item.currentAmount + 10000) }
                                : item
                            ));
                            showToast('success', 'Goal Funded', `Added ₹10,000 toward ${g.name}.`);
                          }}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          + Add ₹10k
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Wealth Compound Simulator */}
              <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-8 shadow-2xs">
                <div className="pb-5 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#0E4F3E]" />
                    <h3 className="text-base font-bold text-[#121820]">
                      Future Wealth Compound Simulator
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Simulate how your monthly surplus grows at steady compound rates.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
                  {/* Left Controls */}
                  <div className="md:col-span-7 space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span>Monthly Contribution:</span>
                        <span className="font-bold text-[#0E4F3E] font-mono-tabular">
                          {formatCurrency(simMonthlySavings, currentCurrency)} / mo
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="5000"
                        max="100000"
                        step="5000"
                        value={simMonthlySavings}
                        onChange={(e) => setSimMonthlySavings(Number(e.target.value))}
                        className="w-full accent-[#0E4F3E]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span>Time Horizon:</span>
                        <span className="font-bold text-[#0E4F3E] font-mono-tabular">
                          {simHorizonYears} Years
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="1"
                        max="15"
                        step="1"
                        value={simHorizonYears}
                        onChange={(e) => setSimHorizonYears(Number(e.target.value))}
                        className="w-full accent-[#0E4F3E]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-2">
                        <span>Expected Annual Return:</span>
                        <span className="font-bold text-[#0E4F3E] font-mono-tabular">
                          {simReturnRate}% CAGR
                        </span>
                      </div>
                      <input 
                        type="range"
                        min="6"
                        max="15"
                        step="0.5"
                        value={simReturnRate}
                        onChange={(e) => setSimReturnRate(Number(e.target.value))}
                        className="w-full accent-[#0E4F3E]"
                      />
                    </div>
                  </div>

                  {/* Right Calculation Display */}
                  <div className="md:col-span-5 bg-[#FAF8F5] rounded-2xl p-5 border border-neutral-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Projected Corpus in {simHorizonYears} Years
                      </span>
                      <p className="text-2xl sm:text-3xl font-bold text-[#121820] mt-1 font-mono-tabular">
                        {formatCurrency(simCalculation.corpus, currentCurrency)}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-neutral-200/80 text-xs">
                      <div className="flex justify-between text-neutral-600">
                        <span>Principal Invested:</span>
                        <span className="font-mono-tabular font-bold text-neutral-900">
                          {formatCurrency(simCalculation.totalInvested, currentCurrency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-emerald-800">
                        <span>Compound Growth:</span>
                        <span className="font-mono-tabular font-bold">
                          +{formatCurrency(simCalculation.wealthGained, currentCurrency)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: ACTIVITY (Full Transaction & Ledger View)                          */}
          {/* ========================================================================= */}
          {activeTab === 'activity' && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Ledger Controls & Actions */}
              <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neutral-500" />
                    <div>
                      <h2 className="text-base font-bold text-[#121820]">
                        Verified Transaction Ledger
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Showing {filteredTransactions.length} of {transactions.length} transactions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                      title="Download complete ledger as CSV"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={handleSyncNow}
                      className="px-3.5 py-2 bg-[#0E4F3E] text-white hover:bg-[#0A3A2E] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>Sync Ledger</span>
                    </button>
                  </div>
                </div>

                {/* Search & Type Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="Search description, category, or bank..."
                      value={activitySearch}
                      onChange={(e) => setActivitySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl focus:outline-none focus:border-[#0E4F3E]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] border border-neutral-200 rounded-xl text-xs font-medium self-start sm:self-auto">
                    {(['all', 'inflow', 'outflow', 'transfer'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setActivityTypeFilter(type)}
                        className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                          activityTypeFilter === type 
                            ? 'bg-[#0E4F3E] text-white font-semibold' 
                            : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {type === 'all' ? 'All Types' : type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-7 shadow-2xs">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 text-xs">
                    No transactions match the current filter.
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100">
                    {filteredTransactions.map((tx) => {
                      const isInflow = tx.type === 'inflow';
                      const isTransfer = tx.type === 'transfer';

                      return (
                        <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isInflow 
                                ? 'bg-emerald-50 text-emerald-800' 
                                : isTransfer 
                                ? 'bg-blue-50 text-blue-800' 
                                : 'bg-neutral-100 text-neutral-800'
                            }`}>
                              {isInflow && <ArrowDownRight className="w-4 h-4" />}
                              {!isInflow && !isTransfer && <ArrowUpRight className="w-4 h-4" />}
                              {isTransfer && <RefreshCw className="w-3.5 h-3.5" />}
                            </div>

                            <div>
                              <p className="font-semibold text-neutral-900 text-xs sm:text-sm">{tx.title}</p>
                              <p className="text-[11px] text-neutral-500 mt-0.5">
                                {tx.category} · {tx.account} · {tx.date}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`font-mono-tabular font-bold text-xs sm:text-sm ${
                              isInflow ? 'text-emerald-800' : 'text-neutral-800'
                            }`}>
                              {isInflow ? '+' : ''}{formatCurrency(tx.amount, currentCurrency)}
                            </span>
                            <span className="block text-[10px] text-neutral-400 capitalize mt-0.5">
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Add Account Modal */}
      {showAddAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-base text-neutral-900">Connect Financial Account</h3>
              <button onClick={() => setShowAddAccountModal(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Institution</label>
                <select
                  value={newAccountForm.institution}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, institution: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                >
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Zerodha Broking</option>
                  <option>Axis Bank</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Account Nickname</label>
                <input 
                  type="text"
                  placeholder="e.g. Primary Emergency Vault"
                  value={newAccountForm.name}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, name: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Starting Balance (₹)</label>
                <input 
                  type="number"
                  placeholder="50000"
                  value={newAccountForm.balance}
                  onChange={(e) => setNewAccountForm({ ...newAccountForm, balance: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                onClick={() => setShowAddAccountModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!newAccountForm.name) {
                    showToast('warning', 'Missing Details', 'Please provide an account nickname.');
                    return;
                  }
                  const bal = Number(newAccountForm.balance) || 25000;
                  setAccounts(prev => [
                    ...prev,
                    {
                      id: `acc-${Date.now()}`,
                      name: newAccountForm.name,
                      institution: newAccountForm.institution,
                      type: newAccountForm.type,
                      balance: bal,
                      badge: 'Connected',
                      accountNumber: '•••• ' + Math.floor(1000 + Math.random() * 9000),
                      rateInfo: 'Synchronized'
                    }
                  ]);
                  setShowAddAccountModal(false);
                  showToast('success', 'Account Linked', `Successfully connected ${newAccountForm.name}.`);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#0E4F3E] text-white hover:bg-[#0A3A2E] rounded-xl"
              >
                Connect Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
              <h3 className="font-bold text-base text-neutral-900">Create New Milestone Goal</h3>
              <button onClick={() => setShowAddGoalModal(false)}>
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Goal Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Electric Vehicle Down Payment"
                  value={newGoalForm.name}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, name: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Target Amount (₹)</label>
                <input 
                  type="number"
                  placeholder="400000"
                  value={newGoalForm.targetAmount}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, targetAmount: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Monthly Planned Contribution (₹)</label>
                <input 
                  type="number"
                  placeholder="20000"
                  value={newGoalForm.monthlyPace}
                  onChange={(e) => setNewGoalForm({ ...newGoalForm, monthlyPace: e.target.value })}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                onClick={() => setShowAddGoalModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!newGoalForm.name || !newGoalForm.targetAmount) {
                    showToast('warning', 'Missing Fields', 'Please specify a goal name and target amount.');
                    return;
                  }
                  const target = Number(newGoalForm.targetAmount) || 100000;
                  const pace = Number(newGoalForm.monthlyPace) || 10000;
                  setGoals(prev => [
                    ...prev,
                    {
                      id: `goal-${Date.now()}`,
                      name: newGoalForm.name,
                      category: 'Custom Milestone',
                      currentAmount: 0,
                      targetAmount: target,
                      monthlyPace: pace,
                      targetDate: '2027'
                    }
                  ]);
                  setShowAddGoalModal(false);
                  showToast('success', 'Goal Created', `Created milestone ${newGoalForm.name}.`);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#0E4F3E] text-white hover:bg-[#0A3A2E] rounded-xl"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
