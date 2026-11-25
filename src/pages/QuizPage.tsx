import React, { useState } from 'react';
import { Award, CheckCircle2, Clock, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import { QUIZ_TOPICS } from '../data/mockData';
import { QuizTopic } from '../types';

export function QuizPage() {
  const [activeTopic, setActiveTopic] = useState<QuizTopic>(QUIZ_TOPICS[0]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = activeTopic.questions[questionIdx];

  const handleSelectTopic = (topic: QuizTopic) => {
    setActiveTopic(topic);
    setQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setCompleted(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    if (optionIdx === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (questionIdx + 1 < activeTopic.questions.length) {
      setQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setCompleted(false);
  };

  const accentBg = (accent: QuizTopic['accent'], isSelected: boolean) => {
    if (!isSelected) return 'bg-white border-[#EFEDF6] text-[#181725] hover:border-[#6B4CE6]';
    if (accent === 'yellow') return 'bg-[#FFD454] border-[#FFD454] text-[#181725]';
    if (accent === 'lavender') return 'bg-[#DFD3FE] border-[#DFD3FE] text-[#181725]';
    return 'bg-[#6B4CE6] border-[#6B4CE6] text-white';
  };

  return (
    <div className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725]">
            Fun{' '}
            <span className="font-display-script font-semibold text-[#6B4CE6]">
              Quiz
            </span>{' '}
            Adventures
          </h1>
          <p className="mt-3 text-base text-[#666476] leading-relaxed">
            Choose a curiosity topic below, answer five playful questions, and learn fun science, nature, and math facts along the way.
          </p>
        </div>

        {/* Topic Selector Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUIZ_TOPICS.map((topic) => {
            const isSelected = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleSelectTopic(topic)}
                className={`text-left p-5 rounded-3xl border transition-all cursor-pointer ${accentBg(
                  topic.accent,
                  isSelected
                )}`}
              >
                <div className="flex items-center justify-between gap-2 text-xs opacity-80">
                  <span>{topic.subject}</span>
                  <span>{topic.ageRange}</span>
                </div>
                <h2 className="mt-2 text-base font-bold leading-snug">{topic.title}</h2>
                <div className="mt-3 flex items-center gap-1.5 text-xs opacity-80 tabular-nums">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {topic.questions.length} questions · {topic.durationMinutes} min
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Playable Quiz Stage */}
        <div className="mt-8 rounded-[32px] border border-[#EFEDF6] bg-[#FAF9FE] p-6 sm:p-10">
          {completed ? (
            <div className="max-w-lg mx-auto text-center py-6 space-y-5">
              <div className="w-20 h-20 rounded-full bg-[#FFD454] text-[#181725] flex items-center justify-center mx-auto">
                <Award className="w-10 h-10" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#181725]">
                Great Explorer Work!
              </h2>
              <p className="text-base text-[#4F4D60]">
                You scored{' '}
                <span className="font-extrabold text-[#6B4CE6] tabular-nums">
                  {score} out of {activeTopic.questions.length}
                </span>{' '}
                on {activeTopic.title}.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Play Again</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx =
                      (QUIZ_TOPICS.findIndex((t) => t.id === activeTopic.id) + 1) %
                      QUIZ_TOPICS.length;
                    handleSelectTopic(QUIZ_TOPICS[nextIdx]);
                  }}
                  className="px-6 py-3 rounded-full bg-white border border-[#DDD8EE] text-sm font-bold text-[#181725] hover:border-[#6B4CE6] cursor-pointer"
                >
                  Try Next Subject →
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-bold text-[#666476] mb-2">
                <span>{activeTopic.title}</span>
                <span className="tabular-nums">
                  Question {questionIdx + 1} of {activeTopic.questions.length} · Score: {score}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-[#E9E4FA] overflow-hidden mb-8">
                <div
                  className="h-full bg-[#6B4CE6] rounded-full transition-all duration-300"
                  style={{
                    width: `${((questionIdx + 1) / activeTopic.questions.length) * 100}%`,
                  }}
                />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#181725] leading-snug">
                {currentQuestion.question}
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuestion.options.map((option, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;
                  const answered = selectedOption !== null;

                  let btnClass =
                    'bg-white border-[#E6E3F0] text-[#181725] hover:border-[#6B4CE6]';
                  if (answered) {
                    if (isCorrect) {
                      btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                    } else if (isChosen) {
                      btnClass = 'bg-red-50 border-red-400 text-red-900';
                    } else {
                      btnClass = 'bg-white/60 border-[#EFEDF6] text-[#8E8BA0]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={answered}
                      onClick={() => handleAnswer(idx)}
                      className={`p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-bold flex items-center justify-between gap-3 transition-colors min-h-[56px] cursor-pointer disabled:cursor-default ${btnClass}`}
                    >
                      <span>{option}</span>
                      {answered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                      )}
                      {answered && isChosen && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="mt-6 p-5 rounded-2xl bg-white border border-[#E5E0F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#6B4CE6] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-[#4F4D60] leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {questionIdx + 1 < activeTopic.questions.length
                      ? 'Next Question →'
                      : 'See Results'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
