import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "Man and Van Club";
  const subtitle = searchParams.get("subtitle") || "Free Move Requests | UK-Wide Verified Movers";
  const location = searchParams.get("location") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          padding: "60px 80px",
        }}
      >
        {location && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(249,115,22,0.15)",
              border: "1px solid rgba(249,115,22,0.3)",
              borderRadius: "999px",
              padding: "8px 20px",
              marginBottom: "24px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ color: "#F97316", fontSize: "13px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {location}
            </span>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: title.length > 40 ? "48px" : "64px",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "10px 20px" }}>
            <span style={{ color: "#F97316", fontSize: "14px", fontWeight: 900 }}>✓</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 700 }}>Free To Submit</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "10px 20px" }}>
            <span style={{ color: "#F97316", fontSize: "14px", fontWeight: 900 }}>✓</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 700 }}>Verified Movers</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "10px 20px" }}>
            <span style={{ color: "#F97316", fontSize: "14px", fontWeight: 900 }}>✓</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", fontWeight: 700 }}>Details Protected</span>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "40px", left: "80px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#F97316", fontSize: "16px", fontWeight: 900, letterSpacing: "0.05em" }}>MAN AND VAN CLUB</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>manandvanclub.co.uk</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
