import React from "react";
import { Scale, Train, Info } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions - Jaipur Ride",
  description: "Read our Terms and Conditions. Understand fare calculation estimates, JMRC disclaimer parameters, and simulator usage rules.",
};

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      <div className="space-y-4">
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">Terms & Conditions</h1>
        <p className="text-sm text-foreground/50">Last updated: July 8, 2026</p>
      </div>

      <div className="prose dark:prose-invert text-sm sm:text-base text-foreground/80 leading-relaxed space-y-6">
        <p>
          By accessing the Jaipur Ride website or downloading our Android mobile application, you agree to comply with and be bound by the following terms of service.
        </p>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Train className="w-5 h-5 text-brand-pink" />
            <span>1. Unofficial Helper Status & Accuracy Disclaimer</span>
          </h2>
          <p className="text-sm">
            Jaipur Ride is an **independent, unofficial** travel companion app. We are not officially associated with, endorsed by, or partnered with the **Jaipur Metro Rail Corporation (JMRC)**. 
            All timetable data, ticket fare calculations, platform guides, and tourist walk distances are estimates intended for educational and travel preparation purposes. Commuters are advised to cross-reference schedules at JMRC terminals.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Scale className="w-5 h-5 text-brand-pink" />
            <span>2. Permissible Sideloading & Sideload Safety</span>
          </h2>
          <p className="text-sm">
            We provide direct `.APK` package compilation for offline installation and sideloading. You install these files at your own discretion. We ensure all releases uploaded directly to `jaipurride.vercel.app` are cryptographically signed, secure, and malware-free. Do not download `.APK` packages from untrusted third-party hosts.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Info className="w-5 h-5 text-brand-pink" />
            <span>3. Simulator Limitation of Liability</span>
          </h2>
          <p className="text-sm">
            Our web journey planner is a simulation. It does not interface with native GPS APIs or locate you physically. We are not liable for transit delays, ticket fare adjustments, or travel route issues arising from discrepancies in simulator calculations.
          </p>
        </div>
      </div>
    </div>
  );
}
