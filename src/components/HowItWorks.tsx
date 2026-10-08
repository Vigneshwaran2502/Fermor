import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../lib/data';
import { Check, ArrowRight, ShieldCheck, Zap, TrendingUp, Sparkles, Database } from 'lucide-react';
import { CurrencyCode } from '../types/finance';

interface HowItWorksProps {
  currentCurrency: CurrencyCode;
}

export function HowItWorks({ currentCurrency }: HowItWorksProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-neutral-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E4F3E] mb-2">
            The Fermor Methodology
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121820] leading-tight">
            How it works in practice.{' '}
            <span className="font-serif-editorial italic font-normal text-[#0E4F3E]">
              Three stages to enduring control.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            No complex setup. No manual ledger upkeep. Fermor transforms fragmented accounts into a calm, continuous cadence of financial growth.
          </p>
        </div>

        {/* Step Progression Selector Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-200 ${
                  isActive
                    ? 'bg-white border-[#0E4F3E] shadow-sm ring-1 ring-[#0E4F3E]/20'
                    : 'bg-white/60 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono-tabular text-xs font-bold ${isActive ? 'text-[#0E4F3E]' : 'text-neutral-400'}`}>
                    {step.number}
                  </span>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-[#0E4F3E]' : 'text-neutral-500'}`}>
                    Phase {step.phase}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#121820]">
                  {step.headline}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-10 shadow-[0_12px_36px_rgba(18,24,32,0.04)]">
          
          {/* Left 6 Columns: Detailed Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E4F3E]/8 text-[#0E4F3E] text-xs font-bold uppercase tracking-wider mb-3">
                <span>Step {activeStep.number}</span>
                <span>·</span>
                <span>{activeStep.phase}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121820]">
                {activeStep.headline}
              </h3>
              
              <p className="text-sm sm:text-base font-medium text-[#0E4F3E] mt-1">
                {activeStep.subtitle}
              </p>
              
              <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3 pt-2">
              {activeStep.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length)}
                className="px-4 py-2.5 bg-[#0E4F3E] hover:bg-[#0A3A2E] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-2xs"
              >
                <span>Explore Phase {WORKFLOW_STEPS[(activeStepIndex + 1) % WORKFLOW_STEPS.length].number}: {WORKFLOW_STEPS[(activeStepIndex + 1) % WORKFLOW_STEPS.length].phase}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 6 Columns: Interactive Visual Stage Preview */}
          <div className="lg:col-span-6 bg-[#FAF8F5] rounded-2xl border border-neutral-300/80 p-6 sm:p-8 flex flex-col justify-between min-h-[360px]">
            
            {/* Header of Preview */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-xs">
                  {activeStep.number}
                </div>
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Interface Output · {activeStep.phase}
                </span>
              </div>
              <span className="text-xs text-[#0E4F3E] font-semibold">Live Preview</span>
            </div>

            {/* Contextual Visual Demo based on active step */}
            <div className="py-6 space-y-4">
              {activeStepIndex === 0 && (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Unified Liquidity Pool
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-bold text-[#121820] font-mono-tabular">
                        {activeStep.previewData.metric}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Normalized
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      {activeStep.previewData.submetric}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-neutral-200">
                      <span className="text-neutral-500 block text-[11px]">Checking & Liquid</span>
                      <span className="font-bold text-neutral-900 font-mono-tabular">₹5,45,000</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-neutral-200">
                      <span className="text-neutral-500 block text-[11px]">Equities & Gold</span>
                      <span className="font-bold text-neutral-900 font-mono-tabular">₹19,35,000</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStepIndex === 1 && (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E4F3E] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Next High-Leverage Move
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        +₹4,600/yr Impact
                      </span>
                    </div>
                    <span className="text-xl font-bold text-[#121820] block">
                      {activeStep.previewData.metric}
                    </span>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {activeStep.previewData.submetric}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                    <span className="font-medium text-emerald-950">Execution Readiness</span>
                    <span className="font-bold text-emerald-800">1-Click Auto Deploy</span>
                  </div>
                </div>
              )}

              {activeStepIndex === 2 && (
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Compounded Trajectory
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-bold text-[#0E4F3E] font-mono-tabular">
                        {activeStep.previewData.metric}
                      </span>
                      <span className="text-xs font-semibold text-[#0E4F3E] bg-[#0E4F3E]/8 px-2 py-0.5 rounded-md">
                        Accelerating
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-2">
                      {activeStep.previewData.submetric}
                    </p>
                  </div>

                  <div className="h-10 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 200 40">
                      <path d="M 0 35 Q 80 30, 140 18 T 200 5" fill="none" stroke="#0E4F3E" strokeWidth="2.5" />
                      <circle cx="200" cy="5" r="4" fill="#0E4F3E" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Footer of Preview */}
            <div className="pt-3 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between">
              <span>Automatic updates in real time</span>
              <span className="text-neutral-400">0 manual formula adjustments</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
