import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

/**
 * The Studio route requires real env values. If they're missing at build
 * time we still compile (using a placeholder), but visiting /studio
 * without env will surface a clear Sanity error. See sanity/README.md.
 */
export default defineConfig({
  name: "default",
  title: "Lystr",
  basePath: "/studio",
  projectId: projectId ?? "missing-project-id",
  dataset: dataset ?? "production",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Innehåll")
          .items([
            S.listItem()
              .title("Site-inställningar")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("Kalkylator")
              .child(
                S.document()
                  .schemaType("calculatorSettings")
                  .documentId("calculatorSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("article").title("Artiklar"),
            S.documentTypeListItem("pressRelease").title("Pressmeddelanden"),
            S.documentTypeListItem("author").title("Skribenter"),
            S.divider(),
            S.documentTypeListItem("faq").title("Vanliga frågor"),
            S.documentTypeListItem("partner").title("Samarbeten"),
            S.documentTypeListItem("campaign").title("Kampanjer"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
