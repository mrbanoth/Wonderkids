import React, { useEffect, useRef, useState } from 'react';
import {
  CheckSquare,
  Clock,
  Download,
  Eraser,
  Gamepad2,
  HelpCircle,
  Palette,
  Square,
  Trash2,
  X,
} from 'lucide-react';
import { CREATIVE_ACTIVITIES } from '../data/mockData';
import { CreativeActivity, PageId } from '../types';
import { SafeImage } from '../components/BrandDecorations';

interface ActivitiesPageProps {
  onNavigate: (page: PageId) => void;
}

const CATEGORIES: Array<'All' | CreativeActivity['category']> = [
  'All',
  'Science',
  'Origami & Paper',
  'Painting',
  'Nature Craft',
];

const BRUSH_COLORS = [
  { name: 'Violet', hex: '#6B4CE6' },
  { name: 'Sunny Yellow', hex: '#FFD454' },
  { name: 'Coral', hex: '#F43F5E' },
  { name: 'Sky Blue', hex: '#0EA5E9' },
  { name: 'Leaf Green', hex: '#10B981' },
  { name: 'Ink', hex: '#181725' },
];

export function ActivitiesPage({ onNavigate }: ActivitiesPageProps) {
  const [mode, setMode] = useState<'guides' | 'doodle'>('guides');
  const [selectedCategory, setSelectedCategory] = useState<'All' | CreativeActivity['category']>('All');
  const [activeGuide, setActiveGuide] = useState<CreativeActivity | null>(null);
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});

  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const [brushColor, setBrushColor] = useState('#6B4CE6');
  const [brushSize, setBrushSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);

  const filteredActivities =
    selectedCategory === 'All'
      ? CREATIVE_ACTIVITIES
      : CREATIVE_ACTIVITIES.filter((a) => a.category === selectedCategory);

  useEffect(() => {
    if (mode !== 'doodle' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Initialize white background if blank
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [mode]);

  const getPointerPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>;
    return {
      x: (mouseEvent.clientX - rect.left) * scaleX,
      y: (mouseEvent.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const pos = getPointerPos(e);
    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : brushColor;
    ctx.lineWidth = isEraser ? brushSize * 2 : brushSize;
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const pos = getPointerPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'brightsprout-drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const toggleMaterial = (key: string) => {
    setCheckedMaterials((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Hub Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725]">
              Creative{' '}
              <span className="font-display-script font-semibold text-[#6B4CE6]">
                Activities
              </span>{' '}
              &amp; Studio
            </h1>
            <p className="mt-3 text-base text-[#666476] leading-relaxed">
              Follow step-by-step science experiments and paper crafts, or open the interactive Doodle Studio to paint right on screen.
            </p>
          </div>

          {/* Quick links to sibling interactive pages */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EFE9FE] text-[#181725] text-xs font-bold hover:bg-[#DFD3FE] transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#6B4CE6]" aria-hidden="true" />
              <span>Fun Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('games')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFF4D1] text-[#181725] text-xs font-bold hover:bg-[#FFD454] transition-colors cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-[#181725]" aria-hidden="true" />
              <span>Learning Games</span>
            </button>
          </div>
        </div>

        {/* Mode Segmented Toggle */}
        <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#F4F1FC] border border-[#E6E3F0]">
          <button
            type="button"
            onClick={() => setMode('guides')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              mode === 'guides'
                ? 'bg-[#6B4CE6] text-white shadow-xs'
                : 'text-[#4F4D60] hover:text-[#181725]'
            }`}
          >
            Hands-On Guides ({CREATIVE_ACTIVITIES.length})
          </button>
          <button
            type="button"
            onClick={() => setMode('doodle')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              mode === 'doodle'
                ? 'bg-[#6B4CE6] text-white shadow-xs'
                : 'text-[#4F4D60] hover:text-[#181725]'
            }`}
          >
            <Palette className="w-4 h-4" aria-hidden="true" />
            <span>Doodle Studio</span>
          </button>
        </div>

        {mode === 'guides' ? (
          <>
            {/* Category Filter */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#FFD454] text-[#181725]'
                      : 'bg-[#FAF9FE] text-[#4F4D60] border border-[#EFEDF6] hover:border-[#6B4CE6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Activity Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredActivities.map((activity) => (
                <article
                  key={activity.id}
                  className="rounded-[28px] border border-[#EFEDF6] bg-white overflow-hidden flex flex-col justify-between hover:shadow-[0_18px_36px_-14px_rgba(24,23,37,0.12)] transition-shadow"
                >
                  <div>
                    <div className="aspect-[4/3] bg-[#FAF9FE] overflow-hidden">
                      <SafeImage
                        src={activity.image}
                        alt={activity.title}
                        fallbackLabel={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#666476]">
                        <span>{activity.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activity.ageRange}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activity.difficulty}</span>
                      </div>
                      <h2 className="mt-2 text-xl font-bold text-[#181725] leading-snug">
                        {activity.title}
                      </h2>
                      <p className="mt-2 text-sm text-[#666476] leading-relaxed">
                        {activity.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#666476]">
                      <Clock className="w-3.5 h-3.5 text-[#6B4CE6]" aria-hidden="true" />
                      {activity.duration}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveGuide(activity)}
                      className="px-4 py-2 rounded-full bg-[#6B4CE6] text-white text-xs font-bold hover:bg-[#5738D1] transition-colors cursor-pointer"
                    >
                      Open Guide
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          /* Interactive Doodle Studio */
          <div className="mt-8 rounded-[32px] border border-[#EFEDF6] bg-[#FAF9FE] p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#EAE6F4]">
              <div className="flex flex-wrap items-center gap-2.5">
                {BRUSH_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => {
                      setBrushColor(c.hex);
                      setIsEraser(false);
                    }}
                    aria-label={`Select ${c.name} brush`}
                    className={`w-9 h-9 rounded-full border-2 transition-transform cursor-pointer ${
                      !isEraser && brushColor === c.hex
                        ? 'scale-110 border-[#181725] ring-2 ring-[#6B4CE6]/30'
                        : 'border-white shadow-xs'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}

                <div className="h-6 w-px bg-[#DEDAE9] mx-1 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <label htmlFor="brush-size" className="text-xs font-bold text-[#4F4D60]">
                    Size: {brushSize}px
                  </label>
                  <input
                    id="brush-size"
                    type="range"
                    min={3}
                    max={24}
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-24 accent-[#6B4CE6]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEraser((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                    isEraser
                      ? 'bg-[#181725] text-white border-[#181725]'
                      : 'bg-white text-[#181725] border-[#DDD8EE]'
                  }`}
                >
                  <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Eraser</span>
                </button>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#181725] border border-[#DDD8EE] hover:border-red-300 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
                <button
                  type="button"
                  onClick={downloadDrawing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#6B4CE6] text-white hover:bg-[#5738D1] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Save Art</span>
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-2xl overflow-hidden border border-[#E2DDF2] bg-white shadow-xs">
              <canvas
                ref={canvasRef}
                width={1000}
                height={520}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[320px] sm:h-[440px] touch-none cursor-crosshair block"
              />
            </div>
          </div>
        )}
      </div>

      {/* Step-by-Step Guide Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#181725]/45 backdrop-blur-xs"
            onClick={() => setActiveGuide(null)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeGuide.title}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFEDF6] max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setActiveGuide(null)}
              aria-label="Close activity guide"
              className="absolute top-5 right-5 w-10 h-10 rounded-full hover:bg-[#F5F2FF] flex items-center justify-center text-[#181725] cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="pr-10">
              <p className="text-xs font-bold text-[#6B4CE6]">
                {activeGuide.category} · {activeGuide.ageRange} · {activeGuide.duration}
              </p>
              <h2 className="text-2xl font-extrabold text-[#181725] mt-1">
                {activeGuide.title}
              </h2>
              <p className="mt-2 text-sm text-[#4F4D60] leading-relaxed">
                {activeGuide.summary}
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#FAF9FE] border border-[#EFEDF6]">
              <h3 className="text-sm font-bold text-[#181725] mb-3">
                Materials Checklist
              </h3>
              <ul className="space-y-2">
                {activeGuide.materials.map((item, idx) => {
                  const key = `${activeGuide.id}-${idx}`;
                  const checked = !!checkedMaterials[key];
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => toggleMaterial(key)}
                        className="flex items-center gap-2.5 text-left text-sm text-[#4F4D60] hover:text-[#181725] cursor-pointer"
                      >
                        {checked ? (
                          <CheckSquare className="w-4 h-4 text-[#6B4CE6] shrink-0" aria-hidden="true" />
                        ) : (
                          <Square className="w-4 h-4 text-[#8E8BA0] shrink-0" aria-hidden="true" />
                        )}
                        <span className={checked ? 'line-through text-[#8E8BA0]' : ''}>
                          {item}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-[#181725] mb-3">
                Step-by-Step Instructions
              </h3>
              <ol className="space-y-3">
                {activeGuide.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#4F4D60] leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-[#EFE9FE] text-[#6B4CE6] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#FFF9E6] border border-[#FFE9A3]">
              <p className="text-xs font-bold text-[#181725]">Educator Discovery Tip</p>
              <p className="text-xs text-[#4A4123] mt-1 leading-relaxed">
                {activeGuide.learningTip}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
