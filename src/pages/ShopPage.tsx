import React, { useMemo, useState } from 'react';
import { Check, Search, ShoppingBag, Star, X } from 'lucide-react';
import { SHOP_PRODUCTS } from '../data/mockData';
import { ShopProduct } from '../types';
import { SafeImage } from '../components/BrandDecorations';

interface ShopPageProps {
  onAddToCart: (product: ShopProduct) => void;
}

const CATEGORIES: Array<'All' | ShopProduct['category']> = [
  'All',
  'STEM Kits',
  'Art & Craft',
  'Workbooks',
  'Wooden Toys',
];

const AGE_FILTERS: Array<'All Ages' | ShopProduct['ageRange']> = [
  'All Ages',
  '3-5 yrs',
  '6-8 yrs',
  '9-12 yrs',
];

export function ShopPage({ onAddToCart }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ShopProduct['category']>('All');
  const [selectedAge, setSelectedAge] = useState<'All Ages' | ShopProduct['ageRange']>('All Ages');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SHOP_PRODUCTS.filter((p) => {
      const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const ageMatch = selectedAge === 'All Ages' || p.ageRange === selectedAge;
      const searchMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q));
      return catMatch && ageMatch && searchMatch;
    });
  }, [selectedCategory, selectedAge, searchQuery]);

  const handleQuickAdd = (product: ShopProduct) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  return (
    <div className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725] [text-wrap:balance]">
            Learning kits &amp;{' '}
            <span className="font-display-script font-semibold text-[#6B4CE6]">
              playful
            </span>{' '}
            materials
          </h1>
          <p className="mt-3 text-base text-[#666476] leading-relaxed">
            Screen-free wooden sets, art boxes, and activity workbooks crafted alongside our elementary educators. Free shipping on orders over $50.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-8 p-4 sm:p-5 rounded-3xl bg-[#FAF9FE] border border-[#EFEDF6] space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#6B4CE6] text-white'
                      : 'bg-white text-[#4F4D60] border border-[#E6E3F0] hover:border-[#6B4CE6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search
                className="w-4 h-4 text-[#8E8BA0] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kits, skills..."
                aria-label="Search learning kits"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E6E3F0] text-sm text-[#181725] focus:border-[#6B4CE6] focus:outline-none"
              />
            </div>
          </div>

          {/* Age Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EAE6F4]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#666476] mr-1">Age group:</span>
              {AGE_FILTERS.map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setSelectedAge(age)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    selectedAge === age
                      ? 'bg-[#FFD454] text-[#181725]'
                      : 'bg-white text-[#666476] border border-[#E6E3F0] hover:text-[#181725]'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#666476] tabular-nums">
              Showing {filteredProducts.length} of {SHOP_PRODUCTS.length} kits
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 py-16 text-center rounded-3xl border border-dashed border-[#DDD8EE] bg-[#FAF9FE]">
            <p className="text-lg font-bold text-[#181725]">No matching kits found</p>
            <p className="text-sm text-[#666476] mt-1">
              Try clearing your search or choosing another age group.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedAge('All Ages');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;
              return (
                <article
                  key={product.id}
                  className="rounded-3xl border border-[#EFEDF6] bg-white overflow-hidden flex flex-col justify-between hover:shadow-[0_18px_36px_-14px_rgba(24,23,37,0.12)] transition-shadow"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setActiveProduct(product)}
                      className="w-full aspect-[4/3] bg-[#FAF9FE] overflow-hidden block cursor-pointer"
                    >
                      <SafeImage
                        src={product.image}
                        alt={product.title}
                        fallbackLabel={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </button>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-[#666476]">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.ageRange}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveProduct(product)}
                        className="text-left mt-1.5 cursor-pointer"
                      >
                        <h2 className="text-base font-bold text-[#181725] leading-snug hover:text-[#6B4CE6] transition-colors">
                          {product.title}
                        </h2>
                      </button>
                      <p className="mt-2 text-xs text-[#666476] leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#181725] tabular-nums">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#8E8BA0] line-through tabular-nums">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#666476] tabular-nums">
                        <Star className="w-3 h-3 fill-[#FFD454] text-[#FFD454]" aria-hidden="true" />
                        <span>{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(product)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#6B4CE6] text-white hover:bg-[#5738D1]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#181725]/45 backdrop-blur-xs"
            onClick={() => setActiveProduct(null)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeProduct.title}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#EFEDF6] max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setActiveProduct(null)}
              aria-label="Close product details"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-[#F5F2FF] flex items-center justify-center text-[#181725] shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#FAF9FE]">
                <SafeImage
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#666476]">
                  <span>{activeProduct.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProduct.ageRange}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#181725] leading-snug">
                  {activeProduct.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-[#6B4CE6] tabular-nums">
                    ${activeProduct.price}
                  </span>
                  {activeProduct.originalPrice && (
                    <span className="text-sm text-[#8E8BA0] line-through tabular-nums">
                      ${activeProduct.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#4F4D60] leading-relaxed">
                  {activeProduct.fullDescription}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-[#181725] mb-1.5">
                    Skills Developed
                  </h4>
                  <p className="text-xs text-[#666476]">
                    {activeProduct.skills.join(' · ')}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#181725] mb-1.5">
                    What’s Inside the Box
                  </h4>
                  <ul className="space-y-1 text-xs text-[#4F4D60] list-disc list-inside">
                    {activeProduct.whatsIncluded.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleQuickAdd(activeProduct);
                    setActiveProduct(null);
                  }}
                  className="w-full py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] transition-colors cursor-pointer"
                >
                  Add to Learning Bag — ${activeProduct.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
