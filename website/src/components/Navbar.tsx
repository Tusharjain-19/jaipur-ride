"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
    { href: "/journey-planner", label: t("navPlanner") },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white shadow-md dark:shadow-navy-deep p-0.5 border border-brand-pink/20">
              <Image
                src="/logo1.png"
                alt="Jaipur Ride"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight bg-linear-to-r from-brand-pink to-brand-pink-dark bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Jaipur Ride
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    link.highlight
                      ? "ml-3 bg-brand-pink text-white hover:bg-brand-pink-dark shadow-md shadow-brand-pink/20 hover:scale-[1.02] flex items-center space-x-1.5"
                      : isActive
                      ? "text-brand-pink bg-brand-pink/10 dark:bg-brand-pink/5 font-semibold"
                      : "text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60"
                  }`}
                >
                  {link.highlight && <Download className="w-4 h-4" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Utility Buttons (Theme, Lang, Mobile Menu) */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <button
              onClick={handleLangToggle}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-1 text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60 transition-colors border border-light-border dark:border-navy-border/40"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="w-4 h-4 text-brand-pink animate-pulse" />
              <span>{language === "en" ? "हिन्दी" : "EN"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60 transition-colors border border-light-border dark:border-navy-border/40"
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
              className="p-2 lg:hidden rounded-xl text-foreground hover:bg-light-accent dark:hover:bg-navy-light/60 transition-colors border border-light-border dark:border-navy-border/40"
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
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      link.highlight
                        ? "mt-4 bg-brand-pink text-white hover:bg-brand-pink-dark text-center shadow-lg shadow-brand-pink/20 flex items-center justify-center space-x-2"
                        : isActive
                        ? "text-brand-pink bg-brand-pink/10 dark:bg-brand-pink/5 font-semibold border-l-4 border-brand-pink pl-3"
                        : "text-foreground/80 hover:text-brand-pink hover:bg-light-accent dark:hover:bg-navy-light/60"
                    }`}
                  >
                    {link.highlight && <Download className="w-5 h-5" />}
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
