import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro App Download | Jaipur Ride Offline Transit App",
  description: "Download official Jaipur Ride companion app for Android and Web. Access offline metro route planner, station fare calculator, train timings, and tourist maps without active internet connection.",
  keywords: [
    "jaipur metro app download",
    "jaipur ride app download",
    "jaipur metro offline app apk",
    "jaipur metro android app",
    "jaipur metro guide app"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/download",
  },
  openGraph: {
    title: "Download Jaipur Ride App - Offline Jaipur Metro Guide",
    description: "Get the offline Jaipur Metro guide app for Android & Web. Instant fare calculations and offline station map.",
    url: "https://jaipurride.vercel.app/download",
  },
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
