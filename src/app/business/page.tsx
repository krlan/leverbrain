"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Layers,
  ListChecks,
  Loader2,
  Search,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import {
  BUSINESS_OFFERS,
  type BusinessOfferId,
} from "@/lib/business-offers";

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "We sit with the people who do the work and map how it actually runs: tools, handoffs, exceptions, and unwritten rules. The documented process is only a starting point.",
    out: "Workflow map · skill list · ROI estimate",
  },
  {
    n: "02",
    title: "Encode skills",
    body: "We turn that knowledge into versioned SKILL.md packs with clear tool boundaries, evals, and human gates. Your agents load a real procedure instead of guessing from a role prompt.",
    out: "Skill pack · eval set · ownership map",
  },
  {
    n: "03",
    title: "Ship in production",
    body: "We connect those skills to the systems you already use. APIs first. No forced migration. Skills live in a private registry or package your agents and CLI can call.",
    out: "Live agent(s) · registry · audit log",
  },
  {
    n: "04",
    title: "Operate and improve",
    body: "We start in shadow mode, then supervised production. Corrections improve the system. You get metrics on cycle time, error rate, and hours returned to your team.",
    out: "Playbook · metrics · owner training",
  },
];

const enemies = [
  {
    title: "Prompt wrappers",
    body: "Telling an agent it is world-class does not give it expertise. Load a verified procedure instead.",
  },
  {
    title: "Copilots that sit unused",
    body: "Another app people have to open is another bottleneck. Work should move in the tools you already use.",
  },
  {
    title: "Generic AI products",
    body: "Software built for everyone does not know your exception rules. The glue between systems is where value lives.",
  },
  {
    title: "Agent sprawl",
    body: "Personal agents with no shared registry, no evals, and no owner become tech debt.",
  },
];

const deliverables = [
  "Private skill registry or packaged skill library",
  "Production agents for one or two high-value workflows",
  "Eval suite and decision audit trail",
  "Permissions, guardrails, and human approval gates",
  "Training so process owners can update skills without a rebuild",
  "Optional public skills when you want to show the work",
];

const engagements = [
  {
    name: "Skill Sprint",
    time: "2–3 weeks",
    outcome: "Audit, three to five production skills, and an operating playbook.",
    best: "Teams that need procedures encoded quickly",
  },
  {
    name: "Workflow Implementation",
    time: "6–10 weeks",
    outcome: "One full agent workflow running in production.",
    best: "A clear, high-volume process with a real owner",
  },
  {
    name: "Agent OS Install",
    time: "10–16 weeks",
    outcome: "Internal registry, two or three workflows, and a clean handoff.",
    best: "Companies building agent infrastructure for real",
  },
  {
    name: "Optimization Retainer",
    time: "Monthly",
    outcome: "New skills, eval tuning, model routing, and expansion.",
    best: "After the first production win",
  },
];

const principles = [
  "Audit before any model call",
  "Skills hold procedure, not vibes",
  "Prefer plain code; use the model only where judgment is required",
  "One registry spine. No personal agent sprawl.",
  "Escalate with full context, not another dashboard",
  "Measure path and outcome. Ship the first workflow in under 90 days.",
];

const faqs = [
  {
    q: "Do you do free scoping calls?",
    a: "No. Free calls turn into unpaid consulting. The default entry is a paid Workflow Diagnostic. If you want a short filter first, book a Fit Call.",
  },
  {
    q: "What is the Workflow Diagnostic?",
    a: "A $1,500 paid brief: as-is workflow map, skill candidates, code vs skill vs human split, ROI estimate, and a fixed build quote. If you start a Skill Sprint within 30 days, the Diagnostic fee credits in full.",
  },
  {
    q: "How is this different from the marketplace?",
    a: "The marketplace is self-serve skills for builders and agents. Business is custom work: we extract your expertise, build skills for your process, and wire production systems.",
  },
  {
    q: "Do we have to leave our current tools?",
    a: "No. We build on the systems you already run. Skills and agents sit on top of existing tools and data.",
  },
  {
    q: "How much time does our team need?",
    a: "Usually 20–40 hours total across process owners for interviews, reviews, and validation. Not a full-time reassignment.",
  },
  {
    q: "Who owns the skills and code?",
    a: "You own the skills, integrations, and artifacts from the engagement. We keep the right to reuse sanitized patterns, never your confidential process.",
  },
  {
    q: "How do payments work?",
    a: "Checkout runs through Whop. Fit Call is charged in full. Larger offers take a booking deposit on Whop when required by payment limits; the balance is on the SOW or invoice. You get a confirmation email after payment.",
  },
  {
    q: "Who is a good fit?",
    a: "AI product teams, agencies with repeatable client work, ops-heavy companies, and teams tired of copilots with no ROI. A high-volume process with a real owner beats a vague AI initiative.",
  },
];

