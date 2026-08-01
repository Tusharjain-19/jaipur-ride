import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Jaipur Ride",
  description: "Terms of service and usage conditions for Jaipur Ride web application and mobile guide.",
  keywords: [
    "jaipur ride terms of service",
    "jaipur ride terms"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
