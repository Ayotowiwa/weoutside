import { supabase } from "@/lib/supabaseClient";

/**
 * Database schema for places table
 */
interface DatabasePlace {
  id: string;
  name: string;
  description: string;
  category: string | null;
  image_url: string;
  location_name: string;
  latitude: number;
  longitude: number;
  opening_hours: string | null;
  created_at?: string;
}

/**
 * Fetch all places from Supabase
 */
export async function getPlaces(): Promise<DatabasePlace[]> {
  try {
    const { data, error } = await supabase.from("places").select("*");

    if (error) {
      console.error("Error fetching places from Supabase:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching places:", error);
    return [];
  }
}
