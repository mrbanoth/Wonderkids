import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FAQS } from '../data/mockData';

export function ContactPage() {
  const [role, setRole] = useState<'Parent' | 'Educator' | 'School Buyer'>('Parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [childAge, setChildAge] = useState('6-8 yrs');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please share a brief message (at least 10 characters).');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-white py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#181725]">
            Get in{' '}
            <span className="font-display-script font-semibold text-[#6B4CE6]">
              touch
            </span>{' '}
            with our team
          </h1>
          <p className="mt-3 text-base text-[#666476] leading-relaxed">
            Have a question about age recommendations, classroom bundles, or an order? Our Portland educators reply within one business day.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 rounded-[32px] border border-[#EFEDF6] bg-[#FAF9FE] p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#181725]">
                  Message Received!
                </h2>
                <p className="text-sm text-[#4F4D60] max-w-md mx-auto leading-relaxed">
                  Thank you, {name}. A BrightSprout curriculum coordinator will reply to {email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <span className="block text-xs font-bold text-[#181725] mb-2">
                    I am reaching out as a:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(['Parent', 'Educator', 'School Buyer'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          role === r
                            ? 'bg-[#6B4CE6] text-white'
                            : 'bg-white border border-[#DDD8EE] text-[#4F4D60] hover:border-[#6B4CE6]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-[#181725] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jordan Taylor"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#181725] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-age" className="block text-xs font-bold text-[#181725] mb-1.5">
                    Child or Classroom Age Range
                  </label>
                  <select
                    id="contact-age"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none"
                  >
                    <option value="3-5 yrs">Preschool (3–5 years)</option>
                    <option value="6-8 yrs">Early Elementary (6–8 years)</option>
                    <option value="9-12 yrs">Upper Elementary (9–12 years)</option>
                    <option value="Mixed Ages">Mixed Classroom / Family</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-[#181725] mb-1.5">
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about learning kits, school orders, or activity guides..."
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#DDD8EE] text-sm focus:border-[#6B4CE6] focus:outline-none resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs font-semibold text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#6B4CE6] text-white text-sm font-bold hover:bg-[#5738D1] transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Studio Details & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-[28px] bg-[#6B4CE6] text-white space-y-4">
              <h2 className="text-xl font-extrabold">BrightSprout Learning Studio</h2>
              <div className="space-y-3 text-sm text-white/90">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FFD454] shrink-0 mt-1" aria-hidden="true" />
                  <span>1420 NW Flanders St, Suite 204, Portland, OR 97209</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#FFD454] shrink-0" aria-hidden="true" />
                  <span>hello@brightsprout.edu.example</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#FFD454] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">(503) 555-0194</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#FFD454] shrink-0" aria-hidden="true" />
                  <span>Monday – Saturday, 9:00 AM – 5:30 PM PT</span>
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#EFEDF6] p-6">
              <h2 className="text-lg font-extrabold text-[#181725] mb-4">
                Common Questions
              </h2>
              <div className="divide-y divide-[#EFEDF6]">
                {FAQS.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className="py-3 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-3 text-left text-sm font-bold text-[#181725] py-1 cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#6B4CE6] shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs sm:text-sm text-[#666476] leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
