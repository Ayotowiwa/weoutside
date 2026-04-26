export type RecommendationType = "EVENT" | "PLACE";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: RecommendationType;
  category: string;
  image: string;
  locationName: string;
  latitude: number;
  longitude: number;
  startDate?: string;
  endDate?: string;
  openingHours?: string;
}
