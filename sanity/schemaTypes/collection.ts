import { defineType, defineField } from "sanity";
import { PackageIcon } from "lucide-react";

export default defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
