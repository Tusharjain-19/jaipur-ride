import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Jaipur Ride | Support & Transit Feedback",
  description: "Get in touch with Jaipur Ride team for support, feature requests, transit route updates, or feedback regarding Jaipur Metro guide app.",
  keywords: [
    "contact jaipur ride",
    "jaipur metro support contact",
    "jaipur ride customer care"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
