import React, { useState } from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, Check, Sparkles, Activity, Clock, ArrowUpRight } from 'lucide-react';
import { CurrencyCode } from '../types/finance';
import { formatCurrency, TIMEFRAME_DATA } from '../lib/data';
import { useToast } from './Toast';

interface HeroProps {
  currentCurrency: CurrencyCode;
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export function Hero({ currentCurrency, onOpenAuth }: HeroProps) {
  const { showToast } = useToast();
  const [interactiveSweepApplied, setInteractiveSweepApplied] = useState(false);
  const [activeTab, setActiveTab] = useState<'balance' | 'cashflow'>('balance');

  // Interactive micro-simulation on hero dashboard
  const baseNetWorth = TIMEFRAME_DATA['1M'].summary.netWorthINR;
  const currentNetWorth = interactiveSweepApplied ? baseNetWorth + 6500 : baseNetWorth;

  const handleSimulateAction = () => {
    if (!interactiveSweepApplied) {
      setInteractiveSweepApplied(true);
      showToast(
        'success',
        'Surplus Auto-Sweep Executed',
        'Simulated: Moved ₹6,500 idle cash into 7.1% liquid yield fund. Projected +₹461/mo passive acceleration.'
      );
    } else {
      setInteractiveSweepApplied(false);
      showToast('info', 'Simulation Reset', 'Reverted hero dashboard state to initial balance.');
    }
  };

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('how-it-works');
    if (target) {
      const offsetTop = target.offsetTop - 76;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-subtle-mesh">
      {/* Soft atmospheric gradient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#0E4F3E]/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Editorial Narrative Badge */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs mb-6 text-xs font-medium text-neutral-700">
            <span className="w-2 h-2 rounded-full bg-[#0E4F3E]" />
            <span className="font-semibold text-[#0E4F3E]">A clearer view of personal finance</span>
            <span className="text-neutral-300">·</span>
            <span>Zero spreadsheets</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121820] leading-[1.08] text-balance">
            Understand your money.{' '}
            <span className="font-serif-editorial italic font-normal text-[#0E4F3E] block sm:inline">
              Make better decisions.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-600 max-w-2xl leading-relaxed text-balance">
            Fermor brings clarity to personal finance by helping you understand where you stand, know what to do next, and build lasting financial habits over time.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => onOpenAuth('signup')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0E4F3E] hover:bg-[#0A3A2E] text-white rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(14,79,62,0.22)] active:scale-[0.98] group"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#how-it-works"
              onClick={handleScrollToHowItWorks}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-xl font-semibold text-sm sm:text-base text-center transition-all shadow-2xs"
            >
              See how it works
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0E4F3E]" />
              <span>Read-only institution sync</span>
            </div>
            <span className="hidden sm:inline text-neutral-300">·</span>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#0E4F3E]" />
              <span>Zero advertising conflicts</span>
            </div>
            <span className="hidden sm:inline text-neutral-300">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0E4F3E]" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Hero Realistic Financial Dashboard UI */}
        <div className="mt-14 sm:mt-18 max-w-5xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-neutral-300/80 bg-white/95 shadow-[0_20px_50px_rgba(18,24,32,0.08)] overflow-hidden">
            
            {/* Window Chrome / Subheader Bar */}
            <div className="px-5 py-3.5 bg-neutral-100/70 border-b border-neutral-200/90 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                </div>
                <span className="text-xs font-semibold text-neutral-600 pl-2 border-l border-neutral-200">
                  Fermor Financial Console · Live Snapshot
                </span>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-neutral-200 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('balance')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'balance'
                      ? 'bg-[#0E4F3E] text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Balance Sheet
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('cashflow')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === 'cashflow'
                      ? 'bg-[#0E4F3E] text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Monthly Flow
                </button>
              </div>
            </div>

            {/* Dashboard Content Interior */}
            <div className="p-5 sm:p-8 space-y-6">
              
