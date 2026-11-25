import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ArrowBadge, SafeImage } from '../components/BrandDecorations';

interface BlogPageProps {
  selectedPost: BlogPost | null;
  onSelectPost: (post: BlogPost | null) => void;
}

const CATEGORIES: Array<'All' | BlogPost['category']> = [
  'All',
  'Play & Learning',
  'Creative Parenting',
  'STEM & Curiosity',
  'Reading Habits',
];

export function BlogPage({ selectedPost, onSelectPost }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogPost['category']>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const catMatch = selectedCategory === 'All' || post.category === selectedCategory;
      const searchMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  if (selectedPost) {
    const related = BLOG_POSTS.filter((p) => p.id !== selectedPost.id).slice(0, 3);

    return (
      <div className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onSelectPost(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6B4CE6] hover:underline mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Articles</span>
          </button>

          <article>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#666476]">
              <span className="font-semibold text-[#6B4CE6]">{selectedPost.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#181725] leading-tight [text-wrap:balance]">
              {selectedPost.title}
            </h1>

            <p className="mt-4 text-sm font-semibold text-[#4F4D60]">
              By {selectedPost.authorName} · {selectedPost.authorRole}
            </p>

            <div className="mt-7 rounded-[32px] overflow-hidden aspect-[16/9] bg-[#FAF9FE] border border-[#EFEDF6]">
              <SafeImage
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-5 text-base text-[#363447] leading-relaxed">
              {selectedPost.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-[#FAF9FE] border border-[#EFEDF6]">
              <h2 className="text-lg font-extrabold text-[#181725] mb-3">
                Key Takeaways for Parents &amp; Teachers
              </h2>
              <ul className="space-y-2.5">
                {selectedPost.keyTakeaways.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#4F4D60]">
                    <CheckCircle2
                      className="w-4 h-4 text-[#6B4CE6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Related Articles */}
          <div className="mt-14 pt-10 border-t border-[#EFEDF6]">
            <h2 className="text-2xl font-extrabold text-[#181725] mb-6">
              More to read
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => {
                    onSelectPost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left rounded-2xl border border-[#EFEDF6] overflow-hidden hover:border-[#6B4CE6] transition-colors cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-[#FAF9FE]">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-[#666476]">{post.readTime}</p>
                    <h3 className="mt-1 text-sm font-bold text-[#181725] leading-snug">
                      {post.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725]">
            Read our{' '}
            <span className="font-display-script font-semibold text-[#6B4CE6]">
              blog
            </span>
          </h1>
          <p className="mt-3 text-base text-[#666476] leading-relaxed">
            Practical ideas from our teachers on playful math, screen-balanced curiosity, early reading, and creative confidence at home.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6B4CE6] text-white'
                    : 'bg-[#FAF9FE] text-[#4F4D60] border border-[#EFEDF6] hover:border-[#6B4CE6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-[#8E8BA0] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search blog articles"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#FAF9FE] border border-[#E6E3F0] text-sm focus:border-[#6B4CE6] focus:outline-none"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-12 py-16 text-center rounded-3xl border border-dashed border-[#DDD8EE] bg-[#FAF9FE]">
            <p className="text-lg font-bold text-[#181725]">No articles match your search</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#6B4CE6] text-white text-sm font-semibold cursor-pointer"
            >
              Show All Articles
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-[28px] border border-[#EFEDF6] bg-white overflow-hidden flex flex-col justify-between hover:shadow-[0_18px_36px_-14px_rgba(24,23,37,0.12)] transition-shadow"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPost(post);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full aspect-[4/3] bg-[#FAF9FE] overflow-hidden block cursor-pointer"
                  >
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#666476]">
                      <span>{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mt-2 text-xl font-bold text-[#181725] leading-snug">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#666476] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 flex items-center justify-between">
                  <span className="text-xs text-[#666476]">{post.authorName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPost(post);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group/btn inline-flex items-center gap-2 text-sm font-bold text-[#181725] hover:text-[#6B4CE6] cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowBadge variant="purple" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
