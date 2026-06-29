"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { Badge } from "@/components/ui/badge";

const portfolioCompanies = [
  {
    name: "Konduit",
    badge: "Supply",
    description:
      "Enterprise technology supply for Southern Africa. European-sourced hardware, networking, and server infrastructure delivered with full warranty and compliance documentation. Currently serving Zimbabwe, Zambia, and South Africa with expansion planned across the SADC region.",
    status: "Active",
    model: "B2B supply",
    revenue: "Quote-based",
    href: "https://konduit.tech",
  },
  {
    name: "BMKRS",
    badge: "Brand",
    description:
      'A brand company that helps businesses start, make, and grow their brands. Full-service brand development from naming through to digital presence, with a partner network ("the bench") for specialist execution.',
    status: "Active",
    model: "Services and retainer",
    revenue: "Project and recurring",
    href: "https://bmkrs.com",
  },
  {
    name: "FreelanceNearMe",
    badge: "Marketplace",
    description:
      "A marketplace connecting businesses with vetted local freelancers. Focused on making the hiring process faster and more transparent for both sides.",
    status: "Active",
    model: "Marketplace commission",
    revenue: "Transaction-based",
    href: "https://freelancenearme.com",
  },
];

const acquisitionCategories = [
  {
    title: "Digital businesses with proven revenue",
    description:
      "Typical profile: profitable but stagnant, founder looking to exit, revenue between 100k and 2M GBP. Operational inefficiency we can fix.",
  },
  {
    title: "Technology supply chain businesses",
    description:
      "Distributors, resellers, and managed service providers with existing customer relationships in African markets. Businesses that would benefit from European sourcing capability and group infrastructure.",
  },
  {
    title: "Complementary platforms",
    description:
      "Businesses that extend the Digiteq portfolio into adjacent verticals: content, education technology, fintech infrastructure, or logistics technology.",
  },
];

const revenueRanges = [
  "Under 5,000/month",
  "5,000 to 15,000/month",
  "15,000 to 50,000/month",
  "50,000 to 150,000/month",
  "Over 150,000/month",
];

const businessTypes = [
  "Digital business",
  "Supply chain / distribution",
  "Marketplace",
  "SaaS/software",
  "Productised service",
  "Other",
];

