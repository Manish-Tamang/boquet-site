import type { StructureResolver } from "sanity/structure";
import {
  PackageIcon,
  ShoppingBag,
  Tag,
  Cog,
  LayoutDashboard,
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .icon(ShoppingBag)
        .child(S.documentTypeList("product").title("Products")),
      S.listItem()
        .title("Categories")
        .icon(Tag)
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Collections")
        .icon(PackageIcon)
        .child(S.documentTypeList("collection").title("Collections")),
      S.listItem()
        .title("Site Settings")
        .icon(Cog)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Hero Section")
        .icon(LayoutDashboard)
        .child(
          S.document().schemaType("heroSection").documentId("heroSection")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "product",
            "category",
            "collection",
            "siteSettings",
            "heroSection",
          ].includes(listItem.getId() ?? "")
      ),
    ]);
