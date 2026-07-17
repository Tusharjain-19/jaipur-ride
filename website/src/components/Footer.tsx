"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Train, Info, Heart, ArrowRight, ShieldCheck, Download, Users, Signal } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const isEn = language === "en";

  const quickLinks = [
    { href: "/", label: t("navHome") },
    { href: "/journey-planner", label: t("navPlanner") },
    { href: "/simulation", label: t("navSimulator") },
    { href: "/metro-stations", label: t("navStations") },
    { href: "/metro-map", label: t("navMap") },
    { href: "/explore-jaipur", label: t("navExplore") },
    { href: "/fare-calculator", label: t("navFareCalculator") },
    { href: "/timings", label: t("navTimingsLink") },
    { href: "/features", label: t("navFeatures") },
  ];

  const stationHubs = [
    { href: "/metro-stations/J01", name: isEn ? "Mansarovar (J01)" : "मानसरोवर (J01)" },
    { href: "/metro-stations/J06", name: isEn ? "Railway Station (J06)" : "रेलवे स्टेशन (J06)" },
    { href: "/metro-stations/J07", name: isEn ? "Sindhi Camp (J07)" : "सिंधी कैंप (J07)" },
    { href: "/metro-stations/J09", name: isEn ? "Chandpole (J09)" : "चांदपोल (J09)" },
    { href: "/metro-stations/J11", name: isEn ? "Badi Chaupar (J11)" : "बड़ी चौपड़ (J11)" },
  ];

  const infoLinks = [
    { href: "/download", label: t("navDownload") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
    { href: "/faq", label: t("navFaq") },
    { href: "/changelog", label: t("navChangelog") },
    { href: "/privacy-policy", label: t("navPrivacy") },
    { href: "/terms", label: t("navTerms") }
  ];

  return (
    <footer className="w-full bg-[#070b16] border-t border-navy-border/40 text-slate-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-navy-border/20">
          
          {/* Brand Col - Span 4 */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="relative w-8 h-8 rounded-[22.5%] overflow-hidden bg-white shadow-sm p-0.5 border border-slate-200/50 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo1.png"
                  alt="Jaipur Ride Logo"
                  fill
                  sizes="32px"
                  className="object-cover rounded-[19%]"
                />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight whitespace-nowrap">
                <span className="text-white">Jaipur</span>
                <span className="text-brand-pink">Ride</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isEn 
                ? "The premier companion guide to navigating the Jaipur Metro system. Fast, modern, offline-capable, and designed with travelers in mind."
                : "जयपुर मेट्रो प्रणाली को नेविगेट करने के लिए प्रमुख गाइड। तेज, आधुनिक, ऑफ़लाइन-सक्षम, और यात्रियों को ध्यान में रखकर तैयार की गई है।"}
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <div>
                <strong>{isEn ? "Email Support:" : "ईमेल समर्थन:"}</strong>{" "}
                <a href="mailto:jaint0910@gmail.com" className="text-brand-pink hover:underline">
                  jaint0910@gmail.com
                </a>
              </div>
              <div>
                <strong>{isEn ? "Developer Contact:" : "डेवलपर संपर्क:"}</strong>{" "}
                <a href="https://www.tusharjain.in/contact" target="_blank" rel="noopener noreferrer" className="text-brand-pink hover:underline">
                  tusharjain.in/contact
                </a>
              </div>
            </div>
            <div className="pt-1 text-xs text-slate-500 leading-relaxed border-l-2 border-brand-pink pl-3">
              <strong>{isEn ? "Disclaimer:" : "अस्वीकरण:"}</strong>{" "}
              {isEn
                ? "Not affiliated with JMRC (Jaipur Metro Rail Corporation). Fares and timings are estimates for guidance only."
                : "JMRC (जयपुर मेट्रो रेल कॉर्पोरेशन) से संबद्ध नहीं है। किराए और समय केवल मार्गदर्शन के लिए अनुमान हैं।"}
            </div>
          </div>

          {/* Quick Links - Span 2 */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-5 flex items-center space-x-2">
              <Train className="w-3.5 h-3.5 text-brand-pink" />
              <span>{isEn ? "Explore" : "एक्सप्लोर करें"}</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center space-x-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand-pink" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Station Hubs - Span 2 */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-5 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink"></span>
              <span>{isEn ? "Major Hubs" : "मुख्य स्टेशन"}</span>
            </h3>
            <ul className="space-y-3">
              {stationHubs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center space-x-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand-pink" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info & Legal - Span 2 */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-5 flex items-center space-x-2">
              <Info className="w-3.5 h-3.5 text-brand-pink" />
              <span>{isEn ? "Information" : "जानकारी"}</span>
            </h3>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center space-x-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-brand-pink" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics Panel - Span 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-5 flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-pink" />
              <span>{isEn ? "Platform Specs" : "विशेषताएं"}</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 bg-navy-card/40 rounded-xl border border-navy-border/40 flex items-center space-x-2">
                <Download className="w-4 h-4 text-brand-pink shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">{isEn ? "Downloads" : "डाउनलोड"}</p>
                  <p className="text-xs font-semibold text-slate-200">1,000+</p>
                </div>
              </div>
              <div className="p-3 bg-navy-card/40 rounded-xl border border-navy-border/40 flex items-center space-x-2">
                <Users className="w-4 h-4 text-brand-pink shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">{isEn ? "Active Users" : "सक्रिय उपयोगकर्ता"}</p>
                  <p className="text-xs font-semibold text-slate-200">{isEn ? "250+ Monthly" : "250+ मासिक"}</p>
                </div>
              </div>
              <div className="p-3 bg-navy-card/40 rounded-xl border border-navy-border/40 flex items-center space-x-2">
                <Signal className="w-4 h-4 text-brand-pink shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">{isEn ? "Offline Ready" : "ऑफ़लाइन तैयार"}</p>
                  <p className="text-xs font-semibold text-slate-200">{isEn ? "100% Standalone" : "100% स्टैंडअलोन"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            {isEn
              ? `© ${currentYear} Jaipur Ride. All rights reserved. Built with Next.js & Tailwind CSS. Licensed for Personal, Non-Commercial usage only.`
              : `© ${currentYear} जयपुर राइड। सर्वाधिकार सुरक्षित। Next.js और Tailwind CSS द्वारा निर्मित। केवल व्यक्तिगत, गैर-व्यावसायिक उपयोग के लिए।`}
          </p>
          <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <span>{isEn ? "Made with" : "जयपुर शहर के लिए"}</span>
            <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink animate-pulse" />
            <span>{isEn ? "for the Pink City" : "प्रेम पूर्वक निर्मित"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
