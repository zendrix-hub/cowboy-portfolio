import { ImageResponse } from "next/og";
import { social } from "@/data/social";

export const runtime = "nodejs";
export const alt = "Zendrix Riva — Software / Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(6, 182, 212, 0.18) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.14) 0%, transparent 55%)",
          padding: "70px 80px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#f4f4f5",
          position: "relative",
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Monogram Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0891b2, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "900",
                fontFamily: "monospace",
                boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {">ZR"}
            </div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#f4f4f5",
                letterSpacing: "-0.02em",
              }}
            >
              {social.displayName}
            </span>
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(6, 182, 212, 0.12)",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              color: "#22d3ee",
              fontSize: "15px",
              fontFamily: "monospace",
              fontWeight: "600",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#06b6d4",
              }}
            />
            <span>Available for Opportunities</span>
          </div>
        </div>

        {/* Main Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "950px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: "#38bdf8",
              fontFamily: "monospace",
              fontWeight: "600",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Software / Full-Stack Developer
          </div>

          <div
            style={{
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: 1.15,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Building offline-first mobile systems & modern web applications.
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              marginTop: "6px",
            }}
          >
            Focused on Kotlin, Jetpack Compose, Clean Architecture, and full-stack development with Next.js, Spring Boot, and Python.
          </div>
        </div>

        {/* Bottom Tech & Social Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          {/* Tech Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {[
              "Kotlin",
              "Jetpack Compose",
              "Next.js",
              "TypeScript",
              "Spring Boot",
              "Python",
            ].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(39, 39, 42, 0.8)",
                  border: "1px solid rgba(63, 63, 70, 0.8)",
                  color: "#e4e4e7",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  fontWeight: "500",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* GitHub handle */}
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#06b6d4",
              fontWeight: "600",
            }}
          >
            github.com/zendrix-hub
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
