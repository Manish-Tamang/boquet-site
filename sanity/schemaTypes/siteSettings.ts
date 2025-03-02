// sanity/schemaTypes/siteSettings.ts
import { defineType, defineField } from "sanity";
import { Cog } from "lucide-react";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Cog,
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
