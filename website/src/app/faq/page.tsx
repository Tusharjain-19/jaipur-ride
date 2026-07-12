"use client";

import React, { useState } from "react";
import faqData from "@/data/faq.json";
import { HelpCircle, Search, MessageSquare, ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.filter((faq) => {
    const q = language === "en" ? faq.question : faq.questionHi;
    const a = language === "en" ? faq.answer : faq.answerHi;
    return (
      q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-pink/10 text-brand-pink border border-brand-pink/20">
          💬 {language === "en" ? "Knowledge Base" : "ज्ञान केंद्र"}
        </span>
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
          {language === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
        </h1>
        <p className="text-base text-foreground/75 leading-relaxed">
          Find answers to ticketing policies, operational rules, smart cards, and Jaipur Ride mobile app details.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/45">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={language === "en" ? "Search questions or answers..." : "प्रश्नों या उत्तरों को खोजें..."}
          className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground shadow-sm"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-sm text-foreground/50 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40">
            No FAQs match your search query. Try searching for "timing", "fare", "card", or "student".
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer focus:outline-none select-none">
                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-brand-pink transition-colors pr-4 flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-brand-pink/50 group-open:text-brand-pink shrink-0" />
                  <span>{language === "en" ? faq.question : faq.questionHi}</span>
                </h3>
                <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink ml-2">
                  <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    width="20"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-foreground/75 leading-relaxed border-t border-light-border/40 dark:border-navy-border/20 pt-4 bg-light-accent/30 dark:bg-navy-card/10">
                <p>{language === "en" ? faq.answer : faq.answerHi}</p>
              </div>
            </details>
          ))
        )}
      </div>

      {/* Footer Support CTA */}
      <div className="bg-light-accent dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-[32px] p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center text-brand-pink mx-auto">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-lg text-foreground">Still have questions?</h3>
          <p className="text-xs text-foreground/50">Our team can clarify JMRC policies or explain app installation queries.</p>
        </div>
        <div className="pt-2">
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-pink hover:bg-brand-pink-dark text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-102"
          >
            <span>Open Feedback Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
