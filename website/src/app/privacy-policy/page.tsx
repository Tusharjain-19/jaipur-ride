import React from "react";
import { ShieldCheck, Lock, EyeOff, ServerOff } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Jaipur Ride",
  description: "Read our privacy policy. Learn about local coordinate processing and why Jaipur Ride never uploads your geolocation logs to servers.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      <div className="space-y-4">
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-foreground/50">Last updated: July 8, 2026</p>
      </div>

      <div className="prose dark:prose-invert text-sm sm:text-base text-foreground/80 leading-relaxed space-y-6">
        <p>
          At Jaipur Ride, we take your privacy extremely seriously. This policy documents how we collect, process, and protect your information when you visit our official marketing website or install our Capacitor mobile application.
        </p>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Lock className="w-5 h-5 text-brand-pink" />
            <span>1. Local-Only Geolocation Processing</span>
          </h2>
          <p className="text-sm">
            Our Android mobile application requests geolocation coordinates (`ACCESS_FINE_LOCATION`) only to track your physical distance from upcoming metro platforms and trigger vibration reminders. 
            <strong> All location data is computed locally on your device in real-time. We never collect, store, transmit, or sell your coordinates to external servers.</strong>
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <EyeOff className="w-5 h-5 text-brand-pink" />
            <span>2. Zero Third-Party Advertising Trackers</span>
          </h2>
          <p className="text-sm">
            We do not embed third-party analytics libraries or advertiser tracking pixels in our website or app code. The app is free of display banner ads to maintain high rendering speeds and protect user battery health.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground shrink-0 flex items-center space-x-2">
            <ServerOff className="w-5 h-5 text-brand-pink" />
            <span>3. Local Storage Preferences</span>
          </h2>
          <p className="text-sm">
            We use standard browser `localStorage` variables to store your preferences (Language select: EN/HI, and Theme select: Dark/Light). This data does not contain personal identification details and remains on your device.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground shrink-0 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-pink" />
            <span>4. Non-Commercial Use Only (Strict Prohibition)</span>
          </h2>
          <p className="text-sm leading-relaxed">
            The Jaipur Ride website, the companion Android application, the relational databases (including station nodes, route distances, fares formulas, and tourist collections), and branding assets are provided <strong>strictly for personal, non-commercial travel preparation</strong>. 
          </p>
          <p className="text-sm leading-relaxed">
            Any automated data scraping, harvesting, code replication, or commercial reuse of this application&apos;s assets, structures, or transit databases for business operations, commercial travel apps, or monetary gain is <strong>strictly prohibited</strong>. Unauthorized replication will be subject to intellectual property enforcement actions.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-foreground">5. Contact Information</h2>
          <p className="text-sm">
            If you have questions regarding this privacy statement, our coordinate processing methods, or licensing inquiries, please feel free to submit an email inquiry to: <strong>support@jaipurride.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
