"use client";

import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface GooglePreferredSourceProps {
  domain?: string;
  theme?: "dark" | "light";
  variant?: "banner" | "compact" | "button";
}

export default function GooglePreferredSource({
  domain = "jaipurride.vercel.app",
  theme = "dark",
  variant = "banner",
}: GooglePreferredSourceProps) {
  const { language } = useLanguage();
  const isEn = language === "en";

  const targetUrl = `https://${domain}`;
  const returnUrl = typeof window !== "undefined" ? window.location.href : targetUrl;
  
  // Google Preferred Source Deep Link (August 2026 update with return URL)
  const followLink = `https://www.google.com/search?q=${encodeURIComponent(
    domain
  )}&ibp=gws-news/publication&rc_u=${encodeURIComponent(returnUrl)}`;

  if (variant === "button") {
    return (
      <a
        href={followLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`g-preferred-source inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 shadow-sm hover:scale-[1.02] ${
          theme === "dark"
            ? "bg-slate-800/90 hover:bg-slate-800 text-amber-300 border border-slate-700/80 hover:border-amber-400/50"
            : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200"
        }`}
        data-site={targetUrl}
        data-theme={theme}
        data-return-url={returnUrl}
      >
        <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
        <span>
          {isEn ? "Add to Google Preferred Sources" : "गूगल प्रेफर्ड सोर्स में जोड़ें"}
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <div className="w-full inline-flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
          <span>
            {isEn
              ? "Prioritize Jaipur Ride on Google Search & AI Overviews"
              : "गूगल सर्च और AI ओवरव्यू में जयपुर राइड को प्राथमिकता दें"}
          </span>
        </div>
        <a
          href={followLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 font-medium transition-colors"
          data-site={targetUrl}
          data-return-url={returnUrl}
        >
          {isEn ? "Prefer Source" : "पसंदीदा बनाएं"}
        </a>
      </div>
    );
  }

  return (
    <div className="w-full my-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-amber-500/20 shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{isEn ? "Google Search Preference" : "गूगल खोज प्राथमिकता"}</span>
          </div>
          <h4 className="text-base font-bold text-white">
            {isEn
              ? "Make Jaipur Ride your Preferred Source"
              : "जयपुर राइड को अपना पसंदीदा स्रोत बनाएं"}
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            {isEn
              ? "Prioritize our live metro guides, fare rules, and route updates directly in Google Search, Google Discover, and AI Overviews."
              : "गूगल खोज, गूगल डिस्कवर और AI ओवरव्यू में सीधे हमारे लाइव मेट्रो गाइड और रूट अपडेट को प्राथमिकता दें।"}
          </p>
        </div>

        <a
          href={followLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md hover:shadow-amber-500/10 hover:scale-[1.02] transition-all"
          data-site={targetUrl}
          data-theme={theme}
          data-return-url={returnUrl}
        >
          <Star className="w-4 h-4 fill-slate-950" />
          <span>{isEn ? "Add Preferred Source" : "प्रिफर्ड सोर्स जोड़ें"}</span>
        </a>
      </div>
    </div>
  );
}
