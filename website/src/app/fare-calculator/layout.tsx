import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Fare Calculator | Live Ticket Price & Smart Card Discounts",
  description: "Calculate Jaipur Metro ticket fares online. Compare single cash token prices (₹6 - ₹18), smart card 10% discount rates, student pass concessions, and senior citizen rates from Mansarovar to Badi Chaupar.",
  keywords: [
    "jaipur metro fare calculator",
    "jaipur metro ticket price",
    "jaipur railway station to hawa mahal metro ticket price",
    "mansarovar to badi chaupar metro fare",
    "jaipur metro token price list",
    "jaipur metro smart card recharge discount",
    "jaipur metro concession pass fare"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/fare-calculator",
  },
  openGraph: {
    title: "Jaipur Metro Fare Calculator & Ticket Prices",
    description: "Check exact token prices and smart card discount rates across all JMRC Pink Line metro stations in Jaipur.",
    url: "https://jaipurride.vercel.app/fare-calculator",
  },
};

export default function FareCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
