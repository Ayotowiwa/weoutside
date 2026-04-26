"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoriesSection from "@/components/CategoriesSection";
import RecommendationsGrid from "@/components/RecommendationsGrid";
import Footer from "@/components/Footer";
import { homepageData } from "@/lib/homepageData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter recommendations based on selected category
  const filteredRecommendations =
    selectedCategory === null
      ? homepageData.allRecommendations
      : homepageData.allRecommendations.filter(
          (item) => item.category === selectedCategory
        );

  // Split filtered recommendations into two groups for display
  const firstBatch = filteredRecommendations.slice(0, 9);
  const secondBatch = filteredRecommendations.slice(9);

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
      <CategoriesSection
        categories={homepageData.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. First Recommendations Grid (Mixed EVENTS & PLACES) */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Featured Experiences</h2>
        </div>
        <RecommendationsGrid items={firstBatch} />
      </div>

      {/* 5. Promo Cards (Side by Side) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homepageData.promos.map((promo, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden h-48">
              {/* Background Image */}
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {promo.title}
                </h3>
                <p className="text-gray-100 mb-4 max-w-md text-sm sm:text-base">
                  {promo.description}
                </p>
                <button className="w-fit px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm">
                  {promo.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
