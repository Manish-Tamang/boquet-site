import { groq } from "next-sanity";

export const bouquetQuery = groq`*[_type == "bouquet"]{
    _id,
    name,
    slug { current },
    images,
    price,
    description,
    arrangementDetails,
    bouquetCategory -> {
        _id,
        name
    },
    seasonalCollection -> {
        _id,
        name
    },
    variants,
    sizes,
    featured
}`;

export const bouquetBySlugQuery = groq`*[_type == "bouquet" && slug.current == $slug][0]{
    _id,
    name,
    slug { current },
    images,
    price,
    description,
    arrangementDetails,
    bouquetCategory -> {
        _id,
        name
    },
    seasonalCollection -> {
        _id,
        name
    },
    variants,
    sizes,
    featured
}`;

export const allBouquetCategoriesQuery = groq`*[_type == "bouquetCategory"]{
    _id,
    name,
    description
}`;

export const allSeasonalCollectionsQuery = groq`*[_type == "seasonalCollection"]{
    _id,
    name,
    description
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    logo,
    footerText
}`;

export const bouquetHeroSectionQuery = groq`*[_type == "bouquetHeroSection" && _id == "bouquetHeroSection"][0]{
    slides[]{
        image,
        title,
        subtitle,
        ctaText,
        ctaLink
    }
}`;
