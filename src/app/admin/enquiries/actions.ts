"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE = "bbc_admin";

function token(password: string) {
  return createHash("sha256").update(`bbc:${password}`).digest("hex");
}

export async function isAuthed() {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const got = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!got) return false;
  const a = Buffer.from(got);
  const b = Buffer.from(token(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return "ADMIN_PASSWORD is not configured on the server.";

  const given = String(formData.get("password") ?? "");
  const a = Buffer.from(token(given));
  const b = Buffer.from(token(expected));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return "Incorrect password.";

  (await cookies()).set(ADMIN_COOKIE, token(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin/enquiries");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/enquiries");
}
