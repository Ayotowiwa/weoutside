import { Recommendation } from "./recommendations";

export function transformDbToRecommendation(dbRecord: any): Recommendation {
  return {
    id: dbRecord.id,
    title: dbRecord.title,
    description: dbRecord.description,
    type: dbRecord.type,
    categories: dbRecord.categories || [],
    image: dbRecord.image,
    locationName: dbRecord.location_name,
    latitude: dbRecord.latitude,
    longitude: dbRecord.longitude,
    startDate: dbRecord.start_date || undefined,
    endDate: dbRecord.end_date || undefined,
    openingHours: dbRecord.opening_hours || undefined,
  };
}

export function transformDbToRecommendations(
  dbRecords: any[]
): Recommendation[] {
  return dbRecords.map(transformDbToRecommendation);
}

export function transformRecommendationToDb(recommendation: Recommendation) {
  return {
    id: recommendation.id,
    title: recommendation.title,
    description: recommendation.description,
    type: recommendation.type,
    categories: recommendation.categories,
    image: recommendation.image,
    location_name: recommendation.locationName,
    latitude: recommendation.latitude,
    longitude: recommendation.longitude,
    start_date: recommendation.startDate || null,
    end_date: recommendation.endDate || null,
    opening_hours: recommendation.openingHours || null,
  };
}

export function transformRecommendationsToDb(
  recommendations: Recommendation[]
) {
  return recommendations.map(transformRecommendationToDb);
}