export function InvestmentPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    businessUrl: "",
    businessType: "",
    revenueRange: "",
    yearsOperating: "",
    trafficSource: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      // Handle error
    }
  }

  return (
    <>
      <section className="px-12 pb-24 pt-32">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              Invest
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-6 max-w-[640px] text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Invest with Digiteq
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-[520px] text-lg leading-relaxed text-gray-400">
              We deploy capital into technology businesses and supply chains where the opportunity
              is clear and the competition is thin.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              The thesis
            </p>
            <h2 className="mb-8 text-[30px] font-semibold text-white">Where we invest</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[720px] space-y-5 text-[15px] leading-[1.7] text-gray-400">
              <p>
                We look for technology opportunities with three characteristics: clear demand,
                fragmented supply, and a defensible operational advantage we can build or acquire.
              </p>
              <p>
                Our current focus is Southern Africa, where enterprise IT demand is growing at
                double-digit rates but supply chains remain dominated by informal importers, grey
                market channels, and slow-moving global distributors who treat the region as an
                afterthought.
              </p>
              <p>
                We are not a venture fund. We do not invest in early-stage ideas or pre-revenue
                startups. We invest in and build operational businesses that generate revenue from
                day one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              Portfolio
            </p>
            <h2 className="mb-4 text-[30px] font-semibold text-white">What we have built</h2>
            <p className="mb-12 max-w-[560px] text-[15px] leading-[1.7] text-gray-400">
              Each business in the Digiteq portfolio was either built from scratch or acquired and
              restructured. We operate them, we do not just fund them.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {portfolioCompanies.map((company) => (
              <StaggerItem key={company.name}>
                <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-[#0E1020] p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <h3 className="text-[16px] font-semibold text-white">{company.name}</h3>
                    <Badge variant="default" className="text-[10px] uppercase tracking-wide">
                      {company.badge}
                    </Badge>
                  </div>
                  <p className="mb-6 flex-1 text-[13px] leading-[1.6] text-gray-400">
                    {company.description}
                  </p>
                  <div className="space-y-2 border-t border-white/[0.06] pt-4 text-[12px] text-gray-500">
                    <div>
                      <span className="text-gray-600">Status: </span>
                      <span className="text-gray-400">{company.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Model: </span>
                      <span className="text-gray-400">{company.model}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Revenue: </span>
                      <span className="text-gray-400">{company.revenue}</span>
                    </div>
                  </div>
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#00D4FF]"
                  >
                    Visit site <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              Acquisition pipeline
            </p>
            <h2 className="mb-8 text-[30px] font-semibold text-white">What we are looking for</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-8 max-w-[720px] text-[15px] leading-[1.7] text-gray-400">
              We actively evaluate acquisition targets across three categories:
            </p>
          </Reveal>

          <Stagger className="mb-10 max-w-[720px]">
            {acquisitionCategories.map((category) => (
              <StaggerItem key={category.title}>
                <div className="flex gap-4 border-b border-white/[0.06] py-6">
                  <div className="mt-1 shrink-0">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00D4FF]/10">
                      <Check className="h-3 w-3 text-[#00D4FF]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 text-[15px] font-semibold text-white">{category.title}</h3>
                    <p className="text-[13px] leading-[1.6] text-gray-400">{category.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal>
            <p className="mb-8 max-w-[720px] text-[15px] leading-[1.7] text-gray-400">
              If you are considering selling a business that fits one of these profiles, we would
              like to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-3.5 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, #FF2D7B, #D946EF)" }}
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
              For investors
            </p>
            <h2 className="mb-8 text-[30px] font-semibold text-white">Partner with us</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-[720px] space-y-5 text-[15px] leading-[1.7] text-gray-400">
              <p>
                Digiteq is privately held. We are open to conversations with aligned investors who
                share our thesis on technology supply and investment in high-growth markets.
              </p>
              <p>
                We are not raising a fund. We deploy capital on a deal-by-deal basis and are
                interested in co-investment partners for larger acquisitions and supply chain
                infrastructure.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2.5 rounded-[10px] border border-white/[0.12] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/[0.2]"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="px-12 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-[1fr_1.2fr] items-start gap-20">
            <Reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#00D4FF]">
                Sell-side enquiries
              </p>
              <h2 className="mb-4 text-[30px] font-semibold text-white">Tell us about your business.</h2>
              <p className="mb-6 text-[15px] leading-[1.7] text-gray-400">
                Share a few details and we will get back to you within 48 hours with an honest
                assessment of whether there is a fit.
              </p>
              <p className="text-[13px] text-gray-500">
                All submissions are confidential. For formal confidentiality protections, we provide
                a mutual NDA on request.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {submitted ? (
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1020] p-8">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#00D4FF]/10">
                    <Check className="h-5 w-5 text-[#00D4FF]" />
                  </div>
                  <h3 className="mb-2 text-[18px] font-semibold text-white">Received.</h3>
                  <p className="text-[14px] text-gray-400">
                    We will review your submission and respond within 48 hours.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1020] p-8">
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Your name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Business name</label>
                        <input
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Website URL</label>
                        <input
                          name="businessUrl"
                          value={formData.businessUrl}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Business type</label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        >
                          <option value="">Select</option>
                          {businessTypes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Monthly revenue</label>
                        <select
                          name="revenueRange"
                          value={formData.revenueRange}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        >
                          <option value="">Select</option>
                          {revenueRanges.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">Years operating</label>
                        <input
                          name="yearsOperating"
                          value={formData.yearsOperating}
                          onChange={handleChange}
                          placeholder="e.g. 3"
                          className="w-full rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[12px] text-gray-500">
                          Primary traffic source
                        </label>
                        <input
                          name="trafficSource"
                          value={formData.trafficSource}
                          onChange={handleChange}
                          placeholder="e.g. Organic search, direct"
                          className="w-full rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[12px] text-gray-500">
                        Why are you considering a sale?
                      </label>
                      <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[12px] text-gray-500">Anything else?</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={2}
                        className="w-full resize-none rounded-lg border border-white/[0.06] bg-[#080A11] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/[0.12]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2.5 rounded-[10px] px-7 py-3.5 text-sm font-medium text-white"
                      style={{ background: "linear-gradient(135deg, #FF2D7B, #D946EF)" }}
                    >
                      Submit Enquiry <ArrowRight className="h-4 w-4" />
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
