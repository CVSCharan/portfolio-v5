import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// ─── Pinned gstatic font URLs (resolved 2026-09-12, version-locked) ──────────
// Satori requires ArrayBuffer — fetched once per cold start, cached in module scope.
// If either URL 404s in future, resolve the new URL from Google Fonts CSS and update here.
const BRICOLAGE_URL =
  "https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5jBNz_19PpbpMXuECpwUxJBOm_OJWiaaD30YfKfjZZoLvfzlyM0.ttf";
const JAKARTA_URL =
  "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.ttf";

// Module-scope cache — reused for all requests on the same Edge instance
let fontCache: { bricolage: ArrayBuffer; jakarta: ArrayBuffer } | null = null;

async function loadFonts() {
  if (fontCache) return fontCache;
  const [bricolage, jakarta] = await Promise.all([
    fetch(BRICOLAGE_URL).then((r) => r.arrayBuffer()),
    fetch(JAKARTA_URL).then((r) => r.arrayBuffer()),
  ]);
  fontCache = { bricolage, jakarta };
  return fontCache;
}

// ─── Canvas sizes ─────────────────────────────────────────────────────────────
const SIZES = {
  default: { width: 1200, height: 630 },
  cinema: { width: 2100, height: 900 },
} as const;

// ─── Design tokens (from docs/design.md) ─────────────────────────────────────
const COLORS = {
  bg: "#09090b",
  fg: "#fafafa",
  muted: "#a1a1aa",
  accent: "#2563eb",
  border: "#27272a",
  badgeBg: "#18181b",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") ?? "Project";
  const desc = searchParams.get("desc") ?? null;
  const tagsRaw = searchParams.get("tags") ?? "";
  const ratio = searchParams.get("ratio") === "cinema" ? "cinema" : "default";

  // Decode individually-encoded tags
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => decodeURIComponent(t)).slice(0, 5)
    : [];

  const { width, height } = SIZES[ratio];
  const fonts = await loadFonts();

  // Split title: first word in accent blue, rest in white
  const titleWords = title.split(" ");
  const firstWord = titleWords[0];
  const restWords = titleWords.slice(1).join(" ");

  // Scale typography proportionally for cinema canvas
  const scale = ratio === "cinema" ? 1.4 : 1;
  const pad = Math.round(80 * scale);
  const metaSize = Math.round(18 * scale);
  const titleSize = Math.round(72 * scale);
  const descSize = Math.round(22 * scale);
  const badgeSize = Math.round(16 * scale);
  const footerSize = Math.round(18 * scale);

  const response = new ImageResponse(
    (
      <div
        style={{
          background: COLORS.bg,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: `${pad}px`,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* ── Meta bar ─────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: `${Math.round(20 * scale)}px`,
            borderBottom: `1px solid ${COLORS.border}`,
            marginBottom: `${Math.round(48 * scale)}px`,
          }}
        >
          <span
            style={{
              fontSize: metaSize,
              color: COLORS.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            Selected Work · 03
          </span>
          <span
            style={{
              fontSize: metaSize,
              color: COLORS.muted,
              letterSpacing: "0.05em",
            }}
          >
            charan-cvs.dev
          </span>
        </div>

        {/* ── Title ────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: titleSize,
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: `${Math.round(28 * scale)}px`,
            gap: `${Math.round(16 * scale)}px`,
          }}
        >
          <span style={{ color: COLORS.accent }}>{firstWord}</span>
          {restWords && (
            <span style={{ color: COLORS.fg }}>{restWords}</span>
          )}
        </div>

        {/* ── Description ──────────────────────────────────── */}
        {desc && (
          <div
            style={{
              fontSize: descSize,
              color: COLORS.muted,
              lineHeight: 1.6,
              marginBottom: `${Math.round(36 * scale)}px`,
              maxWidth: "80%",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {desc}
          </div>
        )}

        {/* ── Tech stack badges ─────────────────────────────── */}
        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: `${Math.round(10 * scale)}px`,
              marginBottom: "auto",
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: COLORS.badgeBg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 9999,
                  padding: `${Math.round(6 * scale)}px ${Math.round(16 * scale)}px`,
                  fontSize: badgeSize,
                  color: COLORS.muted, // NEUTRAL — not accent
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer strip ──────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: `${Math.round(20 * scale)}px`,
            borderTop: `1px solid ${COLORS.border}`,
            marginTop: `${Math.round(32 * scale)}px`,
          }}
        >
          <span
            style={{
              fontSize: footerSize,
              color: COLORS.muted,
              letterSpacing: "0.03em",
            }}
          >
            CVS Charan · Full-Stack Engineer
          </span>
          <span
            style={{
              fontSize: Math.round(20 * scale),
              color: COLORS.muted,
            }}
          >
            ↗
          </span>
        </div>
      </div>
    ),
    {
      width,
      height,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: fonts.bricolage,
          weight: 700,
          style: "normal",
        },
        {
          name: "Plus Jakarta Sans",
          data: fonts.jakarta,
          weight: 400,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );

  return response;
}
