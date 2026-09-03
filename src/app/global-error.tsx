"use client";

/**
 * Replaces the root layout when it is the layout itself that failed, so this
 * cannot rely on any of the site's fonts, styles or components.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body
        style={{
          background: "#0b0b0c",
          color: "#f2f2f0",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          margin: 0,
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>BBC Bouncers Fitness Gym</h1>
          <p style={{ color: "#8a8a8f", marginTop: "0.75rem" }}>
            The site hit an error. Please call us on{" "}
            <a href="tel:+919494776969" style={{ color: "#ffd100", fontWeight: 700 }}>
              94947 76969
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.75rem",
              borderRadius: 999,
              border: 0,
              background: "linear-gradient(100deg,#E1251B,#F58220 52%,#FDB913)",
              color: "#0b0b0c",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
