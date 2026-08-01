import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Jaipur Ride Companion App",
  description: "Read privacy policy for Jaipur Ride web and mobile application. We respect your privacy and process all transit routing offline locally without tracking your location.",
  keywords: [
    "jaipur ride privacy policy",
    "jaipur metro app privacy policy"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
