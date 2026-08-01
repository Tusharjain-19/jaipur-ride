import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog & Version Updates | Jaipur Ride",
  description: "Recent product updates, new features, route additions, and performance enhancements for Jaipur Ride companion app.",
  keywords: [
    "jaipur ride changelog",
    "jaipur ride updates"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/changelog",
  },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
