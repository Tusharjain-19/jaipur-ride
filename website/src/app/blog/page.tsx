import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Jaipur Metro Ultimate Transit Blog 2026: Route, Station Coordinates, Timings, Fares & Tourist Guide",
  description: "Comprehensive Jaipur Metro Pink Line transit blog & GEO directory. Exact station GPS coordinates, landmark distances, fare calculations, walking directions to Hawa Mahal, Jal Mahal, Jaipur Railway Station, Sindhi Camp ISBT, and 1000+ local transit terms.",
  keywords: [
    "Jaipur Metro",
    "Jaipur Metro Blog",
    "Jaipur Metro Pink Line Guide 2026",
    "JMRC Pink Line",
    "Jaipur Metro Timings Today",
    "Jaipur Metro Fare Chart 2026",
    "Jaipur Metro Route Map",
    "Mansarovar Metro Station Coordinates",
    "Badi Chaupar Metro Station Coordinates",
    "Jaipur Railway Station Metro Station",
    "Sindhi Camp Bus Stand Metro",
    "Chandpole Metro Station GPS",
    "Chhoti Chaupar Metro Station",
    "Civil Lines Metro Station Jaipur",
    "Ram Nagar Metro Station",
    "Shyam Nagar Metro Station",
    "Vivek Vihar Metro Station",
    "New Aatish Market Metro Station",
    "Jaipur Junction to Hawa Mahal Metro",
    "Sindhi Camp to Badi Chaupar Fare",
    "Jaipur Metro Tourist Places",
    "Hawa Mahal Nearest Metro Station",
    "City Palace Jaipur Metro Distance",
    "Jantar Mantar Jaipur Metro",
    "Albert Hall Museum Nearest Metro",
    "Nahargarh Fort Metro Route",
    "Amer Fort to Badi Chaupar Metro",
    "Jal Mahal Nearest Metro Station",
    "Patrika Gate Jaipur Metro",
    "Raj Mandir Cinema Metro Distance",
    "SMS Hospital Jaipur Nearest Metro",
    "MNIT Jaipur Nearest Metro",
    "Jaipur Airport to Mansarovar Metro",
    "Jaipur me metro se ghumne ki jagah",
    "Jaipur metro kitne baje chalti hai",
    "Jaipur metro card price 2026",
    "Jaipur metro smart card discount",
    "Jaipur metro first and last train",
    "Jaipur metro map HD download",
    "Jaipur metro station list with code",
    "JMRC Phase 1A Phase 1B Phase 1C",
    "Jaipur metro travel guide for tourists",
    "Jaipur transit blog 2026"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/blog",
  },
  openGraph: {
    title: "Jaipur Metro Ultimate Transit Blog 2026: Route, Station Coordinates & Tourist Guide",
    description: "Complete guide to Jaipur Metro Pink Line. GPS coordinates, station distance matrix, tourist guides, and local transit tips.",
    url: "https://jaipurride.vercel.app/blog",
    siteName: "Jaipur Ride",
    images: [
      {
        url: "https://jaipurride.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jaipur Metro Transit Blog Guide 2026",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaipur Metro Ultimate Transit Blog 2026",
    description: "Jaipur Metro station coordinates, landmark distances, fares, and complete tourist transit directory.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