              {/* Top Row: Primary Metric + Key Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Main Net Worth Callout */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Total Calculated Net Worth
                    </span>
                    <span className="text-xs font-semibold text-[#0E4F3E] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +2.8% (30d)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121820] font-mono-tabular">
                      {formatCurrency(currentNetWorth, currentCurrency)}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Across 5 linked institutions · Last synchronized 4 minutes ago
                  </p>
                </div>

                {/* KPI Triad */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/80">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Liquid Runway
                    </span>
                    <span className="text-lg font-bold text-[#121820] font-mono-tabular mt-1 block">
                      8.6 Months
                    </span>
                    <span className="text-[11px] text-[#0E4F3E] font-medium">Optimal buffer (6m+)</span>
                  </div>

                  <div className="p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/80">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Savings Velocity
                    </span>
                    <span className="text-lg font-bold text-[#121820] font-mono-tabular mt-1 block">
                      39.5%
                    </span>
                    <span className="text-[11px] text-[#0E4F3E] font-medium">+4.2% vs target</span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200/80">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 block">
                      Net Monthly Delta
                    </span>
                    <span className="text-lg font-bold text-[#121820] font-mono-tabular mt-1 block text-emerald-800">
                      +{formatCurrency(77000, currentCurrency, true)}
                    </span>
                    <span className="text-[11px] text-neutral-500 font-medium">Inflow ₹1.95L · Outflow ₹1.18L</span>
                  </div>
                </div>

              </div>

              {/* Middle Section: Visual Mini Trajectory & Intelligent Next Action */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-neutral-200/80">
                
                {/* SVG Visual mini-chart */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700">30-Day Position Trajectory</span>
                    <span>Values in {currentCurrency}</span>
                  </div>

                  <div className="h-28 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0E4F3E" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#0E4F3E" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Horizontal guide lines */}
                      <line x1="0" y1="25" x2="400" y2="25" stroke="#E5E7EB" strokeDasharray="3 3" />
                      <line x1="0" y1="65" x2="400" y2="65" stroke="#E5E7EB" strokeDasharray="3 3" />

                      {/* Area Fill */}
                      <path
                        d="M 0 85 L 80 72 L 160 55 L 260 40 L 400 18 L 400 100 L 0 100 Z"
                        fill="url(#heroGradient)"
                      />
                      {/* Stroke Line */}
                      <path
                        d="M 0 85 L 80 72 L 160 55 L 260 40 L 400 18"
                        fill="none"
                        stroke="#0E4F3E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Data Point Dots */}
                      <circle cx="80" cy="72" r="3.5" fill="#FFFFFF" stroke="#0E4F3E" strokeWidth="2" />
                      <circle cx="160" cy="55" r="3.5" fill="#FFFFFF" stroke="#0E4F3E" strokeWidth="2" />
                      <circle cx="260" cy="40" r="3.5" fill="#FFFFFF" stroke="#0E4F3E" strokeWidth="2" />
                      <circle cx="400" cy="18" r="4.5" fill="#0E4F3E" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[11px] text-neutral-400 font-mono-tabular">
                    <span>Sep 05</span>
                    <span>Sep 12</span>
                    <span>Sep 19</span>
                    <span>Sep 26</span>
                    <span className="font-semibold text-[#0E4F3E]">Today (+₹67.4k)</span>
                  </div>
                </div>

                {/* Right Interactive Recommendation Card */}
                <div className="lg:col-span-5 bg-[#FAF8F5] border border-neutral-300 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E4F3E] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        Prioritized Action #1
                      </span>
                      <span className="text-[11px] text-neutral-500">Updated 10m ago</span>
                    </div>

                    <h4 className="text-sm font-bold text-[#121820]">
                      Idle Checking Surplus Detected
                    </h4>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      You have {formatCurrency(145000, currentCurrency, true)} in checking. Your 6-month buffer requires only {formatCurrency(80000, currentCurrency, true)}.
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-200 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-neutral-400 block">Calculated Yield</span>
                      <span className="text-xs font-bold text-emerald-800">+₹461/month extra</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSimulateAction}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                        interactiveSweepApplied
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-[#0E4F3E] text-white hover:bg-[#0A3A2E] shadow-2xs'
                      }`}
                      aria-pressed={interactiveSweepApplied}
                    >
                      {interactiveSweepApplied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Sweep Active</span>
                        </>
                      ) : (
                        <>
                          <span>Execute Sweep</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Micro Activity Footer inside Dashboard */}
            <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#0E4F3E]" />
                <span className="font-medium text-neutral-700">Financial Pulse:</span>
                <span className="text-neutral-500">Zero duplicate transactions · All 4 credit lines on auto-pay zero interest</span>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono-tabular">Demonstration snapshot</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
