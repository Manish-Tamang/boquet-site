import type { StructureResolver } from "sanity/structure";
import { FlowerIcon, Tag, Leaf, Cog, LayoutDashboard } from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Bouquet Shop Content")
    .items([
      S.listItem()
        .title("Bouquets")
        .icon(FlowerIcon)
        .child(S.documentTypeList("bouquet").title("Bouquets")),
      S.listItem()
        .title("Bouquet Categories")
        .icon(Tag)
        .child(
          S.documentTypeList("bouquetCategory").title("Bouquet Categories")
        ),
      S.listItem()
        .title("Seasonal Collections")
        .icon(Leaf)
        .child(
          S.documentTypeList("seasonalCollection").title("Seasonal Collections")
        ),
      S.listItem()
        .title("Site Settings")
        .icon(Cog)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Bouquet Hero Section")
        .icon(LayoutDashboard)
        .child(
          S.document()
            .schemaType("bouquetHeroSection")
            .documentId("bouquetHeroSection")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "bouquet",
            "bouquetCategory",
            "seasonalCollection",
            "siteSettings",
            "bouquetHeroSection",
          ].includes(listItem.getId() ?? "")
      ),
    ]);
