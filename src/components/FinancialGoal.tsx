import React, { useState, useId } from 'react';
import { CurrencyCode, FinancialGoal } from '../types/finance';
import { FINANCIAL_GOALS_PRESETS, formatCurrency } from '../lib/data';
import { ShieldCheck, Target, TrendingUp, Sparkles, Calendar, ArrowRight, Zap, Check } from 'lucide-react';
import { useToast } from './Toast';

interface FinancialGoalProps {
  currentCurrency: CurrencyCode;
}

export function FinancialGoalSimulator({ currentCurrency }: FinancialGoalProps) {
  const { showToast } = useToast();
  const [selectedGoalId, setSelectedGoalId] = useState<string>('emergency-fund');
  
  // Active simulator parameters (in INR base)
  const currentPreset = FINANCIAL_GOALS_PRESETS.find((g) => g.id === selectedGoalId) || FINANCIAL_GOALS_PRESETS[0];

  const [currentAmount, setCurrentAmount] = useState<number>(currentPreset.currentAmountINR);
  const [targetAmount, setTargetAmount] = useState<number>(currentPreset.targetAmountINR);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(currentPreset.monthlyContributionINR);
  const [acceleratedMode, setAcceleratedMode] = useState<boolean>(true);

  const goalSelectId = useId();
  const currentAmountInputId = useId();
  const targetAmountInputId = useId();
  const monthlyContributionInputId = useId();

  // Handle preset change
  const handleSelectPreset = (preset: FinancialGoal) => {
    setSelectedGoalId(preset.id);
    setCurrentAmount(preset.currentAmountINR);
    setTargetAmount(preset.targetAmountINR);
    setMonthlyContribution(preset.monthlyContributionINR);
    showToast('info', `Switched Goal: ${preset.name}`, `Loaded target of ${formatCurrency(preset.targetAmountINR, currentCurrency)}.`);
  };

  // Calculations
  const effectiveMonthly = acceleratedMode ? monthlyContribution * 1.25 : monthlyContribution;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentAmount / targetAmount) * 100)));
  const remainingAmount = Math.max(0, targetAmount - currentAmount);
  
  const standardMonths = Math.ceil(remainingAmount / Math.max(1, monthlyContribution));
  const acceleratedMonths = Math.ceil(remainingAmount / Math.max(1, effectiveMonthly));
  const monthsSaved = Math.max(0, standardMonths - acceleratedMonths);

  // Calculate target date
  const getTargetDate = (months: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="goals" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-neutral-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E4F3E] mb-2">
            Interactive Goal Engine
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121820] leading-tight">
            How close are you to{' '}
            <span className="font-serif-editorial italic font-normal text-[#0E4F3E]">
              your next financial milestone?
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Adjust the sliders below to explore your trajectory. See how Fermor’s automated surplus optimization compresses the timeline to your goals.
          </p>
        </div>

        {/* Goal Preset Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2">
            Preset Milestones:
          </span>
          {FINANCIAL_GOALS_PRESETS.map((preset) => {
            const isSelected = selectedGoalId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#0E4F3E] text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
                aria-pressed={isSelected}
              >
                {preset.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Simulator Card */}
        <div className="bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-10 shadow-[0_16px_40px_rgba(18,24,32,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left 6 Columns: Interactive Sliders */}
            <div className="lg:col-span-6 space-y-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E4F3E] block mb-1">
                  Active Goal
                </span>
                <h3 className="text-2xl font-bold text-[#121820]">
                  {currentPreset.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Category: {currentPreset.category} · Fully modeled in {currentCurrency}
                </p>
              </div>

              {/* Slider 1: Target Goal Amount */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-700">
                  <label htmlFor={targetAmountInputId}>Target Milestone Amount</label>
                  <span className="font-mono-tabular text-sm text-[#121820] font-bold">
                    {formatCurrency(targetAmount, currentCurrency)}
                  </span>
                </div>
                <input
                  id={targetAmountInputId}
                  type="range"
                  min={100000}
                  max={2500000}
                  step={25000}
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg cursor-pointer"
                  aria-label="Target Milestone Amount"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono-tabular">
                  <span>{formatCurrency(100000, currentCurrency, true)}</span>
                  <span>{formatCurrency(2500000, currentCurrency, true)}</span>
                </div>
              </div>

              {/* Slider 2: Current Saved Amount */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-700">
                  <label htmlFor={currentAmountInputId}>Currently Saved</label>
                  <span className="font-mono-tabular text-sm text-[#0E4F3E] font-bold">
                    {formatCurrency(currentAmount, currentCurrency)}
                  </span>
                </div>
                <input
                  id={currentAmountInputId}
                  type="range"
                  min={0}
                  max={targetAmount}
                  step={10000}
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg cursor-pointer"
                  aria-label="Currently Saved Amount"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono-tabular">
                  <span>{formatCurrency(0, currentCurrency, true)}</span>
                  <span>{formatCurrency(targetAmount, currentCurrency, true)}</span>
                </div>
              </div>

              {/* Slider 3: Monthly Contribution */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-neutral-700">
                  <label htmlFor={monthlyContributionInputId}>Monthly Savings Contribution</label>
                  <span className="font-mono-tabular text-sm text-neutral-900 font-bold">
                    {formatCurrency(monthlyContribution, currentCurrency)} / month
                  </span>
                </div>
                <input
                  id={monthlyContributionInputId}
                  type="range"
                  min={5000}
                  max={100000}
                  step={5000}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 rounded-lg cursor-pointer"
                  aria-label="Monthly Savings Contribution"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono-tabular">
                  <span>{formatCurrency(5000, currentCurrency, true)}/mo</span>
                  <span>{formatCurrency(100000, currentCurrency, true)}/mo</span>
                </div>
              </div>

              {/* Toggle: Fermor Acceleration Engine */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">
                      Simulate Fermor Surplus Optimization (+25%)
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Redirects discretionary leakage & idle checking yield
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAcceleratedMode(!acceleratedMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    acceleratedMode ? 'bg-[#0E4F3E]' : 'bg-neutral-300'
                  }`}
                  role="switch"
                  aria-checked={acceleratedMode}
                  aria-label="Toggle surplus optimization"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      acceleratedMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right 6 Columns: Visual Progress & Timeline Impact */}
            <div className="lg:col-span-6 bg-[#FAF8F5] rounded-2xl border border-neutral-300/80 p-6 sm:p-8 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Milestone Progress Gauge
                  </span>
                  <span className="text-xs font-bold text-[#0E4F3E] bg-[#0E4F3E]/8 px-2.5 py-0.5 rounded-full">
                    {progressPercent}% Complete
                  </span>
                </div>

                {/* Big Progress Bar */}
                <div className="mt-6">
                  <div className="w-full h-4 bg-neutral-200 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-[#0E4F3E] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-baseline mt-3">
                    <div>
                      <span className="text-xs text-neutral-500 block">Currently Accumulated</span>
                      <span className="text-xl font-bold text-[#121820] font-mono-tabular">
                        {formatCurrency(currentAmount, currentCurrency)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-neutral-500 block">Remaining Gap</span>
                      <span className="text-xl font-bold text-neutral-700 font-mono-tabular">
                        {formatCurrency(remainingAmount, currentCurrency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Milestone Timeline Callout */}
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white rounded-xl border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Target Date</span>
                    </div>
                    <span className="text-lg font-bold text-[#121820]">
                      {getTargetDate(acceleratedMode ? acceleratedMonths : standardMonths)}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5 font-mono-tabular">
                      {acceleratedMode ? `${acceleratedMonths} months away` : `${standardMonths} months away`}
                    </span>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-neutral-200">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#0E4F3E]" />
                      <span>Fermor Effect</span>
                    </div>
                    <span className="text-lg font-bold text-emerald-800">
                      {acceleratedMode && monthsSaved > 0 ? `-${monthsSaved} Months` : 'Baseline'}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      {acceleratedMode && monthsSaved > 0 ? 'Accelerated completion' : 'Enable optimization'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Insight Message */}
              <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center gap-2 text-xs text-neutral-600">
                <Check className="w-4 h-4 text-[#0E4F3E] shrink-0" />
                <span>
                  By capturing your silent surplus, you save approximately{' '}
                  <strong className="text-neutral-900">{monthsSaved} months</strong> on this goal.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
