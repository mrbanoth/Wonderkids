import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2, HelpCircle, Lightbulb, X } from 'lucide-react';
import { ASSETS, BLOG_POSTS, EDUCATORS } from '../data/mockData';
import { BlogPost, Educator, PageId } from '../types';
import {
  ArrowBadge,
  CircularSeal,
  ConcentricRings,
  DotGrid,
  LoopingArrow,
  OvalHighlight,
  SafeImage,
  ScallopedSun,
  WavyScribble,
  WavyUnderline,
} from '../components/BrandDecorations';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectBlogPost: (post: BlogPost) => void;
}

export function HomePage({ onNavigate, onSelectBlogPost }: HomePageProps) {
  const [teacherStartIdx, setTeacherStartIdx] = useState(0);
  const [selectedEducator, setSelectedEducator] = useState<Educator | null>(null);

  const visibleEducators = Array.from({ length: 4 }, (_, offset) => {
    const idx = (teacherStartIdx + offset) % EDUCATORS.length;
    return EDUCATORS[idx];
  });

  const handlePrevTeachers = () => {
    setTeacherStartIdx((prev) => (prev - 1 + EDUCATORS.length) % EDUCATORS.length);
  };

  const handleNextTeachers = () => {
    setTeacherStartIdx((prev) => (prev + 1) % EDUCATORS.length);
  };

  const scrollToFeatures = () => {
    const el = document.getElementById('interactive-features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredPosts = BLOG_POSTS.slice(0, 3);

  const renderTeacherBackdrop = (variant: Educator['backdropVariant']) => {
    switch (variant) {
      case 'yellow-circle':
        return 'rounded-full bg-[#FFD454]';
      case 'lavender-squircle':
        return 'rounded-[38px] bg-[#DFD3FE]';
      case 'purple-circle':
        return 'rounded-full bg-[#8D74F0]';
      case 'mint-blob':
        return 'rounded-tl-[72px] rounded-tr-[40px] rounded-bl-[44px] rounded-br-[68px] bg-[#7BC4D4]';
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Desktop Left Floating Kid Portrait + Curved Arrow */}
          <div className="hidden md:block absolute left-4 lg:left-10 top-6 pointer-events-none">
            <div className="relative">
              <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-[#DFD3FE] p-1.5 shadow-sm">
                <SafeImage
                  src={ASSETS.heroKidTablet}
                  alt="Smiling young boy with learning tablet"
                  fallbackLabel="Young Learner"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <LoopingArrow className="w-20 h-16 -mt-1 ml-10" />
            </div>
          </div>

          {/* Desktop Left Concentric Rings Motif */}
          <div className="hidden lg:block absolute left-28 bottom-4 pointer-events-none opacity-85">
            <ConcentricRings color="#DFD3FE" className="w-20 h-20" />
          </div>

          {/* Desktop Right Circular Seal & Kid Portrait */}
          <div className="hidden md:block absolute right-4 lg:right-10 top-0 pointer-events-none">
            <CircularSeal className="w-24 h-24 lg:w-28 lg:h-28" />
          </div>

          <div className="hidden md:block absolute right-6 lg:right-14 bottom-2 pointer-events-none">
            <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-tl-[56px] rounded-tr-[32px] rounded-bl-[36px] rounded-br-[56px] bg-[#EFE9FE] p-2">
              <SafeImage
                src={ASSETS.kidsCreativeCraft}
                alt="Happy child smiling with teddy bear"
                fallbackLabel="Happy Child"
                className="w-full h-full rounded-[28px] object-cover object-top"
              />
            </div>
          </div>

          {/* Centered Hero Statement */}
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-[#181725] leading-[1.12] [text-wrap:balance]">
              The best place to{' '}
              <span className="relative inline-block font-display-script font-semibold text-[#6B4CE6] px-1">
                learn
                <WavyUnderline
                  color="#C4B5FD"
                  className="absolute -bottom-1.5 left-0 w-full h-3.5"
                />
              </span>{' '}
              and{' '}
              <span className="relative inline-block font-display-script font-semibold text-[#E8AE12] px-1">
                play
                <WavyUnderline
                  color="#FFD454"
                  className="absolute -bottom-1.5 left-0 w-full h-3.5"
                />
              </span>{' '}
              for kids
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#666476] max-w-xl mx-auto leading-relaxed">
              Discover thousands of fun and interactive learning activities to support your child’s growth and learning process.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToFeatures}
                className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm sm:text-base font-bold shadow-[0_14px_30px_-8px_rgba(107,76,230,0.55)] hover:bg-[#5738D1] transition-all duration-150 min-h-[48px] cursor-pointer"
              >
                <span>Get started</span>
                <ArrowBadge variant="white" />
              </button>
            </div>

            {/* Mobile Portrait Strip (only on small screens so mobile feels equally vibrant) */}
            <div className="mt-8 flex md:hidden items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-[#DFD3FE] p-1">
                <SafeImage
                  src={ASSETS.heroKidTablet}
                  alt="Smiling boy holding tablet"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <CircularSeal className="w-20 h-20" />
              <div className="w-20 h-20 rounded-3xl bg-[#FFF4D1] p-1">
                <SafeImage
                  src={ASSETS.kidsCreativeCraft}
                  alt="Happy girl holding teddy bear"
                  className="w-full h-full rounded-2xl object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR INTERACTIVE FEATURES */}
      <section
        id="interactive-features"
        className="py-12 sm:py-16 lg:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#181725] leading-tight [text-wrap:balance] max-w-md">
              Our{' '}
              <span className="font-display-script font-semibold text-[#6B4CE6]">
                interactive
              </span>{' '}
              features
            </h2>

            {/* Playful tilted quick-jump shapes matching Paperpillar composition */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('quiz')}
                className="px-4 py-2 rounded-full bg-[#DFD3FE] text-[#181725] text-xs font-bold -rotate-3 hover:rotate-0 transition-transform cursor-pointer"
              >
                Try Quizzes
              </button>
              <button
                type="button"
                onClick={() => onNavigate('activities')}
                className="px-4 py-2 rounded-full bg-[#FFD454] text-[#181725] text-xs font-bold rotate-3 hover:rotate-0 transition-transform cursor-pointer"
              >
                Craft &amp; Draw
              </button>
              <button
                type="button"
                onClick={() => onNavigate('games')}
                className="px-4 py-2 rounded-full bg-[#6B4CE6] text-white text-xs font-bold -rotate-2 hover:rotate-0 transition-transform cursor-pointer"
              >
                Play Games
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Fun Quiz */}
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="group relative text-left rounded-[32px] bg-[#DFD3FE] p-7 sm:p-8 min-h-[290px] flex flex-col justify-between overflow-hidden transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <ConcentricRings
                color="#6B4CE6"
                className="absolute -top-6 -right-6 w-36 h-36 opacity-80 pointer-events-none"
              />
              <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                <ScallopedSun color="#FFFFFF" className="w-16 h-16" />
                <HelpCircle
                  className="w-6 h-6 text-[#181725] absolute"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 mt-10">
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#181725] leading-snug">
                  Fun <br />
                  <span className="font-display-script font-semibold">Quiz</span>
                </h3>
                <p className="mt-2.5 text-sm text-[#3E3A54] leading-relaxed">
                  Test your understanding with short, illustrated, and playful quizzes!
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#6B4CE6] group-hover:underline">
                  Start a Quiz <span aria-hidden="true">→</span>
                </span>
              </div>
            </button>

            {/* Card 2: Creative Activities */}
            <button
              type="button"
              onClick={() => onNavigate('activities')}
              className="group relative text-left rounded-[32px] bg-[#6B4CE6] p-7 sm:p-8 min-h-[290px] flex flex-col justify-between overflow-hidden transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <WavyScribble
                color="#DFD3FE"
                className="absolute top-3 -right-4 w-44 h-24 opacity-95 pointer-events-none"
              />
              <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                <ScallopedSun color="#8D74F0" className="w-16 h-16" />
                <Lightbulb
                  className="w-6 h-6 text-white absolute"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 mt-10 text-white">
                <h3 className="text-2xl sm:text-[26px] font-extrabold leading-snug">
                  Creative <br />
                  <span className="font-display-script font-semibold">Activities</span>
                </h3>
                <p className="mt-2.5 text-sm text-white/85 leading-relaxed">
                  Discover enjoyable activities such as coloring, crafting, and science!
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#FFD454] group-hover:underline">
                  Explore Studio <span aria-hidden="true">→</span>
                </span>
              </div>
            </button>

            {/* Card 3: Learn with Games */}
            <button
              type="button"
              onClick={() => onNavigate('games')}
              className="group relative text-left rounded-[32px] bg-[#FFD454] p-7 sm:p-8 min-h-[290px] flex flex-col justify-between overflow-hidden transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
            >
              <DotGrid
                color="#FFF5D6"
                className="absolute top-4 right-4 w-24 h-24 pointer-events-none"
              />
              <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                <ScallopedSun color="#FFF6DA" className="w-16 h-16" />
                <Gamepad2
                  className="w-6 h-6 text-[#181725] absolute"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 mt-10">
                <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#181725] leading-snug">
                  Learn with <br />
                  <span className="font-display-script font-semibold">Games</span>
                </h3>
                <p className="mt-2.5 text-sm text-[#4A4123] leading-relaxed">
                  Learn something new while your kids enjoy playful mini-games!
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#181725] group-hover:underline">
                  Play Mini-Games <span aria-hidden="true">→</span>
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: ENJOYABLE LEARNING MATERIALS */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#181725] leading-[1.18] [text-wrap:balance]">
                The learning materials provided are{' '}
                <span className="relative inline-block font-display-script font-semibold text-[#6B4CE6] px-2">
                  enjoyable
                  <OvalHighlight
                    color="#FFD454"
                    className="absolute -inset-x-2 -inset-y-1.5 w-[calc(100%+16px)] h-[calc(100%+12px)] pointer-events-none"
                  />
                </span>{' '}
                for children
              </h2>

              <p className="text-base text-[#666476] leading-relaxed max-w-md">
                Don’t worry! Your children will have a wonderful time learning with tactile kits, illustrated guides, and activities that are easy to understand.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-[#DDD8EE] bg-white text-sm font-bold text-[#181725] hover:border-[#6B4CE6] hover:bg-[#FAF8FF] transition-colors min-h-[46px] cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowBadge variant="purple" />
                </button>
              </div>
            </div>

            {/* Layered Horizontal Capsule Collage matching screenshot */}
            <div className="lg:col-span-7 space-y-5">
              {/* Row 1 */}
              <div className="flex justify-end">
                <div className="relative w-full sm:w-[86%] h-32 sm:h-36 rounded-full bg-[#DFD3FE] px-6 flex items-center justify-between overflow-visible">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 -mt-6 rounded-3xl overflow-hidden shadow-md border-4 border-white shrink-0">
                    <SafeImage
                      src={ASSETS.kidsCreativeCraft}
                      alt="Smiling girl hugging plush bear"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 px-4 hidden sm:block">
                    <p className="text-sm font-bold text-[#181725]">
                      Gentle, Screen-Balanced Kits
                    </p>
                    <p className="text-xs text-[#4F4A68] mt-1">
                      Tactile beechwood blocks &amp; story cards
                    </p>
                  </div>
                  <ScallopedSun
                    color="#FFD454"
                    className="w-20 h-20 sm:w-24 sm:h-24 shrink-0"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex justify-start">
                <div className="relative w-full sm:w-[88%] h-32 sm:h-36 rounded-full bg-[#6B4CE6] px-6 flex items-center justify-between overflow-hidden">
                  <WavyScribble
                    color="#DFD3FE"
                    className="w-36 sm:w-44 h-20 shrink-0"
                  />
                  <div className="w-28 h-28 sm:w-36 sm:h-32 rounded-3xl overflow-hidden border-4 border-white/90 shadow-md shrink-0">
                    <SafeImage
                      src={ASSETS.materialsKidsLearning}
                      alt="Girl assembling wooden shapes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex justify-end">
                <div className="relative w-full sm:w-[90%] h-32 sm:h-36 rounded-full bg-[#FFD454] px-6 flex items-center justify-between overflow-hidden">
                  <div className="w-28 h-28 sm:w-36 sm:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-md shrink-0">
                    <SafeImage
                      src={ASSETS.shopMontessoriKit}
                      alt="Montessori pastel geometry studio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 px-4 hidden sm:block">
                    <p className="text-sm font-bold text-[#181725]">
                      Educator-Tested Guides
                    </p>
                    <p className="text-xs text-[#4A4123] mt-1">
                      Step-by-step curiosity prompts
                    </p>
                  </div>
                  <DotGrid color="#FFF7DB" className="w-20 h-20 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FULL-WIDTH PURPLE MISSION & EDUCATORS CAROUSEL */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#6B4CE6] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold leading-[1.25] tracking-tight [text-wrap:balance]">
              We aim to help children{' '}
              <span className="font-display-script font-semibold text-[#FFD454]">
                discover the joy of creative
              </span>{' '}
              learning and grow into well-rounded individuals.
            </h2>
          </div>

          <div className="hidden lg:block absolute left-8 top-14 pointer-events-none">
            <ScallopedSun color="#FFD454" className="w-16 h-16" />
          </div>

          {/* Carousel Header & Controls */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevTeachers}
              aria-label="Previous teachers"
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 flex-1">
              {visibleEducators.map((teacher) => (
                <button
                  key={teacher.id}
                  type="button"
                  onClick={() => setSelectedEducator(teacher)}
                  className="group text-center flex flex-col items-center cursor-pointer rounded-3xl p-3 hover:bg-white/10 transition-colors"
                >
                  <div
                    className={`w-40 h-40 sm:w-44 sm:h-44 p-2.5 overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-[1.03] ${renderTeacherBackdrop(
                      teacher.backdropVariant
                    )}`}
                  >
                    <SafeImage
                      src={teacher.image}
                      alt={`${teacher.name}, ${teacher.role}`}
                      fallbackLabel={teacher.name}
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-white/80 mt-0.5">{teacher.role}</p>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextTeachers}
              aria-label="Next teachers"
              className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#6B4CE6] text-sm font-bold hover:bg-[#FAF8FF] transition-colors cursor-pointer"
            >
              <span>Meet All Educators &amp; Our Story</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: READ OUR BLOG */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#181725]">
              Read our{' '}
              <span className="font-display-script font-semibold text-[#6B4CE6]">
                blog
              </span>
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="text-sm font-bold text-[#6B4CE6] hover:underline self-start sm:self-auto cursor-pointer"
            >
              View all articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-[28px] border border-[#EFEDF6] bg-white overflow-hidden hover:shadow-[0_18px_40px_-15px_rgba(24,23,37,0.12)] transition-shadow duration-200 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F5F2FF]">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fallbackLabel={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#666476] mb-2">
                      <span>{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#181725] leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#666476] leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => onSelectBlogPost(post)}
                      className="group/btn inline-flex items-center gap-2.5 text-sm font-bold text-[#181725] hover:text-[#6B4CE6] cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowBadge variant="purple" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Educator Quick Bio Modal */}
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
              aria-label="Close educator profile"
              className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-[#F5F2FF] flex items-center justify-center text-[#181725] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#EFE9FE] shrink-0">
                <SafeImage
                  src={selectedEducator.image}
                  alt={selectedEducator.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-[#6B4CE6]">
                  {selectedEducator.role} · {selectedEducator.experienceYears} yrs experience
                </p>
                <h3 className="text-2xl font-extrabold text-[#181725] mt-1">
                  {selectedEducator.name}
                </h3>
                <p className="text-xs text-[#666476] mt-1">
                  {selectedEducator.education}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-[#4F4D60] leading-relaxed">
              {selectedEducator.bio}
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-[#FAF9FE] border border-[#EFEDF6] space-y-1.5">
              <p className="text-xs font-bold text-[#181725]">
                Specialty: {selectedEducator.specialty}
              </p>
              <p className="text-xs text-[#666476]">
                Favorite classroom project: {selectedEducator.favoriteActivity}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedEducator(null);
                  onNavigate('about');
                }}
                className="px-5 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] cursor-pointer"
              >
                View All Teachers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
