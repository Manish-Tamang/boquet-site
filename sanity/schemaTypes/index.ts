import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import category from "./category";
import collection from "./collection";
import siteSettings from "./siteSettings";
import heroSection from "./heroSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, collection, siteSettings, heroSection],
};
