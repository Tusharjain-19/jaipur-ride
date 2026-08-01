import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Ride Features | Offline Transit, Fares & Sightseeing",
  description: "Discover features of Jaipur Ride: offline metro map, live fare calculator, tourist monument proximity finder, station coordinates, multi-language support (Hindi & English), and dark mode.",
  keywords: [
    "jaipur metro features",
    "jaipur ride app capabilities",
    "offline jaipur metro map",
    "jaipur transit app features"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/features",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
