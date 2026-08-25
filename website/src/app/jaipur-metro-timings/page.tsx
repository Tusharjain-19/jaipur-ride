import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import FaqAccordion from "@/components/FaqAccordion";
import stationsData from "@/data/stations.json";
import { Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Jaipur Metro Timings Today: First & Last Train Schedule 2026",
  description: "Check Jaipur Metro operational timings today. First train departs at 06:20 AM and last train at 09:20 PM from Mansarovar & Badi Chaupar. View station timings & frequencies.",
  alternates: {
    canonical: "https://jaipurride.vercel.app/jaipur-metro-timings",
  },
  openGraph: {
    title: "Jaipur Metro Timings Today: First & Last Train Schedule",
    description: "Complete daily time table for Jaipur Metro Pink Line stations. Trains available every 10–15 minutes between 06:20 AM and 09:20 PM.",
    url: "https://jaipurride.vercel.app/jaipur-metro-timings",
  },
};

export default function JaipurMetroTimingsPage() {
  const breadcrumbs = [
    { name: "Jaipur Metro", url: "/jaipur-metro" },
    { name: "Timings & Schedule", url: "/jaipur-metro-timings" },
  ];

  const timingFaqs = [
    {
      question: "What time does the first metro start in Jaipur?",
      answer: "The first Jaipur Metro train departs simultaneously at 06:20 AM from both terminal stations: Mansarovar (J01) and Badi Chaupar (J11)."
    },
    {
      question: "What time is the last metro in Jaipur?",
      answer: "The last metro train departs at 09:20 PM from Mansarovar and Badi Chaupar terminals daily."
    },
    {
      question: "What is the train frequency during peak hours?",
      answer: "During morning peak hours (08:00 AM – 11:00 AM) and evening peak hours (05:00 PM – 08:00 PM), trains run every 10 minutes. During non-peak hours, headway is 15 minutes."
    },
    {
      question: "Does Jaipur Metro operate on Sundays and public holidays?",
      answer: "Yes, Jaipur Metro runs 365 days a year including Sundays and national holidays with regular operational hours (06:20 AM to 09:20 PM)."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-extrabold rounded-full uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" /> Operational Timings 2026
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          Jaipur Metro Timings Today: First & Last Train Schedule
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-sans">
          Verified timetable and dispatch schedule for all 11 active stations on the Pink Line from Mansarovar to Badi Chaupar.
        </p>
      </div>

      {/* Answer First */}
      <AnswerFirstBox
        title="Jaipur Metro Timings Summary"
        content="Jaipur Metro operates daily from 06:20 AM to 09:20 PM. Peak frequency is 10 minutes (8 AM-11 AM & 5 PM-8 PM) and non-peak frequency is 15 minutes."
      />

      {/* Station Schedule Table */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h2 className="font-heading font-extrabold text-2xl text-foreground">
            Station-wise First & Last Train Departure Timings
          </h2>
          <span className="text-xs text-foreground/60 flex items-center gap-1 font-sans">
            <Calendar className="w-3.5 h-3.5 text-brand-pink" /> Applies to Weekdays, Weekends & Holidays
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-light-border dark:border-navy-border/20">
          <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse">
            <thead>
              <tr className="bg-light-accent/50 dark:bg-navy-card border-b border-light-border dark:border-navy-border/30 font-heading font-bold text-foreground">
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Station Name</th>
                <th className="p-3.5">First Train (Eastbound)</th>
                <th className="p-3.5">First Train (Westbound)</th>
                <th className="p-3.5">Last Train</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-navy-border/20 text-foreground/80">
              {stationsData.map((st) => (
                <tr key={st.id} className="hover:bg-light-accent/20 dark:hover:bg-navy-card/20">
                  <td className="p-3.5 font-bold text-brand-pink">{st.code}</td>
                  <td className="p-3.5 font-semibold text-foreground">
                    <Link href={`/metro-stations/${st.id}`} className="hover:text-brand-pink hover:underline">
                      {st.name} ({st.nameHi})
                    </Link>
                  </td>
                  <td className="p-3.5 font-mono">{st.timings.firstTrain} AM</td>
                  <td className="p-3.5 font-mono">{st.timings.firstTrain} AM</td>
                  <td className="p-3.5 font-mono text-brand-pink font-semibold">{st.timings.lastTrain} PM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FaqAccordion items={timingFaqs} title="Jaipur Metro Timing FAQs" />
    </div>
  );
}
