/**
 * LeverBrain Business offers — display pricing + Whop charge rules.
 * Whop company currently rejects single charges over $2,500; high-ticket
 * offers take a booking deposit on Whop and invoice the balance.
 */

export type BusinessOfferId =
  | "fit_call"
  | "diagnostic"
  | "skill_sprint"
  | "workflow_implementation"
  | "retainer";

export type BusinessOffer = {
  id: BusinessOfferId;
  name: string;
  /** Display price label, e.g. "$4,000" */
  priceLabel: string;
  /** Numeric list price in USD (monthly for retainer) */
  listPriceUsd: number;
  /** Amount charged on Whop now (≤ WHOP_MAX) */
  chargeUsd: number;
  period: "one_time" | "month";
  duration: string;
  blurb: string;
  includes: string[];
  cta: string;
  /** When charge < list, explain deposit */
  depositNote?: string;
  featured?: boolean;
  badge?: string;
};

/** Whop account hard cap for a single purchase (as of integration). */
export const WHOP_MAX_SINGLE_CHARGE_USD = 2500;

export const BUSINESS_OFFERS: BusinessOffer[] = [
  {
    id: "fit_call",
    name: "Fit Call",
    priceLabel: "$250",
    listPriceUsd: 250,
    chargeUsd: 250,
    period: "one_time",
    duration: "30 min",
    blurb: "A short paid filter. Clear yes/no, recommended shape, budget band.",
    includes: [
      "Fit assessment",
      "Recommended engagement",
      "Rough timeline and budget band",
      "Clear next-step recommendation",
    ],
    cta: "Book Fit Call",
  },
  {
    id: "diagnostic",
    name: "Workflow Diagnostic",
    priceLabel: "$1,500",
    listPriceUsd: 1500,
    chargeUsd: 1500,
    period: "one_time",
    duration: "1–2 weeks",
    blurb:
      "Map one real process, list skills to build, ROI estimate, fixed build quote. Credits in full to a Sprint within 30 days.",
    includes: [
      "As-is workflow map",
      "Skill candidate list",
      "Code vs skill vs human split",
      "Fixed-price build quote",
    ],
    cta: "Start Diagnostic",
    featured: true,
  },
  {
    id: "skill_sprint",
    name: "Skill Sprint",
    priceLabel: "$6,000",
    listPriceUsd: 6000,
    chargeUsd: 2500,
    period: "one_time",
    duration: "2–3 weeks",
    blurb: "Audit, three to five production skills, evals, and an operating playbook you own.",
    includes: [
      "Expertise audit",
      "3–5 production skills",
      "Eval pack + playbook",
      "Handover session",
    ],
    cta: "Book Sprint deposit",
    depositNote: "$2,500 deposit to book · remaining per SOW (50% kickoff / 50% delivery)",
  },
  {
    id: "workflow_implementation",
    name: "Workflow Implementation",
    priceLabel: "$25,000",
    listPriceUsd: 25000,
    chargeUsd: 2500,
    period: "one_time",
    duration: "6–10 weeks",
    blurb: "One end-to-end agentic workflow live in production on your stack.",
    includes: [
      "Production agent for one workflow",
      "Registry + audit trail",
      "HITL gates and evals",
      "Owner training",
    ],
    cta: "Book deposit",
    depositNote: "$2,500 deposit to book · balance on SOW schedule",
  },
  {
    id: "retainer",
    name: "Optimization Retainer",
    priceLabel: "$4,000/mo",
    listPriceUsd: 4000,
    chargeUsd: 2500,
    period: "month",
    duration: "Monthly",
    blurb: "After the first production win: new skills, eval tuning, model routing, expansion.",
    includes: [
      "Ongoing skill work",
      "Eval and model tuning",
      "Priority support",
      "Monthly expansion plan",
    ],
    cta: "Start retainer",
    depositNote: "$2,500 to start · monthly rate $4,000 invoiced after kickoff",
  },
];

export function getBusinessOffer(id: string): BusinessOffer | undefined {
  return BUSINESS_OFFERS.find((o) => o.id === id);
}
