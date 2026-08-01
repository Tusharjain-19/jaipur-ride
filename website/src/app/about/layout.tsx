import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jaipur Ride | Official Jaipur Metro Guide & Tourism Portal",
  description: "Learn about Jaipur Ride project - built to empower daily commuters and tourists traveling on Jaipur Metro Pink Line with accurate timings, fare calculations, and monument directions.",
  keywords: [
    "about jaipur ride",
    "jaipur metro companion guide project",
    "jaipur transit portal"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
