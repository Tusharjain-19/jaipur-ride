import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Stations Directory | Coordinates, Facilities & Maps",
  description: "Complete list of all 11 Jaipur Metro Pink Line stations: Mansarovar, New Aatish Market, Vivek Vihar, Shyam Nagar, Ram Nagar, Civil Lines, Railway Station, Sindhi Camp, Chandpole, Chhoti Chaupar, and Badi Chaupar. Lat-long coordinates and parking info.",
  keywords: [
    "jaipur metro stations",
    "mansarovar metro station jaipur coordinates",
    "railway station metro jaipur",
    "sindhi camp metro station",
    "badi chaupar metro station",
    "jaipur metro station list"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/metro-stations",
  },
  openGraph: {
    title: "Jaipur Metro Station Directory & Map Coordinates",
    description: "Browse detailed guide, lat-lon coordinates, facilities, and maps for every Jaipur metro station.",
    url: "https://jaipurride.vercel.app/metro-stations",
  },
};

export default function MetroStationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
