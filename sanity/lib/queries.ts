import { groq } from "next-sanity";

export const productQuery = groq`*[_type == "product"]{
    _id,
    name,
    slug { current },
    images,
    price,
    description,
    details,
    category -> {
        _id,
        name
    },
    collection -> {
        _id,
        name
    },
    variants,
    sizes,
    featured
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug { current },
    images,
    price,
    description,
    details,
    category -> {
        _id,
        name
    },
    collection -> {
        _id,
        name
    },
    variants,
    sizes,
    featured
}`;

export const allCategoriesQuery = groq`*[_type == "category"]{
    _id,
    name,
    description
}`;

export const allCollectionsQuery = groq`*[_type == "collection"]{
    _id,
    name,
    description
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    logo,
    footerText
}`;

export const heroSectionQuery = groq`*[_type == "heroSection" && _id == "heroSection"][0]{
    slides[]{
        image,
        title,
        subtitle,
        ctaText,
        ctaLink
    }
}`;
