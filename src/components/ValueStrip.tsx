import React, { useState } from 'react';
import { Compass, Zap, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export function ValueStrip() {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      id: 'understand',
      number: '01',
      title: 'UNDERSTAND',
      subtitle: 'See your complete financial picture clearly.',
      description:
        'End the anxiety of fragmented bank apps, hidden subscriptions, and stale spreadsheets. Fermor automatically aggregates balances, normalizes expenses, and gives you your true liquid position in seconds.',
      icon: Compass,
      transformation: {
        before: 'Opening 5 separate apps to guess your net runway',
        after: 'One unified balance sheet with real-time liquidity depth',
      },
      points: [
        'Read-only bank and portfolio consolidation',
        'Automatic expense classification with zero manual tagging',
        'Real-time cash runway calculated against baseline burn',
      ],
    },
    {
      id: 'act',
      number: '02',
      title: 'ACT',
      subtitle: 'Know what actions matter most.',
      description:
        'Dashboards are useless if they don’t tell you what to do next. Fermor identifies high-leverage moves: where cash is sitting idle, which silent subscriptions are leaking money, and what surplus to sweep today.',
      icon: Zap,
      transformation: {
        before: 'Paralysis from raw charts with no clear next step',
        after: 'Ranked, high-yield moves calculated specifically for you',
      },
      points: [
        'Algorithmic prioritization ranked by risk-adjusted return',
        'Zero sponsored credit card pitches or conflicted ads',
        'Proactive alerts before monthly spending breaches runway',
      ],
    },
    {
      id: 'grow',
      number: '03',
      title: 'GROW',
      subtitle: 'Build stronger financial habits over time.',
      description:
        'Financial independence isn’t built on lottery trades; it compounds through steady, intelligent habits. Fermor makes the invisible compounding process tangible, accelerating your milestone dates.',
      icon: TrendingUp,
      transformation: {
        before: 'Wondering if you’ll ever hit major milestone targets',
        after: 'Measurable compounding velocity moving completion dates forward',
      },
      points: [
        'Visual trajectory curves reflecting real savings momentum',
        'Surplus optimization simulations shaving months off targets',
        'Fiduciary tracking designed purely for your long-term wealth',
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-24 border-y border-neutral-200/90 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E4F3E] mb-2">
            The Fermor Operating Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121820]">
            From financial noise to effortless momentum.
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            Most personal finance platforms stop at displaying past transactions. Fermor creates an unbroken loop from comprehension to execution.
          </p>
        </div>

        {/* Value Strip Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const isSelected = selectedPillar === idx;
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(idx)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#0E4F3E] shadow-[0_8px_30px_rgba(14,79,62,0.08)] ring-1 ring-[#0E4F3E]/20'
                    : 'bg-white/60 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPillar(idx);
                  }
                }}
                aria-pressed={isSelected}
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                    <span className="font-mono-tabular text-sm font-bold text-neutral-400">
                      {pillar.number}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#0E4F3E] text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-5">
                    <h3 className="text-xs font-bold tracking-widest text-[#0E4F3E] uppercase">
                      {pillar.title}
                    </h3>
                    <p className="text-lg font-bold text-[#121820] mt-1 leading-snug">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Concrete Proof Points */}
                <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2">
                  <div className="text-xs text-neutral-500 font-medium flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0E4F3E] shrink-0 mt-0.5" />
                    <span>{pillar.transformation.after}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Transformation Detail Drawer */}
        <div className="mt-8 p-6 sm:p-8 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E4F3E]">
                Phase {pillars[selectedPillar].number} in Detail · {pillars[selectedPillar].title}
              </span>
              <h4 className="text-xl font-bold text-[#121820]">
                {pillars[selectedPillar].subtitle}
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {pillars[selectedPillar].description}
              </p>
            </div>

            {/* Checklist of Core Capabilities */}
            <div className="space-y-2.5 bg-[#FAF8F5] p-4 rounded-xl border border-neutral-200/80 min-w-[280px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Standard In Every Account
              </span>
              {pillars[selectedPillar].points.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0E4F3E]" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
