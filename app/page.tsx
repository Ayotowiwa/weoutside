import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoriesSection from "@/components/CategoriesSection";
import RecommendationsGrid from "@/components/RecommendationsGrid";
import PromoCard from "@/components/PromoCard";
import { homepageData } from "@/lib/homepageData";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Banner */}
      <HeroBanner
        title={homepageData.hero.title}
        subtitle={homepageData.hero.subtitle}
        image={homepageData.hero.image}
        ctaText={homepageData.hero.ctaText}
      />

      {/* 3. Categories Section */}
      <CategoriesSection categories={homepageData.categories} />

      {/* 4. First Recommendations Grid */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Featured Experiences</h2>
        </div>
        <RecommendationsGrid items={homepageData.featuredRecommendations} />
      </div>

      {/* 5. Promo Card */}
      <PromoCard
        title={homepageData.promo.title}
        description={homepageData.promo.description}
        image={homepageData.promo.image}
        ctaText={homepageData.promo.ctaText}
      />

      {/* 6. Second Recommendations Grid */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Explore More</h2>
        </div>
        <RecommendationsGrid items={homepageData.moreRecommendations} />
      </div>

      {/* Footer Padding */}
      <div className="h-20"></div>
    </div>
  );
}
