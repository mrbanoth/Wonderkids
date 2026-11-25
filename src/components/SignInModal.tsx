import React, { useState } from 'react';
import { Award, BookOpen, Gamepad2, LogOut, Sparkles, X } from 'lucide-react';
import { FamilyProfile } from '../types';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: FamilyProfile | null;
  onSignIn: (profile: FamilyProfile) => void;
  onSignOut: () => void;
}

export function SignInModal({
  isOpen,
  onClose,
  user,
  onSignIn,
  onSignOut,
}: SignInModalProps) {
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('7');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter your name and a valid email address.');
      return;
    }
    setError('');
    onSignIn({
      parentName: parentName.trim(),
      email: email.trim(),
      childName: childName.trim() || 'Maya',
      childAge: Number(childAge) || 7,
      quizzesCompleted: 4,
      activitiesFinished: 6,
      gamesPlayed: 9,
    });
    onClose();
  };

  const handleDemoUser = () => {
    onSignIn({
      parentName: 'Hannah Brooks',
      email: 'hannah.brooks@example.com',
      childName: 'Maya',
      childAge: 7,
      quizzesCompleted: 12,
      activitiesFinished: 8,
      gamesPlayed: 19,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#181725]/45 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={user ? 'Family Account' : 'Sign In to BrightSprout'}
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFEDF6]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sign in dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-[#F5F2FF] flex items-center justify-center text-[#181725] cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {user ? (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-[#6B4CE6]">Family Learning Profile</p>
              <h2 className="text-2xl font-bold text-[#181725] mt-1">
                Welcome, {user.parentName}
              </h2>
              <p className="text-sm text-[#666476] mt-0.5">{user.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9FE] border border-[#EFEDF6]">
              <p className="text-sm font-bold text-[#181725]">
                Learner: {user.childName} ({user.childAge} yrs)
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 rounded-xl bg-white border border-[#EFEDF6]">
                  <Award className="w-4 h-4 text-[#6B4CE6] mx-auto mb-1" aria-hidden="true" />
                  <p className="text-lg font-extrabold text-[#181725] tabular-nums">
                    {user.quizzesCompleted}
                  </p>
                  <p className="text-[11px] text-[#666476]">Quizzes</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#EFEDF6]">
                  <BookOpen className="w-4 h-4 text-[#6B4CE6] mx-auto mb-1" aria-hidden="true" />
                  <p className="text-lg font-extrabold text-[#181725] tabular-nums">
                    {user.activitiesFinished}
                  </p>
                  <p className="text-[11px] text-[#666476]">Crafts</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#EFEDF6]">
                  <Gamepad2 className="w-4 h-4 text-[#6B4CE6] mx-auto mb-1" aria-hidden="true" />
                  <p className="text-lg font-extrabold text-[#181725] tabular-nums">
                    {user.gamesPlayed}
                  </p>
                  <p className="text-[11px] text-[#666476]">Games</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full py-2.5 rounded-full border border-[#DDD8EE] text-sm font-semibold text-[#181725] hover:border-red-300 hover:text-red-600 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-[#181725]">
                Parent &amp; Teacher Sign In
              </h2>
              <p className="text-sm text-[#666476] mt-1">
                Track your child’s quiz scores, saved crafts, and learning kit orders.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDemoUser}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#F3EEFF] text-[#6B4CE6] text-sm font-bold hover:bg-[#E7DEFE] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Try Instant Demo Family Account</span>
            </button>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-[#EFEDF6]" />
              <span className="mx-3 text-xs text-[#8E8BA0]">or sign in with details</span>
              <div className="flex-grow border-t border-[#EFEDF6]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div>
                <label htmlFor="signin-name" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                  Parent or Educator Name
                </label>
                <input
                  id="signin-name"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Sarah Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="signin-email" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                  Email Address
                </label>
                <input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="signin-child" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                    Child’s First Name
                  </label>
                  <input
                    id="signin-child"
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Leo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="signin-age" className="block text-xs font-semibold text-[#4F4D60] mb-1">
                    Child’s Age
                  </label>
                  <select
                    id="signin-age"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD8EE] text-sm bg-white focus:border-[#6B4CE6] focus:outline-none"
                  >
                    {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                      <option key={age} value={age}>
                        {age} years old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p className="text-xs font-medium text-red-600" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] transition-colors cursor-pointer"
              >
                Continue to BrightSprout
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
