import { supabase } from "@/lib/supabaseClient";

/**
 * Database schema for events table
 */
interface DatabaseEvent {
  id: string;
  title: string;
  description: string;
  category: string | null;
  image_url: string;
  start_time: string | null;
  end_time: string | null;
  location_name: string;
  latitude: number;
  longitude: number;
  is_verified?: boolean;
  created_by?: string;
  created_at?: string;
}

/**
 * Fetch all events from Supabase
 * Ordered by start_time in ascending order
 */
export async function getEvents(): Promise<DatabaseEvent[]> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching events from Supabase:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching events:", error);
    return [];
  }
}
