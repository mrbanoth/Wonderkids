import React, { useState } from 'react';
import { BookOpen, Heart, ShieldCheck, X } from 'lucide-react';
import { ASSETS, EDUCATORS, TESTIMONIALS } from '../data/mockData';
import { Educator, PageId } from '../types';
import { SafeImage, ScallopedSun } from '../components/BrandDecorations';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [selectedEducator, setSelectedEducator] = useState<Educator | null>(null);

  return (
    <div className="bg-white">
      {/* Intro Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF9FE] border-b border-[#EFEDF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725] leading-tight [text-wrap:balance]">
                Helping curious kids{' '}
                <span className="font-display-script font-semibold text-[#6B4CE6]">
                  bloom
                </span>{' '}
                through joyful play
              </h1>
              <p className="text-base text-[#4F4D60] leading-relaxed">
                BrightSprout started in Portland when four elementary teachers and illustrators teamed up to create calm, imaginative learning experiences free from noisy ads and repetitive drills.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('activities')}
                  className="px-6 py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] cursor-pointer"
                >
                  Try Free Activities
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-full bg-white border border-[#DDD8EE] text-sm font-bold text-[#181725] hover:border-[#6B4CE6] cursor-pointer"
                >
                  Partner With Us
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-lg aspect-[4/3]">
                <SafeImage
                  src={ASSETS.materialsKidsLearning}
                  alt="Child joyfully building with wooden learning shapes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Grounded Quantitative Proof Row */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#EFEDF6]">
              <p className="text-3xl font-extrabold text-[#6B4CE6] tabular-nums">18,400+</p>
              <p className="text-xs text-[#666476] mt-1">
                Active families using weekly activities in 2026
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-[#EFEDF6]">
              <p className="text-3xl font-extrabold text-[#181725] tabular-nums">240+</p>
              <p className="text-xs text-[#666476] mt-1">
                Teacher-reviewed quizzes, craft guides &amp; games
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-[#EFEDF6]">
              <p className="text-3xl font-extrabold text-[#181725] tabular-nums">100%</p>
              <p className="text-xs text-[#666476] mt-1">
                Ad-free, non-toxic wooden materials &amp; child-safe design
              </p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-[#EFEDF6]">
              <p className="text-3xl font-extrabold text-[#6B4CE6] tabular-nums">4.9 / 5</p>
              <p className="text-xs text-[#666476] mt-1">
                Average parent &amp; classroom rating across 620+ reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181725] mb-8">
            Our three learning pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-[28px] bg-[#EFE9FE]">
              <BookOpen className="w-7 h-7 text-[#6B4CE6] mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[#181725]">Curiosity Before Memorization</h3>
              <p className="mt-2 text-sm text-[#4F4D60] leading-relaxed">
                Every quiz explanation and kit prompt invites children to ask "why" and test predictions playfully.
              </p>
            </div>
            <div className="p-7 rounded-[28px] bg-[#FFF4D1]">
              <Heart className="w-7 h-7 text-[#181725] mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[#181725]">Balanced Screen &amp; Tactile Play</h3>
              <p className="mt-2 text-sm text-[#4A4123] leading-relaxed">
                Digital mini-games reinforce concepts briefly, while wooden sets and craft guides bring learning onto the kitchen table.
              </p>
            </div>
            <div className="p-7 rounded-[28px] bg-[#FAF9FE] border border-[#EFEDF6]">
              <ShieldCheck className="w-7 h-7 text-[#6B4CE6] mb-4" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[#181725]">Calm, Safe &amp; Ad-Free</h3>
              <p className="mt-2 text-sm text-[#666476] leading-relaxed">
                Zero external ads, zero dark patterns, and FSC-certified hardwood coated in water-based finishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Educators Directory */}
      <section className="py-14 sm:py-20 bg-[#6B4CE6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Meet our{' '}
                <span className="font-display-script font-semibold text-[#FFD454]">
                  educators
                </span>
              </h2>
              <p className="mt-2 text-sm text-white/85 max-w-xl">
                Click any teacher to read their curriculum background and favorite hands-on classroom project.
              </p>
            </div>
            <ScallopedSun color="#FFD454" className="w-14 h-14 hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDUCATORS.map((teacher) => (
              <button
                key={teacher.id}
                type="button"
                onClick={() => setSelectedEducator(teacher)}
                className="text-left p-6 rounded-3xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-start gap-4 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FFD454] shrink-0">
                  <SafeImage
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white">{teacher.name}</h3>
                  <p className="text-xs font-semibold text-[#FFD454]">{teacher.role}</p>
                  <p className="mt-2 text-xs text-white/85 line-clamp-2 leading-relaxed">
                    {teacher.bio}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181725] mb-8">
            What families &amp; teachers notice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="p-6 rounded-3xl border border-[#EFEDF6] bg-[#FAF9FE] flex flex-col justify-between gap-4"
              >
                <p className="text-sm text-[#4F4D60] leading-relaxed">
                  “{item.quote}”
                </p>
                <div className="pt-3 border-t border-[#EAE6F4]">
                  <p className="text-sm font-bold text-[#181725]">{item.parentName}</p>
                  <p className="text-xs text-[#666476]">
                    {item.role} · {item.location}
                  </p>
                  <p className="text-xs font-semibold text-[#6B4CE6] mt-1.5">
                    {item.outcome}
                  </p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Educator Modal */}
      {selectedEducator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#181725]/45 backdrop-blur-xs"
            onClick={() => setSelectedEducator(null)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedEducator.name}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFEDF6]"
          >
            <button
              type="button"
              onClick={() => setSelectedEducator(null)}
              aria-label="Close educator bio"
              className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-[#F5F2FF] flex items-center justify-center text-[#181725] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#EFE9FE] shrink-0">
                <SafeImage
                  src={selectedEducator.image}
                  alt={selectedEducator.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6B4CE6]">
                  {selectedEducator.role} · {selectedEducator.experienceYears} yrs experience
                </p>
                <h3 className="text-xl font-extrabold text-[#181725]">
                  {selectedEducator.name}
                </h3>
                <p className="text-xs text-[#666476] mt-0.5">{selectedEducator.education}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[#4F4D60] leading-relaxed">
              {selectedEducator.bio}
            </p>
            <p className="mt-4 text-xs font-semibold text-[#181725] bg-[#FAF9FE] p-3.5 rounded-2xl border border-[#EFEDF6]">
              Favorite Project: {selectedEducator.favoriteActivity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
