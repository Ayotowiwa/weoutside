import Link from "next/link";
import { Recommendation } from "@/lib/recommendations";

interface RecommendationCardProps {
  item: Recommendation;
}

export default function RecommendationCard({ item }: RecommendationCardProps) {
  return (
    <Link href={`/${item.id}`}>
      <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
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
