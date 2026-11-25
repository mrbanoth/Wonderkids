import React, { useMemo, useState } from 'react';
import {
  Award,
  Bird,
  Calculator,
  Flower2,
  Leaf,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
} from 'lucide-react';

interface MemoryCard {
  uid: number;
  pairId: string;
  label: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const CARD_PAIRS: Array<Omit<MemoryCard, 'uid'>> = [
  { pairId: 'sun', label: 'Sun', color: '#FFD454', Icon: Sun },
  { pairId: 'moon', label: 'Moon', color: '#DFD3FE', Icon: Moon },
  { pairId: 'bird', label: 'Robin', color: '#BAE6FD', Icon: Bird },
  { pairId: 'leaf', label: 'Maple', color: '#BBF7D0', Icon: Leaf },
  { pairId: 'flower', label: 'Daisy', color: '#FECDD3', Icon: Flower2 },
  { pairId: 'star', label: 'Spark', color: '#E9D5FF', Icon: Sparkles },
];

function createShuffledDeck(): MemoryCard[] {
  const doubled = [...CARD_PAIRS, ...CARD_PAIRS].map((card, idx) => ({
    ...card,
    uid: idx,
  }));
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled;
}

interface MathProblem {
  prompt: string;
  answer: number;
  options: number[];
}

function generateMathProblem(level: 'easy' | 'medium'): MathProblem {
  const max = level === 'easy' ? 10 : 25;
  const isAdd = Math.random() > 0.35;
  let a = Math.floor(Math.random() * max) + 1;
  let b = Math.floor(Math.random() * max) + 1;
  if (!isAdd && b > a) {
    [a, b] = [b, a];
  }
  const answer = isAdd ? a + b : a - b;
  const prompt = isAdd ? `${a} + ${b} = ?` : `${a} − ${b} = ?`;

  const optionSet = new Set<number>([answer]);
  while (optionSet.size < 4) {
    const offset = Math.floor(Math.random() * 7) - 3;
    const candidate = Math.max(0, answer + (offset === 0 ? 4 : offset));
    optionSet.add(candidate);
  }

  return {
    prompt,
    answer,
    options: Array.from(optionSet).sort((x, y) => x - y),
  };
}

export function GamesPage() {
  const [activeGame, setActiveGame] = useState<'memory' | 'math'>('memory');

  // Memory Match state
  const [deck, setDeck] = useState<MemoryCard[]>(() => createShuffledDeck());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Quick Math Pop state
  const [mathLevel, setMathLevel] = useState<'easy' | 'medium'>('easy');
  const [problem, setProblem] = useState<MathProblem>(() => generateMathProblem('easy'));
  const [mathScore, setMathScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mathFeedback, setMathFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const isMemoryWon = useMemo(
    () => matchedPairIds.length === CARD_PAIRS.length,
    [matchedPairIds]
  );

  const handleFlipCard = (idx: number) => {
    if (isChecking) return;
    if (flippedIndices.includes(idx)) return;
    if (matchedPairIds.includes(deck[idx].pairId)) return;

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;
      if (deck[firstIdx].pairId === deck[secondIdx].pairId) {
        setMatchedPairIds((prev) => [...prev, deck[firstIdx].pairId]);
        setFlippedIndices([]);
      } else {
        setIsChecking(true);
        window.setTimeout(() => {
          setFlippedIndices([]);
          setIsChecking(false);
        }, 700);
      }
    }
  };

  const resetMemoryGame = () => {
    setDeck(createShuffledDeck());
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsChecking(false);
  };

  const handleMathChoice = (choice: number) => {
    if (mathFeedback !== 'idle') return;
    if (choice === problem.answer) {
      setMathScore((s) => s + 10);
      setStreak((st) => st + 1);
      setMathFeedback('correct');
    } else {
      setStreak(0);
      setMathFeedback('wrong');
    }

    window.setTimeout(() => {
      setMathFeedback('idle');
      setProblem(generateMathProblem(mathLevel));
    }, 650);
  };

  const handleSwitchMathLevel = (level: 'easy' | 'medium') => {
    setMathLevel(level);
    setMathScore(0);
    setStreak(0);
    setMathFeedback('idle');
    setProblem(generateMathProblem(level));
  };

  return (
    <div className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725]">
            Learn with{' '}
            <span className="font-display-script font-semibold text-[#6B4CE6]">
              Games
            </span>
          </h1>
          <p className="mt-3 text-base text-[#666476] leading-relaxed">
            Strengthen visual memory and quick mental math with calm, ad-free mini-games designed for kids ages 4–10.
          </p>
        </div>

        {/* Game Switcher */}
        <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#F4F1FC] border border-[#E6E3F0]">
          <button
            type="button"
            onClick={() => setActiveGame('memory')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeGame === 'memory'
                ? 'bg-[#6B4CE6] text-white'
                : 'text-[#4F4D60] hover:text-[#181725]'
            }`}
          >
            Nature Memory Match
          </button>
          <button
            type="button"
            onClick={() => setActiveGame('math')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer ${
              activeGame === 'math'
                ? 'bg-[#FFD454] text-[#181725]'
                : 'text-[#4F4D60] hover:text-[#181725]'
            }`}
          >
            <Calculator className="w-4 h-4" aria-hidden="true" />
            <span>Quick Math Pop</span>
          </button>
        </div>

