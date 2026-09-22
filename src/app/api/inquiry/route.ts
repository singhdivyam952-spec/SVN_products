import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createInquiry, getSettings } from "@/lib/store";

type InquiryBody = {
  name?: string;
  business?: string;
  phone?: string;
  whatsapp?: string;
  city?: string;
  quantity?: string;
  message?: string;
  interests?: string[];
};

function required(value: string | undefined, label: string) {
  if (!value || !value.trim()) {
    throw new Error(`${label} is required`);
  }
  return value.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryBody;
    const settings = await getSettings();

    const name = required(body.name, "Name");
    const business = required(body.business, "Business");
    const phone = required(body.phone, "Phone");
    const city = required(body.city, "City");
    const message = required(body.message, "Message");
    const whatsapp = (body.whatsapp || "").trim();
    const quantity = (body.quantity || "").trim();
    const interests = Array.isArray(body.interests) ? body.interests : [];

    await createInquiry({
      name,
      business,
      phone,
      whatsapp,
      city,
      quantity,
      message,
      interests,
    });

    const to = process.env.INQUIRY_TO_EMAIL || settings.email;
    const from =
      process.env.INQUIRY_FROM_EMAIL ||
      "SVN PRODUCT Website <onboarding@resend.dev>";

    const subject = `Wholesale inquiry from ${name} (${business})`;
    const text = [
      `New wholesale inquiry from the LION / SVN PRODUCT website`,
      ``,
      `Name: ${name}`,
      `Business: ${business}`,
      `Phone: ${phone}`,
      `WhatsApp: ${whatsapp || "—"}`,
      `City: ${city}`,
      `Quantity estimate: ${quantity || "—"}`,
      `Products of interest: ${interests.length ? interests.join(", ") : "—"}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.info("[inquiry:dev-fallback]", { to, subject, text });
      return NextResponse.json({
        ok: true,
        mode: "dev-fallback",
        message:
          "Inquiry saved in admin. Set RESEND_API_KEY to also deliver email.",
      });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        {
          ok: true,
          warning: "Saved in admin, but email delivery failed",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to process inquiry";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
