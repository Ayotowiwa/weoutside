"use client";

import { useState } from "react";

export interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = 5;
  const displayedCategories = expanded ? categories : categories.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by Category</h2>

        {/* Grid Layout (responsive) */}
        <div className={`grid gap-6 ${expanded ? "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
          {displayedCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center cursor-pointer group">
              {/* Circular Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-blue-600 transition-colors">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              {/* Category Name */}
              <span className="text-center text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {category.name}
              </span>
            </div>
          ))}

          {/* View More / Back Button */}
          <div className="flex flex-col items-center justify-start pt-2">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-300 hover:border-blue-600 cursor-pointer group transition-colors">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-center w-full h-full"
              >
                <span className="text-2xl font-bold text-gray-600 group-hover:text-blue-600">
                  {expanded ? "←" : "→"}
                </span>
              </button>
            </div>
            <span className="text-center text-xs font-medium text-gray-600 mt-3 group-hover:text-blue-600">
              {expanded ? "Back" : "View More"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
