export default {
  name: "bouquetHeroSection",
  title: "Bouquet Hero Section",
  type: "document",
  fields: [
    {
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            },
            {
              name: "ctaText",
              title: "CTA Text",
              type: "string",
            },
            {
              name: "ctaLink",
              title: "CTA Link",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
