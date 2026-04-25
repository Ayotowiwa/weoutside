import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoriesSection from "@/components/CategoriesSection";
import RecommendationsGrid from "@/components/RecommendationsGrid";
import PromoCard from "@/components/PromoCard";
import Footer from "@/components/Footer";
import { homepageData } from "@/lib/homepageData";

export default function Home() {
  // Split all recommendations into two groups for display
  const firstBatch = homepageData.allRecommendations.slice(0, 9);
  const secondBatch = homepageData.allRecommendations.slice(9);

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

      {/* 4. First Recommendations Grid (Mixed EVENTS & PLACES) */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Featured Experiences</h2>
        </div>
        <RecommendationsGrid items={firstBatch} />
      </div>

      {/* 5. Promo Card */}
      <PromoCard
        title={homepageData.promo.title}
        description={homepageData.promo.description}
        image={homepageData.promo.image}
        ctaText={homepageData.promo.ctaText}
      />

      {/* 6. Second Recommendations Grid (Mixed EVENTS & PLACES) */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Explore More</h2>
        </div>
        <RecommendationsGrid items={secondBatch} />
      </div>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
