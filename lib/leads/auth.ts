export const LEADS_SESSION_COOKIE = "leads_session";

// Web Crypto (works in both the Edge middleware runtime and Node Server Actions).
async function hmac(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Derives the expected session-cookie value from the shared dashboard password,
// so the cookie never carries the plaintext password itself.
export async function computeLeadsSessionToken(password: string): Promise<string> {
  return hmac(password, "leads-dashboard-session-v1");
}

export async function isValidLeadsSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const password = process.env.LEADS_DASHBOARD_PASSWORD;
  if (!password) return false;
  const expected = await computeLeadsSessionToken(password);
  return token === expected;
}
