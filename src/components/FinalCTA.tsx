import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, Lock, Sparkles } from 'lucide-react';
import { useToast } from './Toast';
import { useAuth } from '../context/AuthContext';

interface FinalCTAProps {
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export function FinalCTA({ onOpenAuth }: FinalCTAProps) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { loginDemoUser, loginWithEmail } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('warning', 'Valid Email Required', 'Please enter your email to start.');
      return;
    }
    loginWithEmail(email);
    showToast(
      'success',
      '✓ Access Key Activated',
      `Welcome to Fermor, ${email.split('@')[0]}. Redirecting to your dashboard...`
    );
    navigate('/dashboard');
  };

  const handleInstantDemo = () => {
    loginDemoUser();
    showToast(
      'success',
      '✓ Demo profile activated',
      'Welcome back, Rohan. Redirecting to your financial dashboard...'
    );
    navigate('/dashboard');
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Distinctive Architectural Card */}
        <div className="relative rounded-3xl bg-[#0F1E19] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-[0_24px_60px_rgba(14,79,62,0.18)]">
          
          {/* Subtle Ambient Radial Lighting */}
          <div 
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0E4F3E]/30 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true" 
          />
          <div 
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-950/40 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true" 
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            {/* Lead Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 border border-white/10 text-xs font-semibold uppercase tracking-wider">
              <span>Financial Autonomy Begins Here</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Your money deserves{' '}
              <span className="font-serif-editorial italic font-normal text-emerald-400">
                clarity.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Start understanding where you are, what to do next, and where you can go. Join thoughtful individuals who replaced financial anxiety with a calm, compounding plan.
            </p>

            {/* Interactive Email Form & Instant Demo Shortcut */}
            <div className="pt-4 max-w-md mx-auto space-y-3">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>

              <button
                type="button"
                onClick={handleInstantDemo}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/15 border border-white/20 text-emerald-300 hover:text-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Or explore with preloaded demo profile (Rohan K.)</span>
              </button>
            </div>

            {/* Trust and Privacy Strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Read-only institution sync</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero credit card required</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">·</span>
              <span>2-minute instant onboarding</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
