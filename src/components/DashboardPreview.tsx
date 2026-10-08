import React, { useState } from 'react';
import { CurrencyCode, Timeframe, ChartPoint } from '../types/finance';
import { formatCurrency, TIMEFRAME_DATA } from '../lib/data';
import { TrendingUp, ArrowDownRight, ArrowUpRight, ShieldCheck, Sparkles, PieChart, Layers } from 'lucide-react';

interface DashboardPreviewProps {
  currentCurrency: CurrencyCode;
}

export function DashboardPreview({ currentCurrency }: DashboardPreviewProps) {
  const [timeframe, setTimeframe] = useState<Timeframe>('6M');
  const [activeAssetFilter, setActiveAssetFilter] = useState<'all' | 'cash' | 'investments'>('all');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const currentData = TIMEFRAME_DATA[timeframe];
  const points = currentData.points;
  const summary = currentData.summary;

  // Chart dimensions & coordinate mapping
  const chartWidth = 700;
  const chartHeight = 260;
  const paddingX = 40;
  const paddingY = 30;

  // Get min and max based on filter
  const getValue = (pt: ChartPoint) => {
    if (activeAssetFilter === 'cash') return pt.cash;
    if (activeAssetFilter === 'investments') return pt.investments;
    return pt.netWorth;
  };

  const values = points.map(getValue);
  const minVal = Math.min(...values) * 0.96;
  const maxVal = Math.max(...values) * 1.04;

  const getCoordinates = () => {
    return points.map((pt, index) => {
      const x = paddingX + (index / (points.length - 1)) * (chartWidth - 2 * paddingX);
      const val = getValue(pt);
      const y = chartHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (chartHeight - 2 * paddingY);
      return { x, y, pt, val };
    });
  };

  const coords = getCoordinates();

  // Generate smooth SVG curve using cubic bezier control points
  const generatePath = () => {
    if (coords.length === 0) return '';
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const current = coords[i];
      const next = coords[i + 1];
      const controlX1 = current.x + (next.x - current.x) / 2;
      const controlY1 = current.y;
      const controlX2 = current.x + (next.x - current.x) / 2;
      const controlY2 = next.y;
      d += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const linePath = generatePath();
  const areaPath = coords.length > 0
    ? `${linePath} L ${coords[coords.length - 1].x} ${chartHeight - paddingY} L ${coords[0].x} ${chartHeight - paddingY} Z`
    : '';

  const hoveredCoord = hoveredPointIndex !== null ? coords[hoveredPointIndex] : null;

  return (
    <section id="product" className="py-24 sm:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E4F3E] mb-2">
            The Fermor Workspace Experience
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121820] leading-tight">
            Your financial life,{' '}
            <span className="font-serif-editorial italic font-normal text-[#0E4F3E]">
              finally in one clear picture.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Interact with our live product interface below. Switch timeframes, filter asset classes, and explore how Fermor synthesizes continuous bank feeds into clean, actionable intelligence.
          </p>
        </div>

        {/* Dashboard Shell */}
        <div className="rounded-3xl border border-neutral-300/80 bg-white shadow-[0_16px_40px_rgba(18,24,32,0.06)] overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="p-5 sm:p-7 border-b border-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Total Managed Position
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60">
                  Healthy · 94 Health Score
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-bold text-[#121820] font-mono-tabular">
                  {formatCurrency(
                    activeAssetFilter === 'cash'
                      ? 545000
                      : activeAssetFilter === 'investments'
                      ? 2025000
                      : summary.netWorthINR,
                    currentCurrency
                  )}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#0E4F3E] flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +{summary.growthPercent}% ({timeframe})
                </span>
              </div>
            </div>

            {/* Timeframe Selector & Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Asset Filter Tabs */}
              <div className="flex items-center p-1 bg-neutral-200/60 rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveAssetFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeAssetFilter === 'all'
                      ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Net Worth
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAssetFilter('cash')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeAssetFilter === 'cash'
                      ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Liquid Cash
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAssetFilter('investments')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeAssetFilter === 'investments'
                      ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Investments
                </button>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex items-center p-1 bg-[#121820] rounded-xl text-xs font-semibold text-white">
                {(['1M', '6M', '1Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => {
                      setTimeframe(tf);
                      setHoveredPointIndex(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      timeframe === tf
                        ? 'bg-[#0E4F3E] text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                    aria-pressed={timeframe === tf}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-200/80 divide-x divide-y md:divide-y-0 divide-neutral-200/80 bg-white">
            <div className="p-4 sm:p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                Total Inflow ({timeframe})
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#121820] font-mono-tabular mt-1 block">
                {formatCurrency(summary.inflowINR, currentCurrency, true)}
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1 mt-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                Salary & dividend yield
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                Total Outflow ({timeframe})
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#121820] font-mono-tabular mt-1 block">
                {formatCurrency(summary.outflowINR, currentCurrency, true)}
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1 mt-1 font-medium">
                <ArrowDownRight className="w-3.5 h-3.5 text-[#0E4F3E]" />
                Controlled discretionary
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                Savings Velocity
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#0E4F3E] font-mono-tabular mt-1 block">
                {summary.savingsRatePercent}%
              </span>
              <span className="text-xs text-emerald-700 font-medium mt-1 block">
                Above benchmark (+9.5%)
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block">
                Liquid Runway
              </span>
              <span className="text-lg sm:text-xl font-bold text-[#121820] font-mono-tabular mt-1 block">
                {summary.runwayMonths} Months
              </span>
              <span className="text-xs text-neutral-500 font-medium mt-1 block">
                Calculated at baseline burn
              </span>
            </div>
          </div>

          {/* Interactive Chart + Breakdown Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200/80">
            
            {/* Left 8 Columns: Dynamic SVG Chart */}
            <div className="lg:col-span-8 p-5 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      Performance Trajectory Curve
                    </span>
                    <span className="text-xs text-neutral-400">· Hover points to inspect</span>
                  </div>
                  {hoveredCoord && (
                    <div className="text-xs font-semibold text-[#0E4F3E] bg-[#0E4F3E]/8 px-2.5 py-1 rounded-md">
                      {hoveredCoord.pt.date}: {formatCurrency(hoveredCoord.val, currentCurrency)}
                    </div>
                  )}
                </div>

                {/* SVG Chart Element */}
                <div className="relative w-full aspect-[2.7/1] min-h-[220px]">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="mainChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0E4F3E" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#0E4F3E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#F3F4F6" strokeWidth="1" />
                    <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#F3F4F6" strokeWidth="1" />
                    <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#E5E7EB" strokeWidth="1" />

                    {/* Area fill */}
                    {areaPath && (
                      <path d={areaPath} fill="url(#mainChartGrad)" />
                    )}

                    {/* Main Curve line */}
                    {linePath && (
                      <path
                        d={linePath}
                        fill="none"
                        stroke="#0E4F3E"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Scrubber vertical line if hovered */}
                    {hoveredCoord && (
                      <line
                        x1={hoveredCoord.x}
                        y1={paddingY}
                        x2={hoveredCoord.x}
                        y2={chartHeight - paddingY}
                        stroke="#0E4F3E"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    )}

                    {/* Data Points */}
                    {coords.map((coord, i) => {
                      const isHovered = hoveredPointIndex === i;
                      return (
                        <g
                          key={i}
                          className="cursor-pointer transition-transform"
                          onMouseEnter={() => setHoveredPointIndex(i)}
                          onClick={() => setHoveredPointIndex(i)}
                        >
                          <circle
                            cx={coord.x}
                            cy={coord.y}
                            r={isHovered ? 6 : 4}
                            fill={isHovered ? '#0E4F3E' : '#FFFFFF'}
                            stroke="#0E4F3E"
                            strokeWidth={isHovered ? 3 : 2}
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-xs text-neutral-400 font-mono-tabular pt-3 border-t border-neutral-100">
                  {points.map((pt, idx) => (
                    <span
                      key={idx}
                      className={hoveredPointIndex === idx ? 'text-[#0E4F3E] font-semibold' : ''}
                    >
                      {pt.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Insight Note */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Net trajectory accelerated by +₹38k/mo discipline
                </span>
                <span className="font-mono-tabular">Demonstration data</span>
              </div>
            </div>

            {/* Right 4 Columns: Spending Breakdown */}
            <div className="lg:col-span-4 p-5 sm:p-7 bg-neutral-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                    <PieChart className="w-3.5 h-3.5 text-[#0E4F3E]" />
                    Expense Distribution
                  </span>
                  <span className="text-xs text-neutral-500 font-mono-tabular">
                    {formatCurrency(summary.outflowINR, currentCurrency, true)} total
                  </span>
                </div>

                {/* Visual Segment Progress Bar */}
                <div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-neutral-200">
                  {currentData.breakdown.map((item, i) => (
                    <div
                      key={i}
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      title={`${item.category}: ${item.percentage}%`}
                    />
                  ))}
                </div>

                {/* Category Breakdown Rows */}
                <div className="space-y-3.5">
                  {currentData.breakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-neutral-800">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-neutral-900 font-mono-tabular">
                          {formatCurrency(item.amountINR, currentCurrency, true)}
                        </span>
                        <span
                          className={`font-mono-tabular w-12 text-right ${
                            item.changePercent < 0
                              ? 'text-emerald-700 font-semibold'
                              : item.changePercent > 0
                              ? 'text-neutral-500'
                              : 'text-neutral-400'
                          }`}
                        >
                          {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Callout */}
              <div className="mt-6 pt-4 border-t border-neutral-200/80 text-[11px] text-neutral-500 leading-relaxed">
                Categories normalized automatically via institutional merchant codes. Zero manual receipt matching.
              </div>
            </div>

          </div>

          {/* Footer Bar inside Product Showcase */}
          <div className="px-5 py-3.5 bg-neutral-100/70 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E4F3E]" />
              <span className="font-medium text-neutral-800">Fermor Security:</span>
              <span className="text-neutral-500">Read-only balance synchronization with zero withdrawal capabilities.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-neutral-700">Display Currency: {currentCurrency}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
