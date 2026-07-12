import { MetadataRoute } from "next";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jaipurride.vercel.app";

  const staticPages = [
    "",
    "/journey-planner",
    "/metro-map",
    "/metro-stations",
    "/fare-calculator",
    "/timings",
    "/explore-jaipur",
    "/download",
    "/features",
    "/about",
    "/faq",
    "/contact",
    "/changelog",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic station routes
  const stationPages = stationsData.map((st) => ({
    url: `${baseUrl}/metro-stations/${st.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic attraction routes
  const attractionPages = tourismData.map((att) => ({
    url: `${baseUrl}/explore-jaipur/${att.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...stationPages, ...attractionPages];
}
