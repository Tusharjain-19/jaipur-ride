import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Journey Planner | Best Route Finder & Travel Time",
  description: "Plan your trip across Jaipur Metro Pink Line. Get fastest route directions, interchange info, travel duration, distance, and nearest stations to Jaipur Junction, Hawa Mahal, and Sindhi Camp Bus Stand.",
  keywords: [
    "jaipur metro route",
    "jaipur metro journey planner",
    "best metro route in jaipur",
    "jaipur metro station finder",
    "jaipur railway station to hawa mahal metro route",
    "sindhi camp to badi chaupar metro time"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/journey-planner",
  },
  openGraph: {
    title: "Jaipur Metro Journey Planner & Route Finder",
    description: "Calculate optimal route, train travel time, and intermediate stops on Jaipur Metro.",
    url: "https://jaipurride.vercel.app/journey-planner",
  },
};

export default function JourneyPlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
