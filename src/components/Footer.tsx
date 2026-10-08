import React from 'react';
import { CurrencyCode } from '../types/finance';
import { CURRENCIES } from '../lib/data';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useToast } from './Toast';

interface FooterProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'security') => void;
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export function Footer({ currentCurrency, onCurrencyChange, onOpenLegal, onOpenAuth }: FooterProps) {
  const { showToast } = useToast();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 76;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleContactAdvisor = () => {
    showToast(
      'info',
      'Advisor Advisory Desk',
      'Direct inquiries routed to advisory@fermor.finance. Response window: < 4 business hours.'
    );
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-neutral-200/90 pt-16 pb-12 text-[#121820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-base tracking-tight">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-[#121820]">
                Fermor
              </span>
            </div>

            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              The modern personal finance platform for intelligent individuals. Bringing clarity to personal wealth: Understand where you stand, know what to do next, and grow with confidence.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-[#0E4F3E]" />
              <span>Read-only architecture · Designed for clarity</span>
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Product
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#product"
                  onClick={(e) => handleSmoothScroll(e, '#product')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  Overview & Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  onClick={(e) => handleSmoothScroll(e, '#insights')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  Actionable Insights
                </a>
              </li>
              <li>
                <a
                  href="#goals"
                  onClick={(e) => handleSmoothScroll(e, '#goals')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  Goal Simulator
                </a>
              </li>
              <li>
                <a
                  href="#why-fermor"
                  onClick={(e) => handleSmoothScroll(e, '#why-fermor')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  Why Fermor
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Company & Support */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Company
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('security')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors text-left"
                >
                  Security Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleContactAdvisor}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors text-left flex items-center gap-1"
                >
                  <span>Contact Advisory Desk</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors text-left"
                >
                  Request Early Access
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Legal */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Legal & Trust
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('security')}
                  className="text-neutral-600 hover:text-neutral-950 transition-colors text-left"
                >
                  Data Sovereignty
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Currency Picker */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Fermor Financial Technologies. All rights reserved.
          </div>

          <div className="flex items-center gap-3">
            <span>Display Currency:</span>
            <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-lg p-0.5 font-medium">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    currentCurrency === code
                      ? 'bg-[#0E4F3E] text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                  aria-pressed={currentCurrency === code}
                >
                  {code} ({CURRENCIES[code].symbol})
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
