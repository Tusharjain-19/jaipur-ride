import React from "react";
import { Metadata } from "next";
import faqData from "@/data/faq.json";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
  title: "Jaipur Metro FAQ | Tickets, Smart Cards, Fares, & Timings",
  description: "Find answers to frequently asked questions about Jaipur Metro Pink Line. Learn about train operating hours, smart card purchases, ticket pricing, and tourist cards.",
  keywords: [
    "jaipur metro faq",
    "jaipur metro questions",
    "jaipur metro rules",
    "how to buy jaipur metro card",
    "jaipur metro ticket price",
    "jaipur metro timings",
    "jaipur metro helpline"
  ]
};

export default function FAQPage() {
  // Pre-generate FAQPage JSON-LD schema for search engine crawlers
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.slice(0, 15).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
            Jaipur Metro - FAQs
          </h1>
          <p className="text-base text-foreground/75 leading-relaxed font-sans">
            Find answers to ticketing policies, operational rules, smart cards, and Jaipur Ride mobile app details.
          </p>
        </div>

        {/* Client Accordion Interactivity */}
        <FaqClient initialFaqs={faqData} language="en" />
      </div>
    </>
  );
}
