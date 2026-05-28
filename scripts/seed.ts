import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { homepageData } from "../lib/homepageData";

// Load environment variables from .env.local when running the script
dotenv.config({ path: ".env.local" });

/**
 * Database seed script
 * Inserts mock data from homepageData.ts into Supabase recommendations table.
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

    // Transform data to match Supabase schema
    const transformedData = recommendations.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      categories: item.categories,
      image: item.image,
      location_name: item.locationName,
      latitude: item.latitude,
      longitude: item.longitude,
      start_date: item.startDate || null,
      end_date: item.endDate || null,
      opening_hours: item.openingHours || null,
    }));

    // Optional: Truncate existing data (uncomment if you want to clear first)
    // console.log("🗑️  Clearing existing recommendations...");
    // await supabase.from("recommendations").delete().neq("id", "");

    // Insert data in batches
    const batchSize = 100;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      console.log(
        `Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          transformedData.length / batchSize
        )} (${batch.length} items)...`
      );

      const { data, error } = await supabase
        .from("recommendations")
        .insert(batch)
        .select();

      if (error) {
        console.error(`  Error in batch:`, error.message);
        errorCount += batch.length;
      } else {
        console.log(`  Successfully inserted ${data?.length || 0} items`);
        successCount += data?.length || 0;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("SEED RESULTS:");
    console.log("=".repeat(50));
    console.log(`Successfully inserted: ${successCount} items`);
    console.log(`Failed: ${errorCount} items`);
    console.log(`Total processed: ${transformedData.length} items\n`);

    // Breakdown by type
    const events = recommendations.filter((r) => r.type === "EVENT");
    const places = recommendations.filter((r) => r.type === "PLACE");

    console.log("BREAKDOWN BY TYPE:");
    console.log(`  Events: ${events.length}`);
    console.log(`  Places: ${places.length}\n`);

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

    if (errorCount === 0) {
      console.log("Seed completed successfully!");
    } else {
      console.log(
        `Seed completed with ${errorCount} errors. Check logs above.`
      );
    }

    process.exit(0);
  } catch (error) {
    console.error("Fatal error during seed:", error);
    process.exit(1);
  }
}

seedDatabase();
