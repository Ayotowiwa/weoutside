import { getHomepageData } from "@/lib/api/homepage";
import { homepageData } from "@/lib/homepageData";
import HomeContent from "@/app/HomeContent";

export default async function Home() {
  let recommendations = homepageData.allRecommendations;

  // Attempt to fetch data from Supabase with fallback to mock data
  try {
    const supabaseData = await getHomepageData();
    if (supabaseData && supabaseData.length > 0) {
      console.log(
        ` Successfully loaded ${supabaseData.length} items from Supabase`
      );
      recommendations = supabaseData;
    } else {
      console.warn(
        "  Supabase returned empty data, falling back to mock data"
      );
      recommendations = homepageData.allRecommendations;
    }
  } catch (error) {
    console.error(
      " Error fetching from Supabase, falling back to mock data:",
      error
    );
    recommendations = homepageData.allRecommendations;
  }

  return (
    <HomeContent
      recommendations={recommendations}
      hero={homepageData.hero}
      categories={homepageData.categories}
      promos={homepageData.promos}
    />
  );
}