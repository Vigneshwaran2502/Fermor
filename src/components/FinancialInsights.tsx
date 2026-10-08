import React, { useState } from 'react';
import { CurrencyCode, InsightItem } from '../types/finance';
import { INITIAL_INSIGHTS, formatCurrency } from '../lib/data';
import { useToast } from './Toast';
import { ArrowDown, Check, Sparkles, RotateCcw, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FinancialInsightsProps {
  currentCurrency: CurrencyCode;
}

export function FinancialInsights({ currentCurrency }: FinancialInsightsProps) {
  const [insights, setInsights] = useState<InsightItem[]>(INITIAL_INSIGHTS);
  const { showToast } = useToast();

  const handleApplyAction = (insight: InsightItem) => {
    setInsights((prev) =>
      prev.map((item) =>
        item.id === insight.id ? { ...item, status: 'applied' } : item
      )
    );
    showToast(
      'success',
      'Action Executed',
      `Applied recommendation: "${insight.recommendedAction}". Estimated annual benefit: ${insight.estimatedImpact}.`
    );
  };

  const handleDismiss = (id: string) => {
    setInsights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'dismissed' } : item))
    );
    showToast('info', 'Insight Dismissed', 'Recommendation archived. You can re-enable anytime.');
  };

  const handleReset = () => {
    setInsights(INITIAL_INSIGHTS);
    showToast('info', 'Insights Reset', 'Restored all demonstration insights to original active state.');
  };

  const activeCount = insights.filter((i) => i.status === 'active').length;
  const appliedCount = insights.filter((i) => i.status === 'applied').length;

  return (
    <section id="insights" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-neutral-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Narrative Lead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0E4F3E] mb-2">
              The Intelligence Pipeline
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121820] leading-tight">
              Data is raw noise.{' '}
              <span className="font-serif-editorial italic font-normal text-[#0E4F3E]">
                Fermor reveals the next move.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
              Every card below demonstrates how Fermor transforms raw bank logs into prioritized actions. No ambiguous charts—just clear steps to increase liquidity and compound wealth.
            </p>
          </div>

          {/* Action Status Summary */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-700 shadow-2xs font-medium">
              <span className="font-bold text-[#0E4F3E]">{activeCount}</span> Pending · <span className="font-bold text-emerald-700">{appliedCount}</span> Applied
            </div>
            {appliedCount > 0 && (
              <button
                onClick={handleReset}
                className="px-3 py-2 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 text-xs text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Reset demo insights"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Cards Grid: DATA -> INSIGHT -> ACTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {insights.map((item) => {
            const isApplied = item.status === 'applied';
            const isDismissed = item.status === 'dismissed';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 ${
                  isApplied
                    ? 'bg-emerald-50/60 border-emerald-300 shadow-sm'
                    : isDismissed
                    ? 'opacity-40 bg-neutral-100/60 border-neutral-200'
                    : 'bg-white border-neutral-300/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-neutral-400'
                }`}
              >
                <div>
                  {/* Card Header & Tag */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0E4F3E]">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono-tabular text-neutral-500 font-semibold">
                      {item.estimatedImpact}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#121820] mt-3">
                    {item.title}
                  </h3>

                  {/* 3-Step Vertical Flow: DATA -> INSIGHT -> ACTION */}
                  <div className="mt-5 space-y-3 relative">
                    
                    {/* Step 1: DATA */}
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        1. Data Signal
                      </span>
                      <p className="text-xs font-medium text-neutral-800 leading-relaxed font-mono-tabular">
                        {item.dataPoint}
                      </p>
                    </div>

                    <div className="flex justify-center -my-1 text-neutral-300">
                      <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
                    </div>

                    {/* Step 2: INSIGHT */}
                    <div className="p-3 bg-[#FAF8F5] rounded-xl border border-neutral-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E4F3E] block mb-1">
                        2. Fermor Synthesis
                      </span>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        {item.insight}
                      </p>
                    </div>

                    <div className="flex justify-center -my-1 text-neutral-300">
                      <ArrowDown className="w-3.5 h-3.5 text-[#0E4F3E]" />
                    </div>

                    {/* Step 3: ACTION */}
                    <div className="p-3 bg-[#0E4F3E]/6 rounded-xl border border-[#0E4F3E]/20">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E4F3E] block mb-1">
                        3. Prescribed Move
                      </span>
                      <p className="text-xs font-semibold text-neutral-900 leading-relaxed">
                        {item.recommendedAction}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Bottom Action Affordance */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                  {isApplied ? (
                    <div className="w-full py-2 px-3 rounded-xl bg-emerald-100/90 text-emerald-900 text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-300">
                      <Check className="w-4 h-4" />
                      <span>Action Applied to Strategy</span>
                    </div>
                  ) : isDismissed ? (
                    <div className="w-full flex items-center justify-between text-xs text-neutral-500">
                      <span>Archived</span>
                      <button
                        onClick={() => handleApplyAction(item)}
                        className="text-[#0E4F3E] hover:underline font-medium"
                      >
                        Restore & Execute
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDismiss(item.id)}
                        className="px-3 py-2 text-xs text-neutral-500 hover:text-neutral-800 transition-colors rounded-lg hover:bg-neutral-100"
                      >
                        Dismiss
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyAction(item)}
                        className="px-4 py-2 bg-[#0E4F3E] hover:bg-[#0A3A2E] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs active:scale-[0.98]"
                      >
                        <span>Execute Action</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Narrative Callout Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-neutral-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0E4F3E]/10 text-[#0E4F3E] flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Automated Financial Audits</p>
              <p className="text-neutral-500">Fermor flags idle cash drag and recurring subscription leaks so your capital stays productive.</p>
            </div>
          </div>
          <span className="font-medium text-[#0E4F3E] shrink-0">Unbiased · Member-Aligned</span>
        </div>

      </div>
    </section>
  );
}
