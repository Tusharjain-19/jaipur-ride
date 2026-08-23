import React from "react";
import { Metadata } from "next";
import FareCalculatorClient from "./FareCalculatorClient";

export const metadata: Metadata = {
  title: "Jaipur Metro Ticket Fare Calculator & Smart Card Rates",
  description: "Estimate trip ticketing costs across the Pink Line instantly. Compare single cash tokens, rechargeable smart card fares, student concessions, and senior citizen travel passes.",
  keywords: [
    "jaipur metro fare calculator",
    "jaipur metro ticket price",
    "jaipur metro ticket",
    "jaipur metro online ticket",
    "jaipur metro smart card cost",
    "jaipur metro monthly pass price"
  ]
};

export default function FareCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title Header */}
      <div className="text-center lg:text-left space-y-4 max-w-3xl">
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
          Jaipur Metro Fare Calculator
        </h1>
        <p className="text-base text-foreground/75 leading-relaxed font-sans">
          Estimate trip ticketing costs across the Pink Line instantly. Compare cash tickets, smart cards, and concession passes.
        </p>
      </div>

      {/* Interactive Fare Calculator */}
      <FareCalculatorClient />

      {/* Popular Route Fares Matrix */}
      <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-8 rounded-3xl shadow-sm space-y-6">
        <h2 className="font-heading font-bold text-xl text-foreground">Popular Route Ticket Prices & Fares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-light-accent dark:bg-navy-card/50 border border-light-border dark:border-navy-border/30 space-y-2">
            <h3 className="font-bold text-brand-pink text-sm font-heading">Railway Station to Hawa Mahal</h3>
            <p className="text-foreground/70">Station Route: J07 (Railway Station) to J11 (Badi Chaupar)</p>
            <p className="text-foreground/70">4 Station Hops (10 min ride)</p>
            <p className="font-extrabold text-emerald-600 dark:text-emerald-400">Cash Token: ₹12 | Smart Card: ₹10.80</p>
          </div>
          <div className="p-4 rounded-2xl bg-light-accent dark:bg-navy-card/50 border border-light-border dark:border-navy-border/30 space-y-2">
            <h3 className="font-bold text-brand-pink text-sm font-heading">Mansarovar to Badi Chaupar</h3>
            <p className="text-foreground/70">Station Route: J01 (Mansarovar) to J11 (Badi Chaupar)</p>
            <p className="text-foreground/70">10 Station Hops (Full Pink Line)</p>
            <p className="font-extrabold text-emerald-600 dark:text-emerald-400">Cash Token: ₹18 | Smart Card: ₹16.20</p>
          </div>
          <div className="p-4 rounded-2xl bg-light-accent dark:bg-navy-card/50 border border-light-border dark:border-navy-border/30 space-y-2">
            <h3 className="font-bold text-brand-pink text-sm font-heading">Sindhi Camp to Chhoti Chaupar</h3>
            <p className="text-foreground/70">Station Route: J08 (Sindhi Camp) to J10 (Chhoti Chaupar)</p>
            <p className="text-foreground/70">2 Station Hops (5 min ride)</p>
            <p className="font-extrabold text-emerald-600 dark:text-emerald-400">Cash Token: ₹10 | Smart Card: ₹9.00</p>
          </div>
        </div>
      </div>

    </div>
  );
}
