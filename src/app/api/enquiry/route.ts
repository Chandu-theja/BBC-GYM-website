import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import { getSql } from "@/lib/db";
import { allow } from "@/lib/rate-limit";

/**
 * Records an enquiry.
 *
 * The visitor's actual handoff is the WhatsApp link, which fires from their own
 * click. This runs alongside it purely so the gym keeps a record of the lead
 * even if the visitor never presses send in WhatsApp. It must never block or
 * break that handoff, so every failure path still returns 200.
 */
export async function POST(request: Request) {
  try {
    const parsed = enquirySchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ stored: false, reason: "invalid" });

    // A filled honeypot fails schema validation above, so anything reaching
    // here came from a real form.
    const { name, phone, program, goal, message } = parsed.data;

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!allow(ip)) return NextResponse.json({ stored: false, reason: "rate-limited" });

    const sql = getSql();
    if (!sql) return NextResponse.json({ stored: false, reason: "no-database" });

    await sql`
      insert into enquiries (name, phone, program, goal, message)
      values (${name}, ${phone}, ${program || null}, ${goal || null}, ${message || null})
    `;
    return NextResponse.json({ stored: true });
  } catch (error) {
    console.error("[enquiry] failed to record", error);
    return NextResponse.json({ stored: false, reason: "error" });
  }
}
