import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Jaipur Tourism by Metro | Monuments, Distances & Nearest Stations",
  description: "Discover top places to visit in Jaipur by Metro. Find nearest metro stations, distances, ticket fees, and travel guides for Hawa Mahal, City Palace, Jal Mahal, Raj Mandir, Albert Hall, Bapu Bazaar, and Amer Fort.",
  keywords: [
    "jaipur me metro se ghumne ki jagah",
    "jal mahal nearest metro station",
    "jaipur railway station to raj mandir cinema distance",
    "badi chaupar to hawa mahal",
    "mansarovar metro station to iskcon temple distance",
    "hawa mahal nearest metro station",
    "jaipur tourist guide metro"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/explore-jaipur",
  },
  openGraph: {
    title: "Jaipur Sightseeing & Tourism Metro Travel Guide",
    description: "Find nearest metro stations, walking distances, entry fees, and travel tips for all top monuments in Pink City.",
    url: "https://jaipurride.vercel.app/explore-jaipur",
  },
};

export default function ExploreJaipurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
