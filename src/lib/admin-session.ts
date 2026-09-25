const SESSION_COOKIE_NAME = "httpier_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type AdminSessionPayload = {
  role: "admin";
  expiresAt: number;
};

function encodeBase64Url(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function getSigningKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    return null;
  }

  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createAdminSessionToken() {
  const key = await getSigningKey();

  if (!key) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }

  const payload: AdminSessionPayload = {
    role: "admin",
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(encodedPayload));

  return `${encodedPayload}.${encodeBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;

  const [encodedPayload, encodedSignature, extra] = token.split(".");
  if (!encodedPayload || !encodedSignature || extra) return false;

  try {
    const key = await getSigningKey();
    if (!key) return false;

    const signatureIsValid = await crypto.subtle.verify(
      "HMAC",
      key,
      decodeBase64Url(encodedSignature),
      new TextEncoder().encode(encodedPayload),
    );

    if (!signatureIsValid) return false;

    const payload = JSON.parse(
      new TextDecoder().decode(decodeBase64Url(encodedPayload)),
    ) as AdminSessionPayload;

    return payload.role === "admin" && payload.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS };
