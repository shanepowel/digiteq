"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/animation/motion";
import { DhCard, DhPageHero, DhSection } from "@/components/layout/dh-primitives";

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
      <DhPageHero
        eyebrow="Invest"
        title="Invest with Digiteq"
        lede="We deploy capital into technology businesses and supply chains where the opportunity is clear and the competition is thin."
        titleClassName="max-w-[16ch]"
      />

      <DhSection tinted>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">The thesis</span>
          </div>
          <h2 className="dh-page-h2 mb-8">Where we invest</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-[720px] space-y-5 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
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
      </DhSection>

      <DhSection>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">Portfolio</span>
          </div>
          <h2 className="dh-page-h2 mb-4">What we have built</h2>
          <p className="mb-12 max-w-[560px] text-[15px] leading-[1.7] text-[var(--ink-dim)]">
            Each business in the Digiteq portfolio was either built from scratch or acquired and
            restructured. We operate them, we do not just fund them.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {portfolioCompanies.map((company) => (
            <StaggerItem key={company.name}>
              <DhCard className="flex h-full flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-[16px] font-semibold text-[var(--ink)]">{company.name}</h3>
                  <span className="dh-badge">{company.badge}</span>
                </div>
                <p className="mb-6 flex-1 text-[13px] leading-[1.6] text-[var(--ink-dim)]">
                  {company.description}
                </p>
                <div className="space-y-2 border-t border-[var(--rule)] pt-4 text-[12px] text-[var(--ink-faint)]">
                  <div>
                    <span>Status: </span>
                    <span className="text-[var(--ink-dim)]">{company.status}</span>
                  </div>
                  <div>
                    <span>Model: </span>
                    <span className="text-[var(--ink-dim)]">{company.model}</span>
                  </div>
                  <div>
                    <span>Revenue: </span>
                    <span className="text-[var(--ink-dim)]">{company.revenue}</span>
                  </div>
                </div>
                <a
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dh-tlink mt-4 inline-flex items-center gap-1.5 text-[13px]"
                >
                  Visit site <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </DhCard>
            </StaggerItem>
          ))}
        </Stagger>
      </DhSection>

      <DhSection tinted>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">Acquisition pipeline</span>
          </div>
          <h2 className="dh-page-h2 mb-8">What we are looking for</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-8 max-w-[720px] text-[15px] leading-[1.7] text-[var(--ink-dim)]">
            We actively evaluate acquisition targets across three categories:
          </p>
        </Reveal>

        <Stagger className="mb-10 max-w-[720px]">
          {acquisitionCategories.map((category) => (
            <StaggerItem key={category.title}>
              <div className="flex gap-4 border-b border-[var(--rule)] py-6">
                <div className="mt-1 shrink-0">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ledger-soft)]">
                    <Check className="h-3 w-3 text-[var(--ledger)]" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-[15px] font-semibold text-[var(--ink)]">{category.title}</h3>
                  <p className="text-[13px] leading-[1.6] text-[var(--ink-dim)]">{category.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mb-8 max-w-[720px] text-[15px] leading-[1.7] text-[var(--ink-dim)]">
            If you are considering selling a business that fits one of these profiles, we would
            like to hear from you.
          </p>
          <Link href="/contact" className="dh-btn dh-btn-fill">
            Start a conversation <ArrowRight className="ml-1.5 inline h-4 w-4" />
          </Link>
        </Reveal>
      </DhSection>

      <DhSection>
        <Reveal>
          <div className="dh-eyebrow">
            <span className="dh-mono">For investors</span>
          </div>
          <h2 className="dh-page-h2 mb-8">Partner with us</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-[720px] space-y-5 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
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
          <Link href="/contact" className="dh-btn mt-8 inline-flex items-center gap-2">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </DhSection>

      <DhSection tinted className="!pb-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="dh-eyebrow">
              <span className="dh-mono">Sell-side enquiries</span>
            </div>
            <h2 className="dh-page-h2 mb-4">Tell us about your business.</h2>
            <p className="mb-6 text-[15px] leading-[1.7] text-[var(--ink-dim)]">
              Share a few details and we will get back to you within 48 hours with an honest
              assessment of whether there is a fit.
            </p>
            <p className="text-[13px] text-[var(--ink-faint)]">
              All submissions are confidential. For formal confidentiality protections, we provide
              a mutual NDA on request.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <DhCard>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ledger-soft)]">
                  <Check className="h-5 w-5 text-[var(--ledger)]" />
                </div>
                <h3 className="dh-page-h2 mb-2 text-[1.25rem]">Received.</h3>
                <p className="text-[14px] text-[var(--ink-dim)]">
                  We will review your submission and respond within 48 hours.
                </p>
              </DhCard>
            ) : (
              <DhCard>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="dh-label" htmlFor="inv-name">
                        Your name
                      </label>
                      <input
                        id="inv-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="dh-input"
                      />
                    </div>
                    <div>
                      <label className="dh-label" htmlFor="inv-email">
                        Email
                      </label>
                      <input
                        id="inv-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="dh-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="dh-label" htmlFor="inv-business">
                        Business name
                      </label>
                      <input
                        id="inv-business"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="dh-input"
                      />
                    </div>
                    <div>
                      <label className="dh-label" htmlFor="inv-url">
                        Website URL
                      </label>
                      <input
                        id="inv-url"
                        name="businessUrl"
                        value={formData.businessUrl}
                        onChange={handleChange}
                        className="dh-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="dh-label" htmlFor="inv-type">
                        Business type
                      </label>
                      <select
                        id="inv-type"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="dh-input"
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
                      <label className="dh-label" htmlFor="inv-revenue">
                        Monthly revenue
                      </label>
                      <select
                        id="inv-revenue"
                        name="revenueRange"
                        value={formData.revenueRange}
                        onChange={handleChange}
                        className="dh-input"
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="dh-label" htmlFor="inv-years">
                        Years operating
                      </label>
                      <input
                        id="inv-years"
                        name="yearsOperating"
                        value={formData.yearsOperating}
                        onChange={handleChange}
                        placeholder="e.g. 3"
                        className="dh-input"
                      />
                    </div>
                    <div>
                      <label className="dh-label" htmlFor="inv-traffic">
                        Primary traffic source
                      </label>
                      <input
                        id="inv-traffic"
                        name="trafficSource"
                        value={formData.trafficSource}
                        onChange={handleChange}
                        placeholder="e.g. Organic search, direct"
                        className="dh-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="dh-label" htmlFor="inv-reason">
                      Why are you considering a sale?
                    </label>
                    <textarea
                      id="inv-reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={3}
                      className="dh-input resize-none"
                    />
                  </div>

                  <div>
                    <label className="dh-label" htmlFor="inv-message">
                      Anything else?
                    </label>
                    <textarea
                      id="inv-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={2}
                      className="dh-input resize-none"
                    />
                  </div>

                  <button type="submit" className="dh-btn dh-btn-fill inline-flex items-center gap-2">
                    Submit Enquiry <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </DhCard>
            )}
          </Reveal>
        </div>
      </DhSection>
    </>
  );
}
