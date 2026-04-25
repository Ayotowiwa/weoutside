import RecommendationCard from "./RecommendationCard";
import { Recommendation } from "@/lib/recommendations";

interface RecommendationsGridProps {
  items: Recommendation[];
}

export default function RecommendationsGrid({ items }: RecommendationsGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
