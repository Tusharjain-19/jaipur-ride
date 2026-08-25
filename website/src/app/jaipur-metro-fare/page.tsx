import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import FaqAccordion from "@/components/FaqAccordion";
import { Ticket, Percent, CreditCard, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Jaipur Metro Fare Table, Ticket Prices & Smart Card Discounts",
  description: "Check Jaipur Metro ticket prices and fare matrix for 2026. Single journey tokens cost between ₹6 and ₹18. Get 10%-20% off with Metro Smart Cards.",
  alternates: {
    canonical: "https://jaipurride.vercel.app/jaipur-metro-fare",
  },
  openGraph: {
    title: "Jaipur Metro Fare Table & Ticket Prices 2026",
    description: "Complete fare table for Jaipur Metro Pink Line (Mansarovar to Badi Chaupar). Token rates, Smart Card discounts, and fare calculator.",
    url: "https://jaipurride.vercel.app/jaipur-metro-fare",
  },
};

export default function JaipurMetroFarePage() {
  const breadcrumbs = [
    { name: "Jaipur Metro", url: "/jaipur-metro" },
    { name: "Ticket Fare Guide", url: "/jaipur-metro-fare" },
  ];

  const fareFaqs = [
    {
      question: "How much is the minimum and maximum ticket fare in Jaipur Metro?",
      answer: "The minimum ticket fare for Jaipur Metro is ₹6 (covering 1 to 2 stations) and the maximum fare is ₹18 (for the full 11-station journey from Mansarovar to Badi Chaupar)."
    },
    {
      question: "What discount do I get using a Jaipur Metro Smart Card?",
      answer: "Smart Card holders receive a 10% discount during off-peak hours and up to 20% discount depending on trip distance and recharge offers."
    },
    {
      question: "Can I buy Jaipur Metro tickets online?",
      answer: "Jaipur Metro tokens and QR tickets can be purchased at station ticket counters, automated Vending Machines (TVMs), and official companion mobile apps like Jaipur Ride."
    },
    {
      question: "What is the penalty for traveling without a valid ticket?",
      answer: "Traveling beyond your destination or without a valid token/Smart Card incurs a fine of ₹50 plus the maximum ticket fare as per JMRC regulations."
    }
  ];

  // Simplified fare lookup table structure for rendering HTML table
  const sampleFares = [
    { from: "Mansarovar (J01)", to: "Railway Station (J07)", token: "₹12", card: "₹10.80", distance: "7 stops" },
    { from: "Mansarovar (J01)", to: "Badi Chaupar (J11)", token: "₹18", card: "₹16.20", distance: "10 stops" },
    { from: "Railway Station (J07)", to: "Badi Chaupar (J11)", token: "₹12", card: "₹10.80", distance: "4 stops" },
    { from: "Sindhi Camp (J08)", to: "Chandpole (J09)", token: "₹6", card: "₹5.40", distance: "1 stop" },
    { from: "Chandpole (J09)", to: "Badi Chaupar (J11)", token: "₹6", card: "₹5.40", distance: "2 stops" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-extrabold rounded-full uppercase tracking-wider">
          <Ticket className="w-3.5 h-3.5" /> 2026 Ticket Price Guide
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          Jaipur Metro Fare Table, Ticket Prices & Smart Card Discounts
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-sans">
          Find exact station-to-station ticket fares for Jaipur Metro Pink Line. Compare cash token rates against discounted Metro Smart Card fares.
        </p>
      </div>

      {/* Answer First */}
      <AnswerFirstBox
        title="Jaipur Metro Fare Summary"
        content="Jaipur Metro fares are distance-based: ₹6 for 0–2 stations, ₹12 for 3–6 stations, and ₹18 for 7–10 stations. Smart Card users enjoy an automatic 10% discount on every swipe."
      />

      {/* Interactive Fare Calculator Banner */}
      <div className="bg-linear-to-r from-brand-pink to-brand-pink-dark rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-brand-pink/20">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="font-heading font-extrabold text-2xl">Interactive Fare Calculator Tool</h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-sans">
            Select your origin and destination stations to compute instant single journey, return, and smart card savings.
          </p>
        </div>
        <Link
          href="/fare-calculator"
          className="px-6 py-3 bg-white text-brand-pink-dark font-extrabold rounded-xl text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Calculator className="w-4 h-4" /> Open Fare Calculator
        </Link>
      </div>

      {/* Popular Route Fare Table */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <h2 className="font-heading font-extrabold text-2xl text-foreground">
          Popular Station-to-Station Jaipur Metro Ticket Prices
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-light-border dark:border-navy-border/20">
          <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
            <thead>
              <tr className="bg-light-accent/50 dark:bg-navy-card border-b border-light-border dark:border-navy-border/30 font-heading font-bold text-foreground">
                <th className="p-3.5">Origin Station</th>
                <th className="p-3.5">Destination Station</th>
                <th className="p-3.5">Travel Distance</th>
                <th className="p-3.5">Token Fare (Cash)</th>
                <th className="p-3.5">Smart Card Price (10% Off)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-navy-border/20 text-foreground/80">
              {sampleFares.map((row, idx) => (
                <tr key={idx} className="hover:bg-light-accent/20 dark:hover:bg-navy-card/20">
                  <td className="p-3.5 font-semibold text-foreground">{row.from}</td>
                  <td className="p-3.5 font-semibold text-foreground">{row.to}</td>
                  <td className="p-3.5 text-foreground/70">{row.distance}</td>
                  <td className="p-3.5 font-bold text-brand-pink">{row.token}</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">{row.card}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart Card & Pass Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-navy-dark p-6 rounded-3xl border border-light-border dark:border-navy-border/40 space-y-4">
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground">Jaipur Metro Smart Card Rules</h3>
          <ul className="text-xs sm:text-sm text-foreground/75 space-y-2 font-sans list-disc list-inside">
            <li>Initial purchase fee: ₹100 (₹50 refundable security deposit + ₹50 balance).</li>
            <li>Recharge options: ₹100, ₹200, ₹500 at any metro station counter or TVM.</li>
            <li>10% flat discount on every journey token equivalent.</li>
            <li>Valid for 1 year from the date of last recharge.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-navy-dark p-6 rounded-3xl border border-light-border dark:border-navy-border/40 space-y-4">
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit">
            <Percent className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground">Tourist Tourist Passes & Concessions</h3>
          <ul className="text-xs sm:text-sm text-foreground/75 space-y-2 font-sans list-disc list-inside">
            <li><strong>1-Day Tourist Pass:</strong> Unlimited rides for 1 calendar day at ₹100.</li>
            <li><strong>3-Day Tourist Pass:</strong> Unlimited rides for 3 consecutive days at ₹200.</li>
            <li>Children under 3 feet (90 cm) height travel completely free with an adult.</li>
            <li>Group travel passes available for school & educational tours.</li>
          </ul>
        </div>
      </div>

      <FaqAccordion items={fareFaqs} title="Jaipur Metro Fare FAQs" />
    </div>
  );
}
