import { MetadataRoute } from "next";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryDomain = "https://jaipurride.vercel.app";
  const currentDate = new Date();

  // Core static routes
  const staticRoutes = [
    "",
    "/journey-planner",
    "/simulation",
    "/metro-stations",
    "/metro-map",
    "/explore-jaipur",
    "/fare-calculator",
    "/timings",
    "/features",
    "/download",
    "/about",
    "/contact",
    "/faq",
    "/changelog",
    "/privacy-policy",
    "/terms",
    "/blog",
    "/jaipur-metro",
    "/jaipur-metro-route",
    "/jaipur-metro-fare",
    "/jaipur-metro-timings",
    "/jaipur-metro-tourist-places",
  ].map((route) => ({
    url: `${primaryDomain}${route}`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic station routes
  const stationRoutes = stationsData.map((station) => ({
    url: `${primaryDomain}/metro-stations/${station.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic explore-jaipur attraction routes
  const attractionRoutes = tourismData.map((attraction) => ({
    url: `${primaryDomain}/explore-jaipur/${attraction.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...stationRoutes, ...attractionRoutes];
}

