import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PageId } from '../types';
import { BrandLogo } from './BrandDecorations';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-[#FAF9FE] border-t border-[#EFEDF6] text-[#181725]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="cursor-pointer rounded-lg"
            >
              <BrandLogo />
            </button>
            <p className="text-sm text-[#666476] leading-relaxed max-w-sm">
              Thoughtfully crafted quizzes, hands-on creative guides, wooden learning kits, and joyful games designed for curious kids ages 3–12.
            </p>
            <p className="text-xs text-[#666476]">
              Portland Learning Studio · Mon–Sat 9:00 AM – 5:30 PM
            </p>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-[#181725]">Explore</h3>
            <ul className="space-y-2.5 text-sm text-[#666476]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Shop Kits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Read Our Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Play Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-[#181725]">Learn &amp; Play</h3>
            <ul className="space-y-2.5 text-sm text-[#666476]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Fun Quiz
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('activities')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Creative Activities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('games')}
                  className="hover:text-[#6B4CE6] transition-colors cursor-pointer"
                >
                  Learning Games
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-[#181725]">Weekly Activity Notes</h3>
            <p className="text-sm text-[#666476] leading-relaxed">
              Receive one printable craft guide and weekend curiosity prompt every Friday.
            </p>
            <form onSubmit={handleSubscribe} noValidate className="flex flex-col sm:flex-row gap-2.5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="parent@example.com"
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-full bg-white border border-[#DEDAE9] text-sm text-[#181725] placeholder:text-[#8E8BA0] focus:border-[#6B4CE6] focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-semibold hover:bg-[#5738D1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            {status === 'error' && (
              <p className="text-xs font-medium text-red-600" role="alert">
                Please enter a valid email address.
              </p>
            )}
            {status === 'success' && (
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Subscribed! Your first Friday activity pack is on its way.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#EAE6F4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666476]">
          <p>&copy; 2026 BrightSprout Learning Co. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-[#181725] cursor-pointer"
            >
              Safety Standards
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-[#181725] cursor-pointer"
            >
              Parent Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
