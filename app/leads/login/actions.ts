"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LEADS_SESSION_COOKIE, computeLeadsSessionToken } from "@/lib/leads/auth";

export async function loginToLeadsDashboard(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/leads");
  const expected = process.env.LEADS_DASHBOARD_PASSWORD;

  if (!expected || password !== expected) {
    redirect(`/leads/login?error=1&from=${encodeURIComponent(from)}`);
  }

  const token = await computeLeadsSessionToken(password);
  const cookieStore = await cookies();
  cookieStore.set(LEADS_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(from.startsWith("/leads") ? from : "/leads");
}

export async function logoutFromLeadsDashboard() {
  const cookieStore = await cookies();
  cookieStore.delete(LEADS_SESSION_COOKIE);
  redirect("/leads/login");
}
