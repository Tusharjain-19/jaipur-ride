"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export default function FaqAccordion({
  items,
  title = "Frequently Asked Questions",
  description = "Quick answers to popular Jaipur Metro travel queries.",
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-brand-pink font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Help & Travel Information</span>
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-foreground/70">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-light-border dark:border-navy-border/30 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 sm:p-5 font-heading font-bold text-sm sm:text-base text-foreground flex items-center justify-between gap-4 bg-light-accent/30 dark:bg-navy-card/40 hover:bg-light-accent dark:hover:bg-navy-card transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-pink shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="p-4 sm:p-5 bg-white dark:bg-navy-dark text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans border-t border-light-border/40 dark:border-navy-border/20">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
