"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isConfigured } from "../../../../sanity/env";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!isConfigured) return <SetupNeeded />;
  return <NextStudio config={config} />;
}

function SetupNeeded() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#1c1c1c",
      }}
    >
      <div style={{ maxWidth: 640 }}>
        <p
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#8b8b92",
            margin: 0,
          }}
        >
          Sanity Studio
        </p>
        <h1 style={{ fontSize: 32, fontWeight: 600, margin: "8px 0 16px" }}>
          Sanity är inte konfigurerad än
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#3a3a40" }}>
          För att starta Studio behöver miljövariablerna{" "}
          <code
            style={{
              background: "#ececec",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          och{" "}
          <code
            style={{
              background: "#ececec",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            NEXT_PUBLIC_SANITY_DATASET
          </code>{" "}
          vara satta i <code>web/.env.local</code>.
        </p>
        <ol style={{ paddingLeft: 20, lineHeight: 1.8, fontSize: 15 }}>
          <li>
            Skapa projektet på{" "}
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#e6414f" }}
            >
              sanity.io/manage
            </a>{" "}
            (logga in som Chimichurri; skapa nytt projekt; dataset{" "}
            <code>production</code>).
          </li>
          <li>
            Kopiera projekt-ID och klistra in det i{" "}
            <code>web/.env.local</code>.
          </li>
          <li>
            Lägg till <code>http://localhost:3000</code> som CORS-origin i
            projektets API-inställningar.
          </li>
          <li>Starta om dev-servern och ladda om denna sida.</li>
        </ol>
        <p style={{ fontSize: 13, color: "#8b8b92", marginTop: 24 }}>
          Full guide i <code>web/sanity/README.md</code>.
        </p>
      </div>
    </main>
  );
}
