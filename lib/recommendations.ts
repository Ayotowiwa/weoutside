export type RecommendationType = "EVENT" | "PLACE";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: RecommendationType;
  image: string;
  locationName: string;
  latitude: number;
  longitude: number;
  startDate?: string;
  endDate?: string;
  openingHours?: string;
}

export const recommendations: Recommendation[] = [
  // Events
  {
    id: "event-1",
    title: "Mountain Hiking Expedition",
    description: "Join us for an exciting 3-day hiking adventure through the scenic peaks of the Rocky Mountains. All skill levels welcome with experienced guides leading the way.",
    type: "EVENT",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    locationName: "Boulder, Colorado",
    latitude: 40.0149,
    longitude: -105.2705,
    startDate: "2026-05-15",
    endDate: "2026-05-17",
  },
  {
    id: "event-2",
    title: "Grand Canyon Sunrise Tour",
    description: "Experience the breathtaking beauty of the Grand Canyon at sunrise. Includes guided photography tips and breakfast at the rim. Limited to 20 participants.",
    type: "EVENT",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    locationName: "Grand Canyon, Arizona",
    latitude: 36.1069,
    longitude: -112.1129,
    startDate: "2026-06-01",
    endDate: "2026-06-01",
  },
  {
    id: "event-3",
    title: "Coastal Beach Cleanup & BBQ",
    description: "Help preserve our beaches while enjoying community. Afternoon cleanup followed by an outdoor BBQ and beach volleyball. Family-friendly event.",
    type: "EVENT",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    locationName: "Santa Monica Beach, California",
    latitude: 34.0195,
    longitude: -118.4912,
    startDate: "2026-04-22",
    endDate: "2026-04-22",
  },
  // Places
  {
    id: "place-1",
    title: "Yellowstone National Park",
    description: "America's first national park featuring geysers, hot springs, wildlife, and stunning natural landscapes. Old Faithful erupts approximately every 90 minutes.",
    type: "PLACE",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    locationName: "Yellowstone, Wyoming",
    latitude: 44.4280,
    longitude: -110.5885,
    openingHours: "Open year-round, 24/7",
  },
  {
    id: "place-2",
    title: "Moraine Lake Lodge",
    description: "Pristine alpine lake surrounded by snow-capped peaks in Banff National Park. Perfect for kayaking, hiking, and nature photography. Lodge offers dining and accommodation.",
    type: "PLACE",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    locationName: "Banff, Alberta",
    latitude: 51.3267,
    longitude: -116.3993,
    openingHours: "May-October: 6 AM - 6 PM, November-April: Closed",
  },
  {
    id: "place-3",
    title: "Big Sur Coastal Cliffs",
    description: "Dramatic coastal scenery with towering cliffs, hidden beaches, and scenic pullouts. Ideal for hiking, photography, and wildlife viewing. Various trails available.",
    type: "PLACE",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    locationName: "Big Sur, California",
    latitude: 36.2704,
    longitude: -121.8050,
    openingHours: "Open year-round, dawn to dusk",
  },
];
