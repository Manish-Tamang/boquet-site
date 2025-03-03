import { type SchemaTypeDefinition } from "sanity";
import bouquet from "./bouquet";
import bouquetCategory from "./bouquetCategory";
import seasonalCollection from "./seasonalCollection";
import siteSettings from "./siteSettings";
import bouquetHeroSection from "./bouquetHeroSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    bouquet,
    bouquetCategory,
    seasonalCollection,
    siteSettings,
    bouquetHeroSection,
  ],
};
