import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Simulator | Real-Time Train Movement & Station Audio",
  description: "Experience Jaipur Metro virtually. Interactive train simulation showing live platform arrivals, door audio alerts, station speed, and Pink Line route progress.",
  keywords: [
    "jaipur metro simulator",
    "jaipur metro virtual train ride",
    "jaipur metro station announcements simulation"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/simulation",
  },
};

export default function SimulationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
