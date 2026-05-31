import { Recommendation } from "@/lib/recommendations";
import { getEvents } from "./events";
import { getPlaces } from "./places";

/**
 * Fetch all events and places from Supabase
 * Convert both into unified Recommendation[] format
 */
export async function getHomepageData(): Promise<Recommendation[]> {
  try {
    const [events, places] = await Promise.all([getEvents(), getPlaces()]);

    // Convert events to Recommendation format
    // Convert events to Recommendation format
    const recommendedEvents: Recommendation[] = events.map((event) => {
      let categories: string[] = [];
      if (event.category) {
        try {
          categories = JSON.parse(event.category);
        } catch {
          // Fallback if not valid JSON
          categories = [event.category];
        }
      }
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        type: "EVENT",
        categories,
        image: event.image_url,
        locationName: event.location_name,
        latitude: event.latitude,
        longitude: event.longitude,
        startDate: event.start_time || undefined,
        endDate: event.end_time || undefined,
      };
    });

    // Convert places to Recommendation format
    // Convert places to Recommendation format
    const recommendedPlaces: Recommendation[] = places.map((place) => {
      let categories: string[] = [];
      if (place.category) {
        try {
          categories = JSON.parse(place.category);
        } catch {
          // Fallback if not valid JSON
          categories = [place.category];
        }
      }
      return {
        id: place.id,
        title: place.name,
        description: place.description,
        type: "PLACE",
        categories,
        image: place.image_url,
        locationName: place.location_name,
        latitude: place.latitude,
        longitude: place.longitude,
        openingHours: place.opening_hours || undefined,
      };
    });

    // Combine and return
    return [...recommendedEvents, ...recommendedPlaces];
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
}
