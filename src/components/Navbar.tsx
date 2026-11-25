import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Gamepad2,
  HelpCircle,
  Home,
  Info,
  Mail,
  Menu,
  Palette,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import { FamilyProfile, PageId } from '../types';
import { ArrowBadge, BrandLogo } from './BrandDecorations';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
  user: FamilyProfile | null;
  onOpenSignIn: () => void;
}

const DESKTOP_NAV_LINKS: Array<{ id: PageId; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'activities', label: 'Activities' },
  { id: 'about', label: 'About Us' },
  { id: 'blog', label: 'Blog' },
];

const MOBILE_MENU_ITEMS: Array<{
  id: PageId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'home', label: 'Home', sublabel: 'Main showcase', icon: Home },
  { id: 'shop', label: 'Shop', sublabel: 'Learning kits & toys', icon: ShoppingBag },
  { id: 'quiz', label: 'Fun Quiz', sublabel: 'Interactive topic quizzes', icon: HelpCircle },
  { id: 'activities', label: 'Creative Activities', sublabel: 'Guides & doodle studio', icon: Palette },
  { id: 'games', label: 'Learning Games', sublabel: 'Memory & math games', icon: Gamepad2 },
  { id: 'about', label: 'About Us', sublabel: 'Our mission & teachers', icon: Info },
  { id: 'blog', label: 'Blog', sublabel: 'Parenting & play ideas', icon: BookOpen },
  { id: 'contact', label: 'Contact Us', sublabel: 'Questions & support', icon: Mail },
];

export function Navbar({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  user,
  onOpenSignIn,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleMobileNav = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const isActivitiesGroup =
    currentPage === 'activities' || currentPage === 'quiz' || currentPage === 'games';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EFEDF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Single-line Brand */}
          <button
            type="button"
            onClick={() => handleMobileNav('home')}
            className="flex items-center whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-[#6B4CE6] cursor-pointer"
            aria-label="BrightSprout Home"
          >
            <BrandLogo />
          </button>

          {/* Zone 2: Clean Desktop Navigation Links */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4F4D60]"
          >
            {DESKTOP_NAV_LINKS.map((link) => {
              const isActive =
                link.id === 'activities'
                  ? isActivitiesGroup
                  : currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#6B4CE6] font-semibold'
                      : 'hover:text-[#181725]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[#6B4CE6] transition-transform duration-150 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#E6E3F0] text-[#181725] hover:border-[#6B4CE6] hover:text-[#6B4CE6] transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#6B4CE6] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenSignIn}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-[#181725] hover:text-[#6B4CE6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <User className="w-4 h-4" aria-hidden="true" />
              <span>{user ? user.parentName.split(' ')[0] : 'Sign In'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`hidden md:inline-flex group items-center gap-2.5 pl-4 pr-2 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-[#6B4CE6] text-white shadow-sm'
                  : 'border border-[#DDD8EE] text-[#181725] hover:border-[#6B4CE6] hover:bg-[#FAF8FF]'
              }`}
            >
              <span>Contact Us</span>
              <ArrowBadge variant={currentPage === 'contact' ? 'white' : 'purple'} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F5F2FF] text-[#181725] hover:bg-[#EAE3FE] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Hamburger Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#181725]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="h-16 px-5 border-b border-[#EFEDF6] flex items-center justify-between">
                <BrandLogo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F5F2FF] text-[#181725] hover:bg-[#EAE3FE] cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile pages" className="p-4 space-y-1.5">
                {MOBILE_MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleMobileNav(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left transition-colors min-h-[52px] cursor-pointer ${
                        active
                          ? 'bg-[#6B4CE6] text-white'
                          : 'text-[#181725] hover:bg-[#F5F2FF]'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          active ? 'bg-white/20 text-white' : 'bg-[#EFE9FE] text-[#6B4CE6]'
                        }`}
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-bold leading-tight truncate">
                          {item.label}
                        </span>
                        <span
                          className={`block text-xs mt-0.5 truncate ${
                            active ? 'text-white/80' : 'text-[#666476]'
                          }`}
                        >
                          {item.sublabel}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-5 border-t border-[#EFEDF6] bg-[#FAF9FE] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-full border border-[#DDD8EE] bg-white text-sm font-semibold text-[#181725] hover:border-[#6B4CE6] flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4 text-[#6B4CE6]" aria-hidden="true" />
                <span>{user ? `Signed in as ${user.parentName}` : 'Parent & Teacher Sign In'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-[#FFD454] text-sm font-bold text-[#181725] hover:bg-[#f6c83f] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                <span>View Cart ({cartCount})</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