export default function BusinessPage() {
  const [paidOfferId, setPaidOfferId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<BusinessOfferId | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const paid = new URLSearchParams(window.location.search).get("paid");
    setPaidOfferId(paid);
  }, []);

  const paidOfferName = useMemo(() => {
    if (!paidOfferId) return null;
    return BUSINESS_OFFERS.find((o) => o.id === paidOfferId)?.name ?? "your offer";
  }, [paidOfferId]);

  const startCheckout = useCallback(async (offerId: BusinessOfferId) => {
    setCheckoutError(null);
    setLoadingId(offerId);
    try {
      const res = await fetch("/api/business/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId }),
      });
      const data = (await res.json()) as { purchaseUrl?: string; error?: string };
      if (!res.ok || !data.purchaseUrl) {
        throw new Error(data.error || "Checkout failed.");
      }
      window.location.href = data.purchaseUrl;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Checkout failed.");
      setLoadingId(null);
    }
  }, []);

  return (
    <div className="biz-page">
      {paidOfferName && (
        <div className="biz-paid-banner" role="status">
          <div className="container">
            <p>
              Payment received for <strong>{paidOfferName}</strong>. We will email you
              within one business day to schedule. Questions:{" "}
              <a href="mailto:hi@leverbrain.com">hi@leverbrain.com</a>
            </p>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="biz-hero">
        <div className="container">
          <div className="biz-hero-grid">
            <div className="biz-hero-copy">
              <h1 className="biz-title">
                Custom AI implementations
                <span className="biz-title-em"> for real workflows</span>
              </h1>
              <p className="biz-lead">
                We turn how your best people work into skills your agents can load,
                then put those agents into production on the systems you already use.
              </p>
              <div className="biz-hero-actions">
                <a href="#offers" className="btn btn-primary btn-lg">
                  See offers
                  <ArrowRight size={16} />
                </a>
                <a href="#how" className="btn btn-secondary btn-lg">
                  How it works
                </a>
              </div>
              <p className="biz-hero-note">
                No free scoping · First production workflow in weeks
              </p>
            </div>

            <aside className="biz-hero-panel" aria-label="How delivery works">
              <div className="biz-hero-panel-bar">
                <span className="biz-hero-panel-dot" />
                <span className="biz-hero-panel-dot" />
                <span className="biz-hero-panel-dot" />
                <span className="biz-hero-panel-label">Delivery</span>
              </div>
              <div className="biz-hero-panel-body">
                <div className="biz-spine-row">
                  <Search size={14} />
                  <span>Map the real workflow</span>
                </div>
                <div className="biz-spine-row">
                  <BookOpen size={14} />
                  <span>Encode it as skills</span>
                </div>
                <div className="biz-spine-row">
                  <Terminal size={14} />
                  <span>Wire CLI, agents, tools</span>
                </div>
                <div className="biz-spine-row">
                  <Workflow size={14} />
                  <span>Ship, measure, improve</span>
                </div>
                <div className="biz-spine-divider" />
                <p className="biz-spine-quote">
                  Agents should load a procedure written by someone who has done
                  the work, not invent one from a prompt.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Dual product ── */}
      <section className="biz-dual">
        <div className="container">
          <div className="biz-dual-grid">
            <div className="biz-dual-card">
              <div className="biz-dual-icon">
                <Zap size={18} />
              </div>
              <h2>Marketplace</h2>
              <p>
                Self-serve skills, strategies, and blueprints. Search, buy, run{" "}
                <code>leverbrain get</code>, and load them into your agent runtime.
              </p>
              <Link href="/skills" className="biz-inline-link">
                Browse skills <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="biz-dual-card biz-dual-card--active">
              <div className="biz-dual-icon">
                <Layers size={18} />
              </div>
              <h2>Business</h2>
              <p>
                Custom implementations. We extract your expertise, build skill systems,
                and deploy production agents on your stack.
              </p>
              <a href="#offers" className="biz-inline-link">
                Paid offers <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="biz-section" id="problem">
        <div className="container">
          <header className="biz-section-head">
            <p className="biz-eyebrow">The problem</p>
            <h2>Most AI projects never leave the pilot stage</h2>
            <p className="biz-section-sub">
              The models are good enough. Process is the hard part. Generic tools fail
              because your glue work is specific, and a role prompt is not a procedure.
            </p>
          </header>
          <div className="biz-enemy-grid">
            {enemies.map((e) => (
              <article key={e.title} className="biz-enemy-card">
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How ── */}
      <section className="biz-section" id="how">
        <div className="container">
          <header className="biz-section-head">
            <p className="biz-eyebrow">How we work</p>
            <h2>Audit, encode, ship, improve</h2>
            <p className="biz-section-sub">
              Skills hold the knowledge. The registry is the spine. Evals prove it works.
            </p>
          </header>
          <ol className="biz-steps">
            {steps.map((s) => (
              <li key={s.n} className="biz-step">
                <span className="biz-step-n">{s.n}</span>
                <div className="biz-step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <p className="biz-step-out">{s.out}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="biz-section" id="deliverables">
        <div className="container">
          <div className="biz-split">
            <header className="biz-section-head biz-section-head--left">
              <p className="biz-eyebrow">What you get</p>
              <h2>A system that keeps working after we leave</h2>
              <p className="biz-section-sub">
                Every engagement ends with owned skills, a path to production, and
                process owners who can update the system without a rewrite.
              </p>
            </header>
            <ul className="biz-check-list">
              {deliverables.map((d) => (
                <li key={d}>
                  <Check size={16} className="biz-check-icon" aria-hidden />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Engagements (shapes only — prices live in #offers) ── */}
      <section className="biz-section" id="engagements">
        <div className="container">
          <header className="biz-section-head">
            <p className="biz-eyebrow">Engagements</p>
            <h2>Start with the smallest unit that ships</h2>
            <p className="biz-section-sub">
              Each shape has a clear definition of done. Buy entry at the bottom of this page.
            </p>
          </header>
          <div className="biz-eng-grid">
            {engagements.map((eng) => (
              <article key={eng.name} className="biz-eng-card">
                <div className="biz-eng-top">
                  <h3>{eng.name}</h3>
                  <span className="biz-eng-time">{eng.time}</span>
                </div>
                <p className="biz-eng-outcome">{eng.outcome}</p>
                <p className="biz-eng-best">Best for: {eng.best}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="biz-section" id="principles">
        <div className="container">
          <header className="biz-section-head">
            <p className="biz-eyebrow">How we build</p>
            <h2>Rules we will not break</h2>
          </header>
          <ul className="biz-principles">
            {principles.map((p, i) => (
              <li key={p}>
                <span className="biz-principles-n">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fit ── */}
      <section className="biz-section" id="fit">
        <div className="container">
          <div className="biz-fit-grid">
            <div>
              <p className="biz-eyebrow">Fit</p>
              <h2>Who this is for</h2>
              <ul className="biz-fit-list">
                <li>AI product companies whose agents need real domain procedure</li>
                <li>Agencies turning client work into reusable skill systems</li>
                <li>Ops and product teams carrying too much tribal knowledge</li>
                <li>Companies that tried copilots and still have the same cycle times</li>
              </ul>
            </div>
            <div className="biz-fit-card">
              <ListChecks size={20} className="biz-fit-card-icon" />
              <h3>What we need from you</h3>
              <ul>
                <li>One high-volume, painful workflow</li>
                <li>A process owner who does the work</li>
                <li>Read access to the systems of record</li>
                <li>Willingness to measure before and after</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="biz-section" id="faq">
        <div className="container">
          <header className="biz-section-head">
            <p className="biz-eyebrow">FAQ</p>
            <h2>Common questions</h2>
          </header>
          <div className="biz-faq">
            {faqs.map((f) => (
              <details key={f.q} className="biz-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Paid offers (replaces free "Next step") ── */}
      <section className="biz-offers" id="offers">
        <div className="container">
          <header className="biz-section-head">
            <p className="biz-eyebrow">Offers</p>
            <h2>Choose how to begin</h2>
          </header>

          {checkoutError && (
            <p className="biz-checkout-error" role="alert">
              {checkoutError}
            </p>
          )}

          <div className="biz-offers-grid">
            {BUSINESS_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className={`biz-offer-card${offer.featured ? " biz-offer-card--featured" : ""}`}
              >
                {offer.badge && <span className="biz-offer-badge">{offer.badge}</span>}

                <header className="biz-offer-top">
                  <h3>{offer.name}</h3>
                  <span className="biz-offer-duration">
                    <span className="biz-offer-duration-dot" aria-hidden />
                    {offer.duration}
                  </span>
                </header>

                <p className="biz-offer-price">{offer.priceLabel}</p>
                <p className="biz-offer-blurb">{offer.blurb}</p>

                <ul className="biz-offer-includes">
                  {offer.includes.map((item) => (
                    <li key={item}>
                      <Check size={14} aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <footer className="biz-offer-foot">
                  <p
                    className={`biz-offer-deposit${offer.depositNote ? "" : " biz-offer-deposit--empty"}`}
                  >
                    {offer.depositNote || "\u00a0"}
                  </p>
                  <button
                    type="button"
                    className={`btn ${offer.featured ? "btn-primary" : "btn-secondary"} biz-offer-cta`}
                    disabled={loadingId !== null}
                    onClick={() => startCheckout(offer.id)}
                  >
                    {loadingId === offer.id ? (
                      <>
                        <Loader2 size={16} className="biz-spin" />
                        Redirecting…
                      </>
                    ) : (
                      <>
                        {offer.cta}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
