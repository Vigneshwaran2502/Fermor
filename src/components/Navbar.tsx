import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, ChevronDown, User, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { CurrencyCode } from '../types/finance';
import { CURRENCIES } from '../lib/data';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenAuth: (mode: 'signup' | 'login') => void;
}

export function Navbar({ currentCurrency, onCurrencyChange, onOpenAuth }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('product');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const sections = ['product', 'how-it-works', 'why-fermor', 'insights', 'goals'];
      const scrollPos = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setCurrencyDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[role="menu"]') && !target.closest('button')) {
        setCurrencyDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'product', label: 'Product', href: '#product' },
    { id: 'how-it-works', label: 'How it works', href: '#how-it-works' },
    { id: 'why-fermor', label: 'Why Fermor', href: '#why-fermor' },
    { id: 'insights', label: 'Insights', href: '#insights' },
    { id: 'goals', label: 'Goal Simulator', href: '#goals' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 76;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    showToast('info', 'Logged Out', 'You have been safely signed out of your session.');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E4F3E] rounded-lg"
              aria-label="Fermor Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-base tracking-tight shadow-sm transition-transform group-hover:scale-105">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-[#121820] font-sans">
                Fermor
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav 
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-neutral-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-[#0E4F3E] bg-[#0E4F3E]/8 font-semibold'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/60'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Currency Selector Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors shadow-2xs"
                aria-label="Switch display currency"
                aria-expanded={currencyDropdownOpen}
              >
                <span>{CURRENCIES[currentCurrency].symbol}</span>
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-28 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-50 text-xs font-medium"
                  role="menu"
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onCurrencyChange(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                        currentCurrency === c ? 'text-[#0E4F3E] font-semibold bg-[#0E4F3E]/5' : 'text-neutral-700'
                      }`}
                      role="menuitem"
                    >
                      <span>{c}</span>
                      <span className="text-neutral-400 font-normal">{CURRENCIES[c].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authenticated vs Unauthenticated State */}
            {isAuthenticated && user ? (
              <div className="relative flex items-center gap-2">
                {/* Direct Dashboard Link */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-3 py-1.5 text-xs font-semibold text-[#0E4F3E] bg-[#0E4F3E]/10 hover:bg-[#0E4F3E]/15 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </button>

                {/* Profile Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setCurrencyDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-all text-xs font-semibold text-neutral-800 shadow-2xs"
                    aria-label="User profile menu"
                    aria-expanded={profileDropdownOpen}
                  >
                    <span>{user.name}</span>
                    <div className="w-6 h-6 rounded-full bg-[#0E4F3E] text-white flex items-center justify-center text-[11px] font-bold">
                      {user.avatar || 'RK'}
                    </div>
                    <ChevronDown className="w-3 h-3 text-neutral-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-1.5 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl py-1.5 z-50 text-xs"
                      role="menu"
                    >
                      <div className="px-3 py-2 border-b border-neutral-100">
                        <p className="font-bold text-neutral-900">{user.name}</p>
                        <p className="text-[11px] text-neutral-500">{user.role}</p>
                      </div>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/dashboard');
                        }}
                        className="w-full text-left px-3 py-2 flex items-center gap-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                        role="menuitem"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#0E4F3E]" />
                        <span>Open Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          showToast('info', 'Settings', 'Account preferences and synchronization configured.');
                        }}
                        className="w-full text-left px-3 py-2 flex items-center gap-2 text-neutral-700 hover:bg-neutral-50 transition-colors"
                        role="menuitem"
                      >
                        <Settings className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Settings</span>
                      </button>

                      <div className="border-t border-neutral-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-700 hover:bg-red-50 transition-colors font-medium"
                          role="menuitem"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Log in */}
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors rounded-lg hover:bg-neutral-100/60"
                >
                  Log in
                </button>

                {/* Get started */}
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0E4F3E] hover:bg-[#0A3A2E] rounded-xl transition-all shadow-sm flex items-center gap-1.5 group active:scale-[0.98]"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Actions Zone */}
          <div className="flex sm:hidden items-center gap-2">
            {isAuthenticated && user && (
              <button
                onClick={() => navigate('/dashboard')}
                className="w-7 h-7 rounded-full bg-[#0E4F3E] text-white flex items-center justify-center text-xs font-bold shadow-2xs"
                aria-label="Open Dashboard"
              >
                {user.avatar || 'RK'}
              </button>
            )}

            <button
              onClick={() => {
                const codes: CurrencyCode[] = ['INR', 'USD', 'EUR'];
                const next = codes[(codes.indexOf(currentCurrency) + 1) % codes.length];
                onCurrencyChange(next);
              }}
              className="px-2 py-1 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-lg shadow-2xs"
              aria-label="Toggle currency"
            >
              {CURRENCIES[currentCurrency].symbol} {currentCurrency}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-200/50 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 top-[60px] z-50 bg-[#FAF8F5] border-t border-neutral-200 flex flex-col justify-between p-6 sm:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-4">
            {isAuthenticated && user ? (
              <div className="p-4 bg-white rounded-2xl border border-neutral-200 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0E4F3E] text-white flex items-center justify-center font-bold text-sm">
                    {user.avatar || 'RK'}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{user.name}</p>
                    <p className="text-xs text-neutral-500">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  className="mt-3 w-full py-2.5 bg-[#0E4F3E] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Go to Dashboard</span>
                </button>
              </div>
            ) : null}

            <p className="text-xs font-semibold tracking-wider uppercase text-neutral-400">Navigation</p>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-base font-medium rounded-xl text-neutral-800 hover:bg-neutral-200/60 hover:text-neutral-950 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-neutral-200 space-y-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            ) : (
              <>
                <div className="flex items-center justify-between px-2 text-xs text-neutral-500 mb-2">
                  <span>Security Guarantee</span>
                  <span className="flex items-center gap-1 font-medium text-[#0E4F3E]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Read-only Sync
                  </span>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full py-3 text-sm font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors"
                >
                  Log in
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="w-full py-3.5 text-sm font-semibold text-white bg-[#0E4F3E] rounded-xl flex items-center justify-center gap-2 hover:bg-[#0A3A2E] transition-colors shadow-sm"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
