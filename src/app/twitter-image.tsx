import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const alt = `${siteConfig.name} - ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(37,99,235,0.16), transparent 55%), radial-gradient(circle at 85% 85%, rgba(139,92,246,0.16), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background:
                "linear-gradient(100deg, #2563eb 0%, #06b6d4 50%, #8b5cf6 100%)",
            }}
          />
          <span style={{ fontSize: 28, color: "#384156", fontWeight: 600 }}>
            HTTPier
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#0a0e1a",
            lineHeight: 1.05,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>We build</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(100deg, #2563eb 0%, #06b6d4 48%, #8b5cf6 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            the better web.
          </span>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: "#384156",
          }}
        >
          High-performance websites, web apps, SaaS &amp; e-commerce.
        </div>
      </div>
    ),
    { ...size }
  );
}
