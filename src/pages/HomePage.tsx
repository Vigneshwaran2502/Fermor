import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrencyCode } from '../types/finance';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ValueStrip } from '../components/ValueStrip';
import { DashboardPreview } from '../components/DashboardPreview';
import { FinancialInsights } from '../components/FinancialInsights';
import { HowItWorks } from '../components/HowItWorks';
import { WhyFermor } from '../components/WhyFermor';
import { FinancialGoalSimulator } from '../components/FinancialGoal';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { AuthModal, LegalModal } from '../components/Modals';

interface HomePageProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
}

export function HomePage({ currentCurrency, onCurrencyChange }: HomePageProps) {
  const location = useLocation();

  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signup' | 'login' }>({
    isOpen: false,
    mode: 'login',
  });

  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'terms' | 'security';
  }>({
    isOpen: false,
    type: 'privacy',
  });

  // Automatically open auth modal if redirected with requireLogin
  useEffect(() => {
    if (location.state && (location.state as { requireLogin?: boolean }).requireLogin) {
      setAuthModal({ isOpen: true, mode: 'login' });
    }
  }, [location.state]);

  const handleOpenAuth = (mode: 'signup' | 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleOpenLegal = (type: 'privacy' | 'terms' | 'security') => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121820] flex flex-col font-sans selection:bg-[#0E4F3E]/15 selection:text-[#0E4F3E]">
      {/* Navigation */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={onCurrencyChange}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          currentCurrency={currentCurrency}
          onOpenAuth={handleOpenAuth}
        />

        {/* 2. Value / Trust Strip: UNDERSTAND -> ACT -> GROW */}
        <ValueStrip />

        {/* 3. Interactive Product Experience / Dashboard */}
        <DashboardPreview currentCurrency={currentCurrency} />

        {/* 4. Financial Insights: DATA -> INSIGHT -> ACTION */}
        <FinancialInsights currentCurrency={currentCurrency} />

        {/* 5. How It Works (01, 02, 03 Stages) */}
        <HowItWorks currentCurrency={currentCurrency} />

        {/* 6. Why Fermor & Comparison */}
        <WhyFermor />

        {/* 7. Interactive Goal Simulator */}
        <FinancialGoalSimulator currentCurrency={currentCurrency} />

        {/* 8. Final Conversion CTA */}
        <FinalCTA onOpenAuth={handleOpenAuth} />
      </main>

      {/* Footer */}
      <Footer
        currentCurrency={currentCurrency}
        onCurrencyChange={onCurrencyChange}
        onOpenLegal={handleOpenLegal}
        onOpenAuth={handleOpenAuth}
      />

      {/* Accessible Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
      />

      <LegalModal
        isOpen={legalModal.isOpen}
        documentType={legalModal.type}
        onClose={() => setLegalModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
