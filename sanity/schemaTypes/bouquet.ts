export default {
  name: "bouquet",
  title: "Bouquet",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "arrangementDetails",
      title: "Arrangement Details",
      type: "text",
    },
    {
      name: "bouquetCategory",
      title: "Bouquet Category",
      type: "reference",
      to: [{ type: "bouquetCategory" }],
    },
    {
      name: "seasonalCollection",
      title: "Seasonal Collection",
      type: "reference",
      to: [{ type: "seasonalCollection" }],
    },
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
  ],
};
