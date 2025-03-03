export default {
  name: "seasonalCollection",
  title: "Seasonal Collection",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};
