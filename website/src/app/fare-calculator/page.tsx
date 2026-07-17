"use client";

import React, { useState, useEffect } from "react";
import stationsData from "@/data/stations.json";
import faresData from "@/data/fares.json";
import { Train, Info, Calculator, CreditCard, Award, ArrowUpDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FareCalculatorPage() {
  const { t, language } = useLanguage();

  const [origin, setOrigin] = useState("J01");
  const [destination, setDestination] = useState("J02");
  const [calculatedFares, setCalculatedFares] = useState({
    stationsCount: 0,
    cash: 0,
    smartCard: 0,
    student: 0,
    senior: 0,
  });

  useEffect(() => {
    // Find index of stations to calculate distance in hops
    const originIdx = stationsData.findIndex((s) => s.id === origin);
    const destIdx = stationsData.findIndex((s) => s.id === destination);

    if (originIdx !== -1 && destIdx !== -1) {
      const hops = Math.abs(originIdx - destIdx);
      
      // Calculate cash fare based on rules
      const rule = faresData.rules.find((r) => hops >= r.minStations && hops <= r.maxStations);
      const cash = rule ? rule.cashFare : 0;

      // Apply discounts
      const smartCard = Math.round((cash * (1 - faresData.discounts.smartCard)) * 100) / 100;
      const student = Math.round((cash * (1 - faresData.discounts.student)) * 100) / 100;
      const senior = Math.round((cash * (1 - faresData.discounts.seniorCitizen)) * 100) / 100;

      setCalculatedFares({
        stationsCount: hops,
        cash,
        smartCard,
        student,
        senior,
      });
    }
  }, [origin, destination]);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title Header */}
      <div className="text-center lg:text-left space-y-4 max-w-3xl">

        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
          {language === "en" ? "Jaipur Metro Fare Calculator" : "जयपुर मेट्रो किराया कैलकुलेटर"}
        </h1>
        <p className="text-base text-foreground/75 leading-relaxed">
          Estimate trip ticketing costs across the Pink Line instantly. Compare cash tickets, smart cards, and concession passes.
        </p>
      </div>

      {/* Main Calculator Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs & Fare Calculations */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
            <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-brand-pink" />
              <span>Select Route Details</span>
            </h2>

            {/* Inputs Container */}
            <div className="space-y-4 relative">
              
              {/* Origin Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Starting Station</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-3.5 bg-light-accent dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-pink cursor-pointer font-medium"
                >
                  {stationsData.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.id} - {language === "en" ? st.name : st.nameHi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center my-[-8px] relative z-10">
                <button
                  onClick={handleSwap}
                  className="p-2.5 rounded-full bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/50 text-brand-pink shadow-md hover:scale-105 active:scale-95 transition-all"
                  title="Swap Stations"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Destination Station</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3.5 bg-light-accent dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-xl text-sm text-foreground focus:outline-none focus:border-brand-pink cursor-pointer font-medium"
                >
                  {stationsData.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.id} - {language === "en" ? st.name : st.nameHi}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Calculations Card Panel */}
            {origin === destination ? (
              <div className="p-4 bg-light-accent dark:bg-navy-card/50 rounded-2xl border border-light-border dark:border-navy-border/30 text-center text-sm text-foreground/60">
                Please select different starting and destination stations.
              </div>
            ) : (
              <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 pt-2">
                
                {/* Cash Token */}
                <div className="p-4 bg-brand-pink/5 rounded-2xl border border-brand-pink/15 text-center space-y-1">
                  <p className="text-[10px] text-brand-pink font-bold uppercase tracking-wider leading-none">Single Cash</p>
                  <p className="font-heading font-extrabold text-2xl text-brand-pink">₹{calculatedFares.cash}</p>
                  <p className="text-[9px] text-foreground/40 font-medium">Token Purchase</p>
                </div>

                {/* Smart Card */}
                <div className="p-4 bg-light-accent dark:bg-navy-card rounded-2xl border border-light-border dark:border-navy-border/40 text-center space-y-1">
                  <p className="text-[10px] text-foreground/60 font-bold uppercase tracking-wider leading-none">Smart Card</p>
                  <p className="font-heading font-extrabold text-2xl text-foreground">₹{calculatedFares.smartCard}</p>
                  <p className="text-[9px] text-emerald-500 font-bold">Save 10%</p>
                </div>

                {/* Senior Citizen */}
                <div className="p-4 bg-light-accent dark:bg-navy-card rounded-2xl border border-light-border dark:border-navy-border/40 text-center space-y-1">
                  <p className="text-[10px] text-foreground/60 font-bold uppercase tracking-wider leading-none">Senior Pass</p>
                  <p className="font-heading font-extrabold text-2xl text-foreground">₹{calculatedFares.senior}</p>
                  <p className="text-[9px] text-emerald-500 font-bold">Save 25%</p>
                </div>

              </div>
            )}
            
            <div className="pt-2 text-xs text-foreground/50 text-center leading-relaxed">
              Calculated for <strong>{calculatedFares.stationsCount} station hops</strong>. Ticketing transactions occur at JMRC counters.
            </div>

          </div>
        </div>

        {/* Right Side: Fare Matrix Explanation */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Official JMRC Fare Table */}
          <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-foreground flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-brand-pink" />
              <span>Official Bracket Rates</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-light-border dark:border-navy-border/20 text-foreground/50 font-bold">
                    <th className="pb-2">Station Hops</th>
                    <th className="pb-2 text-right">Cash Token</th>
                    <th className="pb-2 text-right">Smart Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border/40 dark:divide-navy-border/10">
                  {faresData.rules.map((rule, idx) => (
                    <tr key={idx} className="text-foreground/80 font-medium">
                      <td className="py-2.5">
                        {rule.minStations === rule.maxStations
                          ? `${rule.minStations} Station`
                          : rule.maxStations === 99
                          ? `${rule.minStations}+ Stations`
                          : `${rule.minStations} - ${rule.maxStations} Stations`}
                      </td>
                      <td className="py-2.5 text-right font-semibold">₹{rule.cashFare}</td>
                      <td className="py-2.5 text-right text-emerald-500 font-semibold">
                        ₹{Math.round((rule.cashFare * 0.9) * 100) / 100}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Discounts details */}
          <div className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-foreground flex items-center space-x-2">
              <Award className="w-4 h-4 text-brand-pink" />
              <span>Concession Passes</span>
            </h3>
            <ul className="text-xs space-y-2 text-foreground/75 leading-relaxed">
              <li>• <strong>Smart Card Users:</strong> 10% discount on every transaction. Rechargeable at stations.</li>
              <li>• <strong>Student Concessions:</strong> 15% off JMRC fares with verified institutional IDs.</li>
              <li>• <strong>Senior Citizens (60+):</strong> 25% direct concession on metro gates.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
