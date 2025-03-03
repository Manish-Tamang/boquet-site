import { sanityFetch } from "@/sanity/lib/live";
import { heroSectionQuery } from "@/sanity/lib/queries";
import { SanityHeroSlide } from "@/types";
import ClientBannerCarousel from "./ClientBannerCarousel"; 

async function getHeroSlides(): Promise<SanityHeroSlide[]> {
    try {
        const data = await sanityFetch<{ slides: SanityHeroSlide[] }>({
            query: heroSectionQuery,
            tags: ["heroSection"],
        });
        return data?.slides || [];
    } catch (error) {
        console.error("Error fetching hero section:", error);
        return [];
    }
}

export async function BannerCarousel() {
    const slides = await getHeroSlides();
    return <ClientBannerCarousel slides={slides} />;
}
