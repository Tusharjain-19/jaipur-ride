"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Train, Info, Heart, ArrowRight, ShieldCheck, Download, Users, Signal } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: t("navHome") },
    { href: "/journey-planner", label: t("navPlanner") },
    { href: "/metro-stations", label: t("navStations") },
    { href: "/metro-map", label: t("navMap") },
    { href: "/explore-jaipur", label: t("navExplore") },
    { href: "/fare-calculator", label: "Fare Calculator" },
    { href: "/timings", label: "Timings" },
    { href: "/features", label: t("navFeatures") },
  ];

  const stationHubs = [
    { href: "/metro-stations/J01", name: "Mansarovar (J01)" },
    { href: "/metro-stations/J06", name: "Railway Station (J06)" },
    { href: "/metro-stations/J07", name: "Sindhi Camp (J07)" },
    { href: "/metro-stations/J09", name: "Chandpole (J09)" },
    { href: "/metro-stations/J11", name: "Badi Chaupar (J11)" },
  ];

  const infoLinks = [
    { href: "/download", label: t("navDownload") },
    { href: "/about", label: t("navAbout") },
    { href: "/contact", label: t("navContact") },
    { href: "/faq", label: t("navFaq") },
    { href: "/changelog", label: "Changelog" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" }
  ];

  return (
    <footer className="w-full bg-linear-to-b from-navy-dark via-[#070b16] to-[#03050a] border-t border-navy-border/40 text-slate-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-navy-border/20">
          
          {/* Brand Col - Span 4 */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-0.5 border border-brand-pink/20">
                <Image src="/logo1.png" alt="Jaipur Ride" fill className="object-cover" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight bg-linear-to-r from-brand-pink to-brand-pink-dark bg-clip-text text-transparent">
                Jaipur Ride
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier companion guide to navigating the Jaipur Metro system. Fast, modern, offline-capable, and designed with travelers in mind.
            </p>
            <div className="pt-2 text-xs text-slate-500 leading-relaxed border-l-2 border-brand-pink pl-3">
              <strong>Disclaimer:</strong> Not affiliated with JMRC (Jaipur Metro Rail Corporation). Fares and timings are estimates for guidance only.
            </div>
          </div>

          {/* Quick Links - Span 2 */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-slate-200 mb-5 flex items-center space-x-2">
              <Train className="w-3.5 h-3.5 text-brand-pink" />
              <span>Explore</span>
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
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-pulse"></span>
              <span>Major Hubs</span>
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
              <span>Information</span>
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
              <span>Platform Specs</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3 bg-navy-card/60 rounded-xl border border-navy-border/40 flex items-center space-x-2">
                <Download className="w-4 h-4 text-brand-pink shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">Downloads</p>
                  <p className="text-xs font-semibold text-slate-200">50,000+</p>
                </div>
              </div>
              <div className="p-3 bg-navy-card/60 rounded-xl border border-navy-border/40 flex items-center space-x-2">
                <Users className="w-4 h-4 text-brand-pink shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">Active Users</p>
                  <p className="text-xs font-semibold text-slate-200">12,000+ Monthly</p>
                </div>
              </div>
              <div className="p-3 bg-navy-card/60 rounded-xl border border-navy-border/40 flex items-center space-x-2">
                <Signal className="w-4 h-4 text-brand-pink shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">Offline Ready</p>
                  <p className="text-xs font-semibold text-slate-200">100% Standalone</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {currentYear} Jaipur Ride. All rights reserved. Built with Next.js & Tailwind CSS. Licensed for Personal, Non-Commercial usage only.
          </p>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink animate-pulse" />
            <span>for the Pink City</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
