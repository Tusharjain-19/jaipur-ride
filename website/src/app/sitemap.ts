import { MetadataRoute } from "next";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryDomain = "https://jaipurride.vercel.app";
  const mirrorDomain = "https://jaipurmetro.xyz";
  const currentDate = new Date();

  const routes = [
    { route: "", priority: 1.0, freq: "daily" as const },
    { route: "/journey-planner", priority: 0.9, freq: "daily" as const },
    { route: "/fare-calculator", priority: 0.9, freq: "daily" as const },
    { route: "/timings", priority: 0.9, freq: "daily" as const },
    { route: "/metro-map", priority: 0.8, freq: "weekly" as const },
    { route: "/metro-stations", priority: 0.8, freq: "daily" as const },
    { route: "/explore-jaipur", priority: 0.8, freq: "daily" as const },
    { route: "/download", priority: 0.8, freq: "weekly" as const },
    { route: "/simulation", priority: 0.7, freq: "weekly" as const },
    { route: "/features", priority: 0.7, freq: "weekly" as const },
    { route: "/faq", priority: 0.7, freq: "weekly" as const },
    { route: "/about", priority: 0.6, freq: "monthly" as const },
    { route: "/contact", priority: 0.6, freq: "monthly" as const },
    { route: "/changelog", priority: 0.5, freq: "monthly" as const },
    { route: "/privacy-policy", priority: 0.3, freq: "yearly" as const },
    { route: "/terms", priority: 0.3, freq: "yearly" as const },
  ];

  // Primary domain static pages
  const primaryStaticPages = routes.map((item) => ({
    url: `${primaryDomain}${item.route}`,
    lastModified: currentDate,
    changeFrequency: item.freq,
    priority: item.priority,
  }));

  // Mirror domain static pages (for jaipurmetro.xyz)
  const mirrorStaticPages = routes.map((item) => ({
    url: `${mirrorDomain}${item.route}`,
    lastModified: currentDate,
    changeFrequency: item.freq,
    priority: item.priority,
  }));

  // Dynamic station routes (11 stations)
  const stationPagesPrimary = stationsData.map((st) => ({
    url: `${primaryDomain}/metro-stations/${st.id}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const stationPagesMirror = stationsData.map((st) => ({
    url: `${mirrorDomain}/metro-stations/${st.id}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Dynamic attraction routes (16 attractions)
  const attractionPagesPrimary = tourismData.map((att) => ({
    url: `${primaryDomain}/explore-jaipur/${att.id}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const attractionPagesMirror = tourismData.map((att) => ({
    url: `${mirrorDomain}/explore-jaipur/${att.id}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [
    ...primaryStaticPages,
    ...mirrorStaticPages,
    ...stationPagesPrimary,
    ...stationPagesMirror,
    ...attractionPagesPrimary,
    ...attractionPagesMirror,
  ];
}

