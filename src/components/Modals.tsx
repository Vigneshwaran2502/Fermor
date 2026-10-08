import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, Lock, ArrowRight, UserCheck, Mail, Sparkles, CheckCircle2, User } from 'lucide-react';
import { useToast } from './Toast';
import { useAuth } from '../context/AuthContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
}: ModalProps & { initialMode?: 'signup' | 'login' }) {
  const [mode, setMode] = useState<'signup' | 'login'>(initialMode);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { loginDemoUser, loginWithEmail } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContinueWithDemoProfile = () => {
    loginDemoUser();
    onClose();
    showToast(
      'success',
      '✓ Demo profile activated',
      'Welcome back, Rohan. Redirecting to your financial dashboard...'
    );
    navigate('/dashboard');
  };

  const handleCustomEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('warning', 'Valid Email Required', 'Please provide a valid email address.');
      return;
    }
    loginWithEmail(email);
    onClose();
    showToast(
      'success',
      '✓ Welcome to Fermor',
      `Session initialized for ${email}. Taking you to your dashboard...`
    );
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-neutral-300 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#121820] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Lockup */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-sm tracking-tight">
            F
          </div>
          <span className="font-semibold text-sm tracking-tight text-neutral-700">Fermor Platform</span>
        </div>

        <h2 id="auth-modal-title" className="text-2xl font-bold tracking-tight text-[#121820] mb-1">
          {mode === 'signup' ? 'Start with a Fermor Account' : 'Sign in to your account'}
        </h2>
        <p className="text-sm text-neutral-600 mb-6">
          Access your private financial position, real-time runway, and prioritized action pipeline.
        </p>

        {/* PROMINENT DEMO ACCESS CARD */}
        <div className="mb-6 p-5 rounded-2xl bg-white border-2 border-[#0E4F3E]/30 shadow-[0_4px_16px_rgba(14,79,62,0.06)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E4F3E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Demo Access (Recommended)
            </span>
            <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
              Instant
            </span>
          </div>

          <h3 className="text-base font-bold text-neutral-900">
            Experience Fermor with a preloaded financial profile
          </h3>
          
          <div className="mt-3 p-3 rounded-xl bg-[#FAF8F5] border border-neutral-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-sm shrink-0">
              RK
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-neutral-900">Rohan K.</p>
                <span className="text-[11px] font-medium text-neutral-500">· Engineer</span>
              </div>
              <p className="text-xs text-neutral-500 font-mono-tabular">
                Net Worth: ₹12,48,000 · 86/100 Health Score
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleContinueWithDemoProfile}
            className="mt-4 w-full py-3 px-4 bg-[#0E4F3E] hover:bg-[#0A3A2E] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Continue with demo profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <span className="relative px-3 bg-[#FAF8F5] text-xs uppercase tracking-wider font-semibold text-neutral-400">
            Or continue with email
          </span>
        </div>

        {/* Custom Email Fallback Form */}
        <form onSubmit={handleCustomEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="auth-email-input" className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
              Work or Personal Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-xl focus:border-[#0E4F3E] focus:ring-1 focus:ring-[#0E4F3E] transition-colors text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <span>Sign In with Custom Email</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Security Guarantee */}
          <div className="flex items-center justify-center gap-2 text-[12px] text-neutral-500 pt-2">
            <Shield className="w-3.5 h-3.5 text-[#0E4F3E]" />
            <span>Read-only sync · Zero credit card required · Demo workspace</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LegalModal({
  isOpen,
  onClose,
  documentType = 'privacy',
}: ModalProps & { documentType?: 'privacy' | 'terms' | 'security' }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-neutral-300 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#121820] max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {documentType === 'security' && (
          <div>
            <div className="flex items-center gap-2 text-[#0E4F3E] mb-2">
              <Lock className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-wider uppercase">Fermor Trust & Architecture</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Security Architecture</h2>
            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              <p>
                <strong>Read-Only Access Architecture:</strong> Fermor operates under a strict read-only model. The platform has zero transactional privileges. Neither our automated engines nor employees can initiate withdrawals, transfer capital, or alter account credentials.
              </p>
              <p>
                <strong>Encrypted Communications:</strong> All communications with financial data aggregators operate through TLS 1.3 encrypted transport with strict read-only token boundaries.
              </p>
              <p>
                <strong>Zero Data Monetization:</strong> Unlike traditional budgeting software that sells user financial profiles to credit card issuers and lending syndicates, Fermor is completely member-aligned. We never sell or share transaction records.
              </p>
            </div>
          </div>
        )}

        {documentType === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 text-[#0E4F3E] mb-2">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-wider uppercase">Fermor Governance</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              <p>
                <strong>Our Privacy Philosophy:</strong> We believe financial data is profoundly intimate. Fermor only processes telemetry strictly required to categorize your accounts and synthesize actionable recommendations.
              </p>
              <p>
                <strong>Account Deletion:</strong> You retain complete data sovereignty. If you choose to terminate your Fermor membership, all linked account tokens and cached aggregations are wiped immediately.
              </p>
              <p>
                <strong>No Third-Party Ad Trackers:</strong> We deploy no behavioral marketing trackers, external ad pixels, or commercial broker cookies on the Fermor web interface.
              </p>
            </div>
          </div>
        )}

        {documentType === 'terms' && (
          <div>
            <div className="flex items-center gap-2 text-[#0E4F3E] mb-2">
              <UserCheck className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-wider uppercase">Member Agreement</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">Terms of Service</h2>
            <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
              <p>
                <strong>Decision Support Platform:</strong> Fermor provides algorithmic financial modeling and personal finance organizational tools for informational and analytical clarity. We do not act as a licensed registered investment advisor (RIA) executing broker orders.
              </p>
              <p>
                <strong>Demonstration & Simulation Data:</strong> All financial values, simulations, and growth trajectories rendered in our interactive calculators are illustrative demonstrations designed to empower your financial thinking.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-neutral-300 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#0E4F3E] text-white rounded-xl text-sm font-medium hover:bg-[#0A3A2E] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
