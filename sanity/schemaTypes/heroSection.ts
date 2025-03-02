import { defineType, defineField } from "sanity";
import { ImageIcon, LayoutDashboard } from "lucide-react";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  icon: LayoutDashboard,
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "ctaText",
              title: "CTA Text",
              type: "string",
            }),
            defineField({
              name: "ctaLink",
              title: "CTA Link",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title,
                media: media,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Hero Section",
      };
    },
  },
});
