import { defineType, defineField } from "sanity";
import { ShoppingBag } from "lucide-react";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: ShoppingBag,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Variant Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "inStock",
              title: "In Stock",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "name",
              inStock: "inStock",
            },
            prepare(selection) {
              const { title, inStock } = selection;
              return {
                title: title,
                subtitle: inStock ? "In Stock" : "Out of Stock",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Size Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "inStock",
              title: "In Stock",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: "name",
              inStock: "inStock",
            },
            prepare(selection) {
              const { title, inStock } = selection;
              return {
                title: title,
                subtitle: inStock ? "In Stock" : "Out of Stock",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      categoryName: "category.name",
      collectionName: "collection.name",
      price: "price",
    },
    prepare(selection) {
      const { title, media, categoryName, collectionName, price } = selection;
      return {
        title: title,
        subtitle: `${categoryName ? categoryName + " - " : ""}${collectionName ? collectionName : ""} - ₹${price}`,
        media: media,
      };
    },
  },
});
