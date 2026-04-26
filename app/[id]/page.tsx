"use client";

import { homepageData } from "@/lib/homepageData";
import Link from "next/link";
import { use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetailPage({ params }: PageProps) {
  const { id } = use(params);
  const item = homepageData.allRecommendations.find((rec) => rec.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Not Found</h1>
          <p className="text-gray-600 mb-4">This recommendation doesn't exist</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Image */}
        <div className="w-full h-96 rounded-lg overflow-hidden mb-8 bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          {/* Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded text-white ${
                item.type === "EVENT" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {item.type}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{item.title}</h1>

          {/* Location */}
          <p className="text-lg text-gray-600 mb-6">📍 {item.locationName}</p>

          {/* Get Directions Button */}
          <button
            onClick={() => {
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`;
              window.open(mapsUrl, "_blank");
            }}
            className="mb-8 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            📍 Get Directions
          </button>

          {/* Date or Hours */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            {item.type === "EVENT" && item.startDate && (
              <div>
                <p className="text-gray-700 font-medium">
                  📅 {new Date(item.startDate).toLocaleDateString()}
                </p>
                {item.endDate && item.startDate !== item.endDate && (
                  <p className="text-gray-700 font-medium">
                    to {new Date(item.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            {item.type === "PLACE" && item.openingHours && (
              <p className="text-gray-700 font-medium">
                🕐 {item.openingHours}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {item.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
