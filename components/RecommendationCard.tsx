"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Recommendation } from "@/lib/recommendations";
import { toggleBookmark, isBookmarked } from "@/lib/api/bookmarks";
import { supabase } from "@/lib/auth/authClient";

interface RecommendationCardProps {
  item: Recommendation;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth state and bookmark status
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsAuthenticated(true);
        const { data, error } = await isBookmarked(item.id);
        if (!error && data !== null) {
          setBookmarked(data);
        }
      } else {
        setIsAuthenticated(false);
        setBookmarked(false);
      }
    };

    // Check on mount
    checkBookmarkStatus();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, _session) => {
      checkBookmarkStatus();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [item.id]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const { data, error } = await toggleBookmark(item.id);

    if (!error && data) {
      setBookmarked(data.isBookmarked);
    }

    setLoading(false);
  };

  return (
    <Link href={`/${item.id}`}>
      <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer relative">
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
            disabled={loading}
            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
            aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {bookmarked ? (
              <svg
                className="w-6 h-6 text-red-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M5 2h14a1 1 0 011 1v19l-8-4.5L5 22V3a1 1 0 010-1z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-400 stroke-current fill-none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M5 2h14a1 1 0 011 1v19l-8-4.5L5 22V3a1 1 0 010-1z" />
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
  );
}
