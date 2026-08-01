import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Route Map HD | Pink Line Stations & Coordinates",
  description: "View and download interactive high-resolution Jaipur Metro Pink Line Map. Explore elevated and underground subway stations, coordinates, parking areas, and Phase 2 planned routes.",
  keywords: [
    "jaipur metro route map",
    "jaipur metro map hd download",
    "jaipur metro pink line stations map",
    "jaipur metro underground stations",
    "mansarovar metro station jaipur coordinates"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/metro-map",
  },
  openGraph: {
    title: "Jaipur Metro Network Map & Pink Line Stations",
    description: "Interactive network map of Jaipur Metro showing all 11 stations from Mansarovar to Badi Chaupar.",
    url: "https://jaipurride.vercel.app/metro-map",
  },
};

export default function MetroMapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
