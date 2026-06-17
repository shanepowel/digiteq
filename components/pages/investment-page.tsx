"use client";

import { useState } from "react";
import { ArrowRight, Check } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animation/motion';

const criteria = [
  { label: 'Profitable digital businesses', description: 'Consistent positive cash flow with at least 12 months of trading history.' },
  { label: 'Niche media and newsletter assets', description: 'Owned audiences with organic growth and engaged subscriber bases.' },
  { label: 'Productised service brands', description: 'Defined service packages with documented delivery processes and recurring clients.' },
  { label: 'Marketplaces with organic demand', description: 'Two-sided platforms where both supply and demand grow without proportional ad spend.' },
  { label: 'Software utilities with durable search intent', description: 'Tools that solve specific problems people search for consistently.' },
];

const process = [
  { step: '01', title: 'Initial conversation', duration: 'Week 1', description: 'A 30-minute call to understand your business, your goals, and whether there is a potential fit. No financials required at this stage.' },
  { step: '02', title: 'Mutual NDA and data exchange', duration: 'Week 2', description: 'We sign a mutual NDA and you share key financials: P&L, traffic sources, customer data, and operational overview.' },
  { step: '03', title: 'Discovery and valuation', duration: 'Weeks 2 to 4', description: 'We review the data, reconcile against payment processor records, and build our view of the business. We share our indicative valuation range.' },
  { step: '04', title: 'Offer and terms', duration: 'Week 4', description: 'If both sides want to proceed, we issue a letter of intent with price, structure, transition terms and timeline.' },
  { step: '05', title: 'Due diligence and close', duration: 'Weeks 5 to 8', description: 'Final verification, legal documentation and closing. We handle the legal costs. Founder transition support is included.' },
];

const revenueRanges = [
  'Under 5,000/month',
  '5,000 to 15,000/month',
  '15,000 to 50,000/month',
  '50,000 to 150,000/month',
  'Over 150,000/month',
];

const businessTypes = [
  'Content/media site',
  'SaaS/software',
  'Marketplace',
  'E-commerce',
  'Newsletter/audience',
  'Productised service',
  'Other',
];

export function InvestmentPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    businessUrl: '',
    businessType: '',
    revenueRange: '',
    yearsOperating: '',
    trafficSource: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // POST to /api/investment route handler which forwards to HubSpot
    try {
      await fetch('/api/investment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      // Handle error
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Investment
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6 max-w-[640px]">
              Looking to sell your digital business?
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gray-400 max-w-[480px]">
              We partner with founders to unlock the next chapter. Fair process. Fast decisions. Aligned outcomes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What we acquire */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              What We Acquire
            </p>
            <h2 className="text-[30px] font-semibold text-white mb-12">
              We focus on five categories of digital asset.
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-0 max-w-[720px]">
            {criteria.map((c) => (
              <StaggerItem key={c.label}>
                <div className="border-b border-white/[0.06] py-6 flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-[#00D4FF]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#00D4FF]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white mb-1">{c.label}</h3>
                    <p className="text-[13px] leading-[1.6] text-gray-400">{c.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
              Our Process
            </p>
            <h2 className="text-[30px] font-semibold text-white mb-4">
              Conversation to close in 8 weeks.
            </h2>
            <p className="text-[15px] text-gray-400 mb-12 max-w-[520px]">
              We designed our process for founders who value speed and certainty. If the fit is not there, we say so in week one.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-0 max-w-[720px]">
            {process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="border-b border-white/[0.06] py-6 grid grid-cols-[60px_1fr] gap-6">
                  <div>
                    <div className="text-[11px] font-semibold tracking-[0.14em] text-gray-600">{p.step}</div>
                    <div className="text-[11px] text-[#00D4FF] mt-1">{p.duration}</div>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-[13px] leading-[1.6] text-gray-400">{p.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Qualification Form */}
      <section className="py-[100px] px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-[1fr_1.2fr] gap-20 items-start">
            <Reveal>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#00D4FF] mb-4">
                Start a Conversation
              </p>
              <h2 className="text-[30px] font-semibold text-white mb-4">
                Tell us about your business.
              </h2>
              <p className="text-[15px] leading-[1.7] text-gray-400 mb-6">
                Share a few details and we will get back to you within 48 hours with an honest assessment of whether there is a fit.
              </p>
              <p className="text-[13px] text-gray-500">
                All submissions are confidential. For formal confidentiality protections, we provide a mutual NDA on request.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {submitted ? (
                <div className="bg-[#0E1020] border border-white/[0.06] rounded-xl p-8">
                  <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-white mb-2">Received.</h3>
                  <p className="text-[14px] text-gray-400">
                    We will review your submission and respond within 48 hours.
                  </p>
                </div>
              ) : (
                <div className="bg-[#0E1020] border border-white/[0.06] rounded-xl p-8">
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Your name</label>
                        <input name="name" value={formData.name} onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Business name</label>
                        <input name="businessName" value={formData.businessName} onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Website URL</label>
                        <input name="businessUrl" value={formData.businessUrl} onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                        />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Business type</label>
                        <select name="businessType" value={formData.businessType} onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12] appearance-none">
                          <option value="">Select</option>
                          {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Monthly revenue</label>
                        <select name="revenueRange" value={formData.revenueRange} onChange={handleChange}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12] appearance-none">
                          <option value="">Select</option>
                          {revenueRanges.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Years operating</label>
                        <input name="yearsOperating" value={formData.yearsOperating} onChange={handleChange}
                          placeholder="e.g. 3"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-gray-500 mb-1.5">Primary traffic source</label>
                        <input name="trafficSource" value={formData.trafficSource} onChange={handleChange}
                          placeholder="e.g. Organic search, direct"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12]"
                        />
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="block text-[12px] text-gray-500 mb-1.5">Why are you considering a sale?</label>
                      <textarea name="reason" value={formData.reason} onChange={handleChange} rows={3}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12] resize-none"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[12px] text-gray-500 mb-1.5">Anything else?</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={2}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-white/[0.06] bg-[#080A11] text-white text-[13px] outline-none focus:border-white/[0.12] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[10px] text-sm font-medium text-white"
                      style={{ background: "linear-gradient(135deg, #FF2D7B, #D946EF)" }}
                    >
                      Submit Enquiry <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
