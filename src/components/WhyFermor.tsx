import React, { useState } from 'react';
import { WHY_FERMOR_POINTS, COMPARISON_ROWS } from '../lib/data';
import { ShieldCheck, Check, X, Sparkles, Scale, Lock, HeartHandshake } from 'lucide-react';

export function WhyFermor() {
  const [showFullComparison, setShowFullComparison] = useState(false);

  return (
    <section id="why-fermor" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-neutral-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E4F3E] mb-2">
            The Fermor Difference
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121820] leading-tight">
            Built for clarity.{' '}
            <span className="font-serif-editorial italic font-normal text-[#0E4F3E]">
              Designed with strict fiduciary intent.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Most personal finance software is either a tedious blank spreadsheet or an advertising billboard masquerading as a budgeting app. We built what was missing.
          </p>
        </div>

        {/* 4 Thematic Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {WHY_FERMOR_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-300/80 shadow-[0_4px_24px_rgba(18,24,32,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0E4F3E]">
                    0{idx + 1}. {item.title}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400 font-mono-tabular">
                    {item.statLabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#121820] mt-4 leading-snug">
                  {item.highlight}
                </h3>

                <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-[#0E4F3E]">
                <Check className="w-4 h-4 text-[#0E4F3E]" />
                <span>Zero compromise on privacy and alignment</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table / Accordion */}
        <div className="mt-16 bg-white rounded-3xl border border-neutral-300/80 p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E4F3E] flex items-center gap-1.5">
                <Scale className="w-4 h-4" />
                Direct Comparison
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#121820] mt-1">
                How Fermor compares to the alternatives
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowFullComparison(!showFullComparison)}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors self-start sm:self-auto"
            >
              {showFullComparison ? 'Collapse Matrix' : 'View Full Matrix'}
            </button>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 pr-4">Dimension</th>
                  <th className="py-3 px-4">Manual Spreadsheets</th>
                  <th className="py-3 px-4">Traditional Budget Apps</th>
                  <th className="py-3 pl-4 text-[#0E4F3E] bg-[#0E4F3E]/5 rounded-t-xl font-bold">
                    The Fermor Standard
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {(showFullComparison ? COMPARISON_ROWS : COMPARISON_ROWS.slice(0, 3)).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3.5 pr-4 font-semibold text-neutral-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {row.spreadsheets}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600">
                      {row.traditionalApps}
                    </td>
                    <td className="py-3.5 pl-4 text-[#0E4F3E] font-medium bg-[#0E4F3E]/5">
                      {row.fermor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Privacy Note */}
          <div className="mt-8 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E4F3E]" />
              <span>We never monetize your balance sheets or transaction history.</span>
            </div>
            <span className="font-semibold text-neutral-700">Strict Fiduciary Standard</span>
          </div>
        </div>

      </div>
    </section>
  );
}
