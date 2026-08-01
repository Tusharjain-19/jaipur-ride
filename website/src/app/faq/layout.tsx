import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro FAQ | Frequently Asked Questions & Answers",
  description: "Get answers to top Jaipur Metro queries: ticket fares, smart card recharges, luggage policies, station coordinates, parking facilities, student discounts, and operating schedules.",
  keywords: [
    "jaipur metro faq",
    "jaipur metro questions answers",
    "jaipur metro smart card rules",
    "is luggage allowed in jaipur metro"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
