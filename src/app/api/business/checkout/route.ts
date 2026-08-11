import { NextRequest, NextResponse } from "next/server";
import {
  getBusinessOffer,
  type BusinessOfferId,
} from "@/lib/business-offers";

const WHOP_API = "https://api.whop.com/api/v1/checkout_configurations";

export async function POST(req: NextRequest) {
  const apiKey = process.env.WHOP_API_KEY;
  const companyId = process.env.WHOP_COMPANY_ID;

  if (!apiKey || !companyId) {
    return NextResponse.json(
      { error: "Whop is not configured. Set WHOP_API_KEY and WHOP_COMPANY_ID." },
      { status: 503 },
    );
  }

  let body: { offerId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const offerId = body.offerId as BusinessOfferId | undefined;
  const offer = offerId ? getBusinessOffer(offerId) : undefined;
  if (!offer) {
    return NextResponse.json({ error: "Unknown offer." }, { status: 400 });
  }

  // Whop requires redirect_url to be https:// (localhost http is rejected).
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "https://leverbrain.com"
  ).replace(/\/$/, "");
  const redirectUrl = siteUrl.startsWith("https://")
    ? `${siteUrl}/business?paid=${encodeURIComponent(offer.id)}`
    : `https://leverbrain.com/business?paid=${encodeURIComponent(offer.id)}`;

  const payload = {
    plan: {
      company_id: companyId,
      initial_price: offer.chargeUsd,
      plan_type: "one_time" as const,
      currency: "usd",
    },
    metadata: {
      offer: offer.id,
      title: offer.name,
      list_price_usd: String(offer.listPriceUsd),
      charge_usd: String(offer.chargeUsd),
      period: offer.period,
    },
    redirect_url: redirectUrl,
  };

  const res = await fetch(WHOP_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    purchase_url?: string;
    id?: string;
    plan?: { id?: string };
    error?: { message?: string; type?: string };
    message?: string;
  };

  if (!res.ok) {
    const message =
      data.error?.message || data.message || `Whop error (${res.status})`;
    return NextResponse.json({ error: message }, { status: 502 });
  }

  if (!data.purchase_url) {
    return NextResponse.json(
      { error: "Whop did not return a purchase URL." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    purchaseUrl: data.purchase_url,
    checkoutId: data.id,
    planId: data.plan?.id,
    offerId: offer.id,
    chargeUsd: offer.chargeUsd,
    listPriceUsd: offer.listPriceUsd,
  });
}
