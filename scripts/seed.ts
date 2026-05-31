import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { homepageData } from "../lib/homepageData";

// Load environment variables from .env.local when running the script
dotenv.config({ path: ".env.local" });

/**
 * Database seed script
 * Inserts mock data from homepageData.ts into Supabase events and places tables.
 * Run with: npx tsx scripts/seed.ts
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: Supabase environment variables not set");
  console.error("  Ensure .env.local contains:");
  console.error("  - NEXT_PUBLIC_SUPABASE_URL");
  console.error("  - NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  try {
    console.log("Starting database seed...\n");

    const recommendations = homepageData.allRecommendations;

    if (!recommendations || recommendations.length === 0) {
      console.error("❌ No recommendations found in homepageData");
      process.exit(1);
    }

    console.log(`Found ${recommendations.length} items to seed\n`);

    // Separate into events and places
    const events = recommendations.filter((r) => r.type === "EVENT");
    const places = recommendations.filter((r) => r.type === "PLACE");

    console.log("BREAKDOWN BY TYPE:");
    console.log(`  Events: ${events.length}`);
    console.log(`  Places: ${places.length}\n`);

    // Track results
    let totalSuccess = 0;
    let totalErrors = 0;

    // Seed events table
    console.log("=".repeat(50));
    console.log("SEEDING EVENTS TABLE");
    console.log("=".repeat(50));
    const eventResults = await seedEvents(events);
    totalSuccess += eventResults.success;
    totalErrors += eventResults.errors;

    // Seed places table
    console.log("\n" + "=".repeat(50));
    console.log("SEEDING PLACES TABLE");
    console.log("=".repeat(50));
    const placeResults = await seedPlaces(places);
    totalSuccess += placeResults.success;
    totalErrors += placeResults.errors;

    // Final summary
    console.log("\n" + "=".repeat(50));
    console.log("FINAL SEED RESULTS:");
    console.log("=".repeat(50));
    console.log(`Successfully inserted: ${totalSuccess} items`);
    console.log(`Failed: ${totalErrors} items`);
    console.log(`Total processed: ${recommendations.length} items\n`);

    // Breakdown by category
    const categoryCount: Record<string, number> = {};
    recommendations.forEach((item) => {
      item.categories.forEach((cat) => {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
    });

    console.log("BREAKDOWN BY CATEGORY:");
    Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count}`);
      });

    console.log("\n" + "=".repeat(50));

    if (totalErrors === 0) {
      console.log("Seed completed successfully!");
    } else {
      console.log(
        `Seed completed with ${totalErrors} errors. Check logs above.`
      );
    }

    process.exit(0);
  } catch (error) {
    console.error("Fatal error during seed:", error);
    process.exit(1);
  }
}

async function seedEvents(
  events: typeof homepageData.allRecommendations
): Promise<{ success: number; errors: number }> {
  let successCount = 0;
  let errorCount = 0;

  if (events.length === 0) {
    console.log("No events to seed");
    return { success: 0, errors: 0 };
  }

  // Transform events to match events table schema
  const transformedEvents = events.map((item) => ({
    title: item.title,
    description: item.description,
    category: item.categories.length > 0 ? JSON.stringify(item.categories) : null,
    image_url: item.image,
    start_time: item.startDate || null,
    end_time: item.endDate || null,
    location_name: item.locationName,
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  const batchSize = 100;

  for (let i = 0; i < transformedEvents.length; i += batchSize) {
    const batch = transformedEvents.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(transformedEvents.length / batchSize);

    console.log(`Inserting batch ${batchNum}/${totalBatches} (${batch.length} events)...`);

    const { data, error } = await supabase
      .from("events")
      .insert(batch)
      .select();

    if (error) {
      console.error(`   Error in batch ${batchNum}:`);
      console.error(`     Table: events`);
      console.error(`     Error: ${error.message}`);
      batch.forEach((item) => {
        console.error(`     Failed item: "${item.title}"`);
      });
      errorCount += batch.length;
    } else {
      const inserted = data?.length || 0;
      console.log(`   Successfully inserted ${inserted} events`);
      successCount += inserted;
    }
  }

  return { success: successCount, errors: errorCount };
}

async function seedPlaces(
  places: typeof homepageData.allRecommendations
): Promise<{ success: number; errors: number }> {
  let successCount = 0;
  let errorCount = 0;

  if (places.length === 0) {
    console.log("No places to seed");
    return { success: 0, errors: 0 };
  }

  // Transform places to match places table schema
  const transformedPlaces = places.map((item) => ({
    name: item.title,
    description: item.description,
    category: item.categories.length > 0 ? JSON.stringify(item.categories) : null,
    image_url: item.image,
    location_name: item.locationName,
    opening_hours: item.openingHours || null,
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  const batchSize = 100;

  for (let i = 0; i < transformedPlaces.length; i += batchSize) {
    const batch = transformedPlaces.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(transformedPlaces.length / batchSize);

    console.log(`Inserting batch ${batchNum}/${totalBatches} (${batch.length} places)...`);

    const { data, error } = await supabase
      .from("places")
      .insert(batch)
      .select();

    if (error) {
      console.error(`   Error in batch ${batchNum}:`);
      console.error(`     Table: places`);
      console.error(`     Error: ${error.message}`);
      batch.forEach((item) => {
        console.error(`     Failed item: "${item.name}"`);
      });
      errorCount += batch.length;
    } else {
      const inserted = data?.length || 0;
      console.log(`   Successfully inserted ${inserted} places`);
      successCount += inserted;
    }
  }

  return { success: successCount, errors: errorCount };
}

seedDatabase();
