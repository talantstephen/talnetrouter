// Guards the deduped Antigravity/Gemini OAuth clients: registry transports must derive from shared.js (env-driven).
import { describe, it, expect } from "vitest";

describe("antigravity oauth client (deduped)", () => {
  it("shared source exposes env-driven clientId/clientSecret with placeholder fallback", async () => {
    const { ANTIGRAVITY_OAUTH_CLIENT, GOOGLE_OAUTH_CLIENT } = await import("../../open-sse/providers/shared.js");
    expect(ANTIGRAVITY_OAUTH_CLIENT.clientId).toBeTruthy();
    expect(ANTIGRAVITY_OAUTH_CLIENT.clientSecret).toBeTruthy();
    expect(GOOGLE_OAUTH_CLIENT.clientId).toBeTruthy();
    expect(GOOGLE_OAUTH_CLIENT.clientSecret).toBeTruthy();
    expect(ANTIGRAVITY_OAUTH_CLIENT.clientId).not.toContain("apps.googleusercontent.com");
    expect(GOOGLE_OAUTH_CLIENT.clientId).not.toContain("apps.googleusercontent.com");
    expect(ANTIGRAVITY_OAUTH_CLIENT.clientSecret).not.toContain("GOCSPX");
    expect(GOOGLE_OAUTH_CLIENT.clientSecret).not.toContain("GOCSPX");
  });

  it("registry transports derive clientId/clientSecret from shared.js", async () => {
    const { ANTIGRAVITY_OAUTH_CLIENT, GOOGLE_OAUTH_CLIENT } = await import("../../open-sse/providers/shared.js");
    const ag = (await import("../../open-sse/providers/registry/antigravity.js")).default;
    expect(ag.transport.clientId).toBe(ANTIGRAVITY_OAUTH_CLIENT.clientId);
    expect(ag.transport.clientSecret).toBe(ANTIGRAVITY_OAUTH_CLIENT.clientSecret);
    const gemini = (await import("../../open-sse/providers/registry/gemini.js")).default;
    const gc = (await import("../../open-sse/providers/registry/gemini-cli.js")).default;
    expect(gemini.transport.clientId).toBe(GOOGLE_OAUTH_CLIENT.clientId);
    expect(gemini.transport.clientSecret).toBe(GOOGLE_OAUTH_CLIENT.clientSecret);
    expect(gc.transport.clientId).toBe(GOOGLE_OAUTH_CLIENT.clientId);
    expect(gc.transport.clientSecret).toBe(GOOGLE_OAUTH_CLIENT.clientSecret);
  });

  // Guard: oauth.js must spread shared clients + derive from registry (PROVIDER_OAUTH).
  it("src oauth.js imports shared client + keeps full shape", async () => {
    const { readFileSync } = await import("node:fs");
    const { fileURLToPath } = await import("node:url");
    const { dirname, join } = await import("node:path");
    const here = dirname(fileURLToPath(import.meta.url));
    const src = readFileSync(join(here, "../../src/lib/oauth/constants/oauth.js"), "utf8");
    expect(src).toContain('import { ANTIGRAVITY_OAUTH_CLIENT, GOOGLE_OAUTH_CLIENT } from "open-sse/providers/shared.js"');
    expect(src).toContain("...ANTIGRAVITY_OAUTH_CLIENT");
    expect(src).toContain("...GOOGLE_OAUTH_CLIENT");
    expect(src).toContain('PROVIDER_OAUTH["antigravity"]');
    expect(src).toContain('PROVIDER_OAUTH["gemini-cli"]');
    expect(src).not.toContain("GOCSPX");
    expect(src).not.toContain("apps.googleusercontent.com");
  });
});