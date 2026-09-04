import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — gym in Akkarampalli, Tirupati`;

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
          background: "#0f1011",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: 200,
            width: 900,
            height: 500,
            background: "radial-gradient(closest-side, #e5b85c, transparent)",
            opacity: 0.14,
          }}
        />
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#8b9096", textTransform: "uppercase" }}>
          Akkarampalli · Tirupati
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 116, fontWeight: 800, color: "#e8e4dc", lineHeight: 1 }}>
          BOUNCERS
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 116, fontWeight: 800, lineHeight: 1 }}>
          <span style={{ color: "#e5b85c" }}>FITNESS</span>
          <span style={{ color: "#e5b85c" }}>GYM</span>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 30, color: "#8b9096" }}>
          {`${site.rating.value} / 5 rating · ${site.rating.count} reviews · ${site.phoneDisplay}`}
        </div>
      </div>
    ),
    size,
  );
}
