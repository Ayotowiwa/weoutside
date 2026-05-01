import { Recommendation } from "@/lib/recommendations";

export const homepageData: {
  hero: { title: string; subtitle: string; image: string; ctaText: string };
  categories: { id: string; name: string; image: string }[];
  promos: { title: string; description: string; image: string; ctaText: string }[];
  allRecommendations: Recommendation[];
} = {
  hero: {
    title: "Discover Amazing Events",
    subtitle: "Find the best outdoor events and places happening near you every day",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop",
    ctaText: "Explore Now",
  },

  categories: [
    {
      id: "cat-1",
      name: "Dinner",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&fit=crop",
    },
    {
      id: "cat-2",
      name: "Arcade",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&fit=crop",
    },
    {
      id: "cat-3",
      name: "Fun",
      image:
        "https://images.unsplash.com/photo-1460176449511-ff5fc8e64c35?w=200&fit=crop",
    },
    {
      id: "cat-4",
      name: "Outdoors",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&fit=crop",
    },
    {
      id: "cat-5",
      name: "Parks",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&fit=crop",
    },
    {
      id: "cat-6",
      name: "Kids",
      image:
        "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "cat-7",
      name: "Tech",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&fit=crop",
    },
    {
      id: "cat-8",
      name: "Gospel",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&fit=crop",
    },
    {
      id: "cat-9",
      name: "Education",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&fit=crop",
    },
    {
      id: "cat-10",
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&fit=crop",
    },
    {
      id: "cat-11",
      name: "Music",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&fit=crop",
    },
    {
      id: "cat-12",
      name: "Wellness",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&fit=crop",
    },
    {
      id: "cat-13",
      name: "Museums",
      image:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&fit=crop",
    },
    {
      id: "cat-14",
      name: "Shopping",
      image:
        "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=200&fit=crop",
    },
    {
      id: "cat-15",
      name: "Nightlife",
      image:
        "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=200&fit=crop",
    },
  ],

  promos: [
    {
      title: "Limited Time Offer",
      description: "Get 20% off on all weekend adventures this month",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop",
      ctaText: "Claim Offer",
    },
    {
      title: "Summer Exploration Pass",
      description: "Unlimited access to premium events and exclusive locations",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop",
      ctaText: "Get Pass",
    },
  ],

  allRecommendations: [
    // Lagos, Nigeria PLACES and EVENTS
    {
      id: "place-1",
      title: "Lekki Conservation Centre",
      description:
        "A 78-acre nature reserve in the heart of Lagos featuring a canopy walkway 40 meters above ground. Home to over 4,500 animals including monkeys, birds, and reptiles. Educational guided tours available.",
      type: "PLACE",
      categories: ["Parks", "Outdoors"],
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      locationName: "Lekki, Lagos",
      latitude: 6.4667,
      longitude: 3.5833,
      openingHours: "9:00 AM - 5:00 PM, Daily",
    },
    {
      id: "event-1",
      title: "Lekki Sunset Beach Volleyball Tournament",
      description:
        "Join enthusiasts for exciting beach volleyball matches along Lekki's pristine shores. All skill levels welcome with experienced coaches and food vendors on site.",
      type: "EVENT",
      categories: ["Outdoors", "Sports"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Lekki Beach, Lagos",
      latitude: 6.4599,
      longitude: 3.5952,
      startDate: "2026-05-15",
      endDate: "2026-05-17",
    },
    {
      id: "place-2",
      title: "Tark Lounge & Suites",
      description:
        "Premier waterfront resort in Lagos offering stunning views of the lagoon. Perfect for relaxation, water sports, and lakeside dining. Excellent accommodation and spa facilities available.",
      type: "PLACE",
      categories: ["Parks", "Outdoors"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Victoria Island, Lagos",
      latitude: 6.4274,
      longitude: 3.4255,
      openingHours: "Open 24/7 for guests",
    },
    {
      id: "event-2",
      title: "Ikoyi Sunrise Photography Walk",
      description:
        "Experience Lagos at dawn with guided photography tours. Learn composition techniques while capturing stunning sunrise shots over the lagoon. Equipment advice and local tips included.",
      type: "EVENT",
      categories: ["Outdoors", "Education"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Ikoyi, Lagos",
      latitude: 6.4533,
      longitude: 3.4823,
      startDate: "2026-06-01",
      endDate: "2026-06-01",
    },
    {
      id: "place-3",
      title: "Elegushi Beach",
      description:
        "Popular sandy beach in Lagos known for its vibrant atmosphere, crystal clear waters, and recreational facilities. Ideal for swimming, surfing, beach soccer, and evening strolls.",
      type: "PLACE",
      categories: ["Parks", "Outdoors"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Lekki, Lagos",
      latitude: 6.4709,
      longitude: 3.5845,
      openingHours: "Open year-round, dawn to dusk",
    },
    {
      id: "event-3",
      title: "Lagos Beach Music Festival",
      description:
        "Three-day beachside music festival featuring local and international artists. Food vendors, craft markets, and family activities. Enjoy live performances with ocean views.",
      type: "EVENT",
      categories: ["Fun", "Dinner"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      locationName: "Elegushi Beach, Lagos",
      latitude: 6.4709,
      longitude: 3.5845,
      startDate: "2026-04-22",
      endDate: "2026-04-24",
    },
    {
      id: "place-4",
      title: "Lekki Phase 1 Golf Club",
      description:
        "Championship 18-hole golf course surrounded by lush landscaping. Professional golf lessons available for all levels. Restaurant and bar with scenic course views.",
      type: "PLACE",
      categories: ["Parks", "Sports"],
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      locationName: "Lekki, Lagos",
      latitude: 6.4693,
      longitude: 3.5641,
      openingHours: "6:00 AM - 6:00 PM, Daily",
    },
    {
      id: "event-4",
      title: "Island Life Summer Music Series",
      description:
        "Weekly live music performances featuring jazz, afrobeats, and contemporary artists. Food trucks with diverse cuisines and local vendors. Perfect weekend entertainment.",
      type: "EVENT",
      categories: ["Music", "Fun"],
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
      locationName: "Banana Island, Lagos",
      latitude: 6.4427,
      longitude: 3.5642,
      startDate: "2026-07-10",
      endDate: "2026-07-12",
    },
    {
      id: "place-5",
      title: "Tawala Beach Resort",
      description:
        "Exclusive beach resort featuring private sandy shores, water sports, and beachfront dining. Perfect for swimming, jet skiing, kayaking, and sunset views.",
      type: "PLACE",
      categories: ["Parks", "Sports"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Ikoyi, Lagos",
      latitude: 6.4533,
      longitude: 3.4823,
      openingHours: "Open year-round, 24/7",
    },
    {
      id: "event-5",
      title: "Lagoon Jet Ski Championship",
      description:
        "Thrilling jet ski racing event on the Lagos Lagoon. Watch elite riders compete on high-speed courses. Food, entertainment, and spectator areas available.",
      type: "EVENT",
      categories: ["Sports", "Outdoors"],
      image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=800",
      locationName: "Lagos Lagoon, Lagos",
      latitude: 6.4667,
      longitude: 3.5833,
      startDate: "2026-06-15",
      endDate: "2026-06-16",
    },
    {
      id: "place-6",
      title: "Marina Bay Waterfront Park",
      description:
        "Lagos's premier waterfront destination with scenic walking paths, recreational facilities, and multiple dining venues. Great for picnics, water activities, and city views.",
      type: "PLACE",
      categories: ["Parks", "Sports"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Marina, Lagos",
      latitude: 6.4549,
      longitude: 3.3603,
      openingHours: "Open year-round, 24/7",
    },
    {
      id: "event-6",
      title: "Street Food Festival Lagos",
      description:
        "50+ food vendors showcasing authentic Lagos street cuisine and international flavors. Live music, cooking demonstrations, and family entertainment all day.",
      type: "EVENT",
      categories: ["Dinner", "Fun"],
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561486?w=800",
      locationName: "Lekki Arts & Crafts Market, Lagos",
      latitude: 6.4599,
      longitude: 3.5952,
      startDate: "2026-05-01",
      endDate: "2026-05-02",
    },
    {
      id: "place-7",
      title: "Badagry Beach & Heritage Site",
      description:
        "Historic beach with significant cultural importance. Features slave trade historical monuments, beautiful sandy shores for swimming, and guided heritage tours.",
      type: "PLACE",
      categories: ["Parks", "Outdoors"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Badagry, Lagos",
      latitude: 6.3906,
      longitude: 2.8947,
      openingHours: "Open year-round, 24/7",
    },
    {
      id: "event-7",
      title: "Sunset Meditation & Wellness Retreat",
      description:
        "Weekend yoga, meditation, and wellness sessions held on Lekki Beach at sunset. Expert instructors guide daily classes. Healthy meals and spa treatments included.",
      type: "EVENT",
      categories: ["Education", "Outdoors"],
      image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800",
      locationName: "Lekki Beach, Lagos",
      latitude: 6.4709,
      longitude: 3.5845,
      startDate: "2026-07-20",
      endDate: "2026-07-21",
    },
    {
      id: "place-8",
      title: "Ikeja Greenscape Park",
      description:
        "Urban green space with walking trails, bird watching areas, and recreational facilities. Popular destination for nature photography, picnics, and outdoor activities.",
      type: "PLACE",
      categories: ["Parks", "Education"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Ikeja, Lagos",
      latitude: 6.5833,
      longitude: 3.3667,
      openingHours: "Open year-round, sunrise to sunset",
    },
    {
      id: "event-8",
      title: "Lekki Kayaking Adventure",
      description:
        "Professional guided kayaking tours through Lagos Lagoon. Explore mangrove forests and observe local wildlife. All equipment provided, suitable for beginners to advanced paddlers.",
      type: "EVENT",
      categories: ["Sports", "Outdoors"],
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
      locationName: "Lagos Lagoon, Lagos",
      latitude: 6.4667,
      longitude: 3.5833,
      startDate: "2026-06-05",
      endDate: "2026-06-06",
    },
    {
      id: "place-9",
      title: "Five Cowrie Creek Nature Reserve",
      description:
        "Protected nature reserve featuring diverse ecosystems, bird species, and aquatic wildlife. Pristine waterways perfect for nature walks and wildlife observation.",
      type: "PLACE",
      categories: ["Parks", "Outdoors"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Lekki, Lagos",
      latitude: 6.4667,
      longitude: 3.5833,
      openingHours: "Open year-round, 24/7",
    },
    {
      id: "event-9",
      title: "Wellness Weekend Spa Retreat",
      description:
        "3-day wellness retreat with spa treatments, yoga, healthy organic meals, and relaxation sessions. Located in a tranquil beachfront setting away from city hustle.",
      type: "EVENT",
      categories: ["Wellness", "Outdoors"],
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      locationName: "Banana Island Resort, Lagos",
      latitude: 6.4427,
      longitude: 3.5642,
      startDate: "2026-05-20",
      endDate: "2026-05-22",
    },
    {
      id: "place-10",
      title: "Victoria Island Waterfront",
      description:
        "Upscale waterfront promenade with restaurants, bars, and recreational facilities. Scenic lagoon views, perfect for evening strolls, dining, and socializing.",
      type: "PLACE",
      categories: ["Parks", "Outdoors"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Victoria Island, Lagos",
      latitude: 6.4274,
      longitude: 3.4255,
      openingHours: "Open year-round, 24/7",
    },
    {
      id: "event-10",
      title: "Open Air Cinema Night",
      description:
        "Watch latest movies under the stars at beachfront venues. Food vendors, comfortable seating, and local beverages. Enjoy film screenings with ocean breezes.",
      type: "EVENT",
      categories: ["Fun", "Outdoors"],
      image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=800",
      locationName: "Lekki Beach, Lagos",
      latitude: 6.4709,
      longitude: 3.5845,
      startDate: "2026-07-15",
      endDate: "2026-07-17",
    },
    {
      id: "place-11",
      title: "Oniru Beach Community Park",
      description:
        "Community-developed beach park with recreational facilities, picnic areas, and water sports opportunities. Family-friendly atmosphere with lifeguards and facilities.",
      type: "PLACE",
      categories: ["Parks", "Sports"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      locationName: "Oniru, Lagos",
      latitude: 6.4599,
      longitude: 3.5952,
      openingHours: "Open year-round, 24/7",
    },
    {
      id: "event-11",
      title: "Lagos Surfing Championship",
      description:
        "Watch elite surfers compete in challenging ocean conditions. Beach festival with vendors, live music, and entertainment. Free spectating for all surf enthusiasts!",
      type: "EVENT",
      categories: ["Sports", "Fun"],
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800",
      locationName: "Elegushi Beach, Lagos",
      latitude: 6.4709,
      longitude: 3.5845,
      startDate: "2026-06-20",
      endDate: "2026-06-21",
    },
  ],
};

