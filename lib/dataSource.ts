import { homepageData } from "./homepageData";
import { Recommendation } from "./recommendations";

export async function getRecommendations(): Promise<Recommendation[]> {
  return homepageData.allRecommendations;
}

export async function getEvents(): Promise<Recommendation[]> {
  const allRecommendations = await getRecommendations();
  return allRecommendations.filter((item) => item.type === "EVENT");
}

export async function getPlaces(): Promise<Recommendation[]> {
  const allRecommendations = await getRecommendations();
  return allRecommendations.filter((item) => item.type === "PLACE");
}

export async function getRecommendationById(
  id: string
): Promise<Recommendation | null> {
  const allRecommendations = await getRecommendations();
  return allRecommendations.find((item) => item.id === id) || null;
}

export async function getRecommendationsByCategory(
  category: string
): Promise<Recommendation[]> {
  const allRecommendations = await getRecommendations();
  return allRecommendations.filter((item) =>
    item.categories.some(
      (cat) => cat.toLowerCase() === category.toLowerCase()
    )
  );
}

export async function getHomepageData() {
  return {
    hero: homepageData.hero,
    categories: homepageData.categories,
    promos: homepageData.promos,
    allRecommendations: await getRecommendations(),
  };
}
