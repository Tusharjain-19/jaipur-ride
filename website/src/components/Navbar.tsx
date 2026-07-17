"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X, Sun, Moon, Globe, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: "/", label: t("navHome") },
    { href: "/simulation", label: t("navSimulator") },
    { href: "/metro-stations", label: t("navStations") },
    { href: "/metro-map", label: t("navMap") },
    { href: "/explore-jaipur", label: t("navExplore") },
    { href: "/features", label: t("navFeatures") },
    { href: "/download", label: t("navDownload"), highlight: true }
  ];

  const handleLangToggle = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-light-border/40 dark:border-navy-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 shrink-0 group select-none">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-[22.5%] overflow-hidden bg-white dark:bg-navy-card shadow-md p-0.5 border border-slate-200/50 dark:border-navy-border/60 shrink-0 flex items-center justify-center">
              <Image
                src="/logo1.png"
                alt="Jaipur Ride Logo"
                fill
                sizes="(max-width: 640px) 36px, 44px"
                className="object-cover rounded-[19%]"
                priority
              />
            </div>
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight whitespace-nowrap group-hover:opacity-90 transition-opacity">
              <span className="text-slate-900 dark:text-white transition-colors duration-300">Jaipur</span>
              <span className="text-brand-pink">Ride</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center lg:space-x-2.5 xl:space-x-4 max-w-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.highlight) {
                return (
                  <a
                    key={link.href}
                    href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:ml-3 xl:ml-4 hover:scale-[1.05] active:scale-[0.95] transition-all shrink-0 inline-flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src="/assets/icons/google-play.svg"
                      alt="Get it on Google Play"
                      width={155}
                      height={46}
                      className="h-11 w-auto shrink-0 select-none object-contain"
                    />
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "lg:px-3 lg:py-2.5 xl:px-4 xl:py-2.5 text-brand-pink bg-brand-pink/10 dark:bg-brand-pink/5 lg:text-sm xl:text-sm"
                      : "lg:px-3 lg:py-2.5 xl:px-4 xl:py-2.5 text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60 lg:text-sm xl:text-sm"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Utility Buttons (Theme, Lang, Mobile Menu) */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={handleLangToggle}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1 text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60 transition-colors border border-light-border dark:border-navy-border/40 whitespace-nowrap cursor-pointer"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-pink shrink-0" />
              <span>{language === "en" ? "हिन्दी" : "EN"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-foreground hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60 transition-colors border border-light-border dark:border-navy-border/40 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-navy-dark" />
              ) : (
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 lg:hidden rounded-xl text-foreground hover:bg-light-accent dark:hover:bg-navy-light/60 transition-colors border border-light-border dark:border-navy-border/40 cursor-pointer"
              aria-label="Open menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-light-border/40 dark:border-navy-border/40 bg-light-bg/95 dark:bg-navy-dark/95 backdrop-blur-md overflow-hidden shadow-inner"
          >
            <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                if (link.highlight) {
                  return (
                    <a
                      key={link.href}
                      href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="mt-4 hover:scale-[1.05] active:scale-[0.95] transition-all flex justify-center cursor-pointer"
                    >
                      <Image
                        src="/assets/icons/google-play.svg"
                        alt="Get it on Google Play"
                        width={196}
                        height={58}
                        className="h-14 w-auto shrink-0 select-none object-contain"
                      />
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? "text-brand-pink bg-brand-pink/10 dark:bg-brand-pink/5 border-l-4 border-brand-pink pl-3"
                        : "text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