        {activeGame === 'memory' ? (
          <div className="mt-8 rounded-[32px] border border-[#EFEDF6] bg-[#FAF9FE] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-6 text-sm font-bold text-[#181725]">
                <span className="tabular-nums">Moves: {moves}</span>
                <span className="tabular-nums text-[#6B4CE6]">
                  Pairs: {matchedPairIds.length} / {CARD_PAIRS.length}
                </span>
              </div>
              <button
                type="button"
                onClick={resetMemoryGame}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DDD8EE] text-xs font-bold text-[#181725] hover:border-[#6B4CE6] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Shuffle Deck</span>
              </button>
            </div>

            {isMemoryWon ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFD454] text-[#181725] flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#181725]">
                  All 6 Pairs Matched!
                </h2>
                <p className="text-sm text-[#666476] tabular-nums">
                  You completed the board in {moves} moves.
                </p>
                <button
                  type="button"
                  onClick={resetMemoryGame}
                  className="px-6 py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] cursor-pointer"
                >
                  Play Another Round
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-2xl mx-auto">
                {deck.map((card, idx) => {
                  const isFlipped =
                    flippedIndices.includes(idx) || matchedPairIds.includes(card.pairId);
                  const isMatched = matchedPairIds.includes(card.pairId);
                  const Icon = card.Icon;

                  return (
                    <button
                      key={card.uid}
                      type="button"
                      onClick={() => handleFlipCard(idx)}
                      aria-label={isFlipped ? card.label : 'Hidden memory card'}
                      className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        isFlipped
                          ? isMatched
                            ? 'border-emerald-400 bg-white scale-[0.98]'
                            : 'border-[#6B4CE6] bg-white'
                          : 'border-[#6B4CE6] bg-[#6B4CE6] text-white hover:bg-[#5738D1]'
                      }`}
                    >
                      {isFlipped ? (
                        <>
                          <span
                            className="w-11 h-11 rounded-full flex items-center justify-center text-[#181725]"
                            style={{ backgroundColor: card.color }}
                          >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </span>
                          <span className="text-xs font-bold text-[#181725]">
                            {card.label}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-extrabold opacity-85">?</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Quick Math Pop */
          <div className="mt-8 rounded-[32px] border border-[#EFEDF6] bg-[#FAF9FE] p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EAE6F4]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSwitchMathLevel('easy')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                    mathLevel === 'easy'
                      ? 'bg-[#6B4CE6] text-white'
                      : 'bg-white border border-[#DDD8EE] text-[#4F4D60]'
                  }`}
                >
                  Ages 4–7 (1–10)
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchMathLevel('medium')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                    mathLevel === 'medium'
                      ? 'bg-[#6B4CE6] text-white'
                      : 'bg-white border border-[#DDD8EE] text-[#4F4D60]'
                  }`}
                >
                  Ages 8–10 (1–25)
                </button>
              </div>

              <div className="flex items-center gap-5 text-sm font-bold text-[#181725] tabular-nums">
                <span>Score: {mathScore}</span>
                <span className="text-[#6B4CE6]">Streak: {streak}</span>
              </div>
            </div>

            <div className="max-w-md mx-auto py-8 text-center">
              <p className="text-xs font-bold text-[#666476]">Solve this number puzzle</p>
              <div className="mt-3 py-8 px-6 rounded-3xl bg-white border border-[#E6E3F0] shadow-xs">
                <p className="text-4xl sm:text-5xl font-extrabold text-[#181725] tabular-nums">
                  {problem.prompt}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3.5">
                {problem.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleMathChoice(opt)}
                    className="py-4 rounded-2xl bg-white border-2 border-[#E6E3F0] hover:border-[#6B4CE6] hover:bg-[#F5F2FF] text-2xl font-extrabold text-[#181725] tabular-nums transition-colors cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="h-7 mt-5">
                {mathFeedback === 'correct' && (
                  <p className="text-sm font-bold text-emerald-600">
                    Awesome! +10 points
                  </p>
                )}
                {mathFeedback === 'wrong' && (
                  <p className="text-sm font-bold text-amber-700">
                    Close! The answer was {problem.answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
