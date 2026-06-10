'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Recommendation } from "@/lib/recommendations";
import { toggleBookmark, isBookmarked } from "@/lib/api/bookmarkActions";
import { supabase } from "@/lib/auth/authClient";

interface RecommendationCardProps {
  item: Recommendation;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  // Check if user is logged in and if item is bookmarked
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setUserId(null);
          setBookmarked(false);
          return;
        }

        setUserId(user.id);

        // Check if item is bookmarked
        const { data: isBookmarkedResult, error } = await isBookmarked(
          user.id,
          item.type === "EVENT" ? "event" : "place",
          item.id
        );

        if (!error && isBookmarkedResult !== null) {
          setBookmarked(isBookmarkedResult);
        }
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [item.id, item.type]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!userId) {
      setShowSignInPrompt(true);
      setTimeout(() => setShowSignInPrompt(false), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const { data: newState, error } = await toggleBookmark(
        userId,
        item.type === "EVENT" ? "event" : "place",
        item.id
      );

      if (!error && newState !== null) {
        setBookmarked(newState);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href={`/${item.id}`}>
        <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          {/* Image */}
          <div className="relative w-full h-48 overflow-hidden bg-gray-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkClick}
              disabled={isLoading}
              className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {bookmarked ? (
                <svg
                  className="w-5 h-5 text-blue-600 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 2c-1.1 0-2 .9-2 2v19l7-3 7 3V4c0-1.1-.9-2-2-2H5z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 2c-1.1 0-2 .9-2 2v19l7-3 7 3V4c0-1.1-.9-2-2-2H5z" />
                </svg>
              )}
            </button>
          </div>

        {/* Content */}
        <div className="p-4">
          {/* Badge */}
          <div className="flex gap-2 mb-2">
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded text-white ${
                item.type === "EVENT" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {item.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>

          {/* Location */}
          <p className="text-sm text-gray-600 mb-3">{item.locationName}</p>

          {/* Conditional Info */}
          {item.type === "EVENT" && item.startDate && (
            <p className="text-sm text-gray-700 font-medium">
              📅 {new Date(item.startDate).toLocaleDateString()}
            </p>
          )}

          {item.type === "PLACE" && item.openingHours && (
            <p className="text-sm text-gray-700 font-medium">
              🕐 {item.openingHours}
            </p>
          )}
        </div>
      </div>
    </Link>

    {/* Sign-in Prompt */}
    {showSignInPrompt && (
      <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
        Sign in to save your favorite items.
      </div>
    )}
    </>
  );
}
