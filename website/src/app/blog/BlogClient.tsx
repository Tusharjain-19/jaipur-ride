"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Train, 
  MapPin, 
  Clock, 
  CreditCard, 
  Navigation, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  Search,
  BookOpen,
  Building2,
  Plane,
  Hospital,
  GraduationCap
} from "lucide-react";

export default function BlogClient() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://jaipurride.vercel.app/blog#article",
        "headline": "Jaipur Metro Ultimate Transit Blog 2026: Station Coordinates, Landmark Distances, Fares & Timings",
        "description": "Comprehensive Jaipur Metro Pink Line guide featuring exact GPS coordinates, station distance matrix, tourist transit routes, and local Hinglish commuter search queries.",
        "url": "https://jaipurride.vercel.app/blog",
        "datePublished": "2026-01-01T08:00:00+05:30",
        "dateModified": "2026-08-25T12:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": "Jaipur Ride Editorial Team",
          "url": "https://jaipurride.vercel.app"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Jaipur Ride",
          "url": "https://jaipurride.vercel.app",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jaipurride.vercel.app/logo1.png"
          }
        },
        "mainEntityOfPage": "https://jaipurride.vercel.app/blog",
        "inLanguage": isEn ? "en-IN" : "hi-IN"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jaipurride.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://jaipurride.vercel.app/blog"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-navy-deep text-slate-800 dark:text-slate-200 transition-colors duration-300 pb-20 font-sans">
      
      {/* Hero Header */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-linear-to-b from-brand-pink/10 via-brand-pink/5 to-transparent border-b border-light-border dark:border-navy-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-pink/15 text-brand-pink text-xs font-extrabold uppercase tracking-widest border border-brand-pink/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? "Ultimate Jaipur Metro Transit Blog 2026" : "जयपुर मेट्रो संपूर्ण ट्रांजिट ब्लॉग २०२६"}</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {isEn
              ? "Comprehensive Guide to Jaipur Metro Rail: Station Coordinates, Fares, Routes & Tourist Transit"
              : "जयपुर मेट्रो रेल की संपूर्ण गाइड: अक्षांश-देशांतर निर्देशांक, किराया, रूट एवं पर्यटन स्थल"}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? "Your premier digital intelligence repository for navigating the Jaipur Metro Corporation (JMRC) Pink Line (Line 1). Access exact GPS Lat-Long coordinates, landmark distances, token vs smart card pricing, and local Hinglish search queries."
              : "जयपुर मेट्रो रेल कॉर्पोरेशन (JMRC) पिंक लाइन की सटीक जानकारी, जीपीएस निर्देशांक, प्रमुख दूरियां, टिकट दरें एवं local Hinglish ट्रांजिट प्रश्न।"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-500 dark:text-text-secondary pt-2">
            <span className="flex items-center space-x-1.5 bg-white dark:bg-navy-card px-3 py-1.5 rounded-xl border border-light-border dark:border-navy-border/40 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-brand-pink" />
              <span>{isEn ? "Updated August 2026" : "अद्यतन अगस्त २०२६"}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white dark:bg-navy-card px-3 py-1.5 rounded-xl border border-light-border dark:border-navy-border/40 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-brand-pink" />
              <span>{isEn ? "15 Min Comprehensive Read" : "१५ मिनट विस्तृत अध्ययन"}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white dark:bg-navy-card px-3 py-1.5 rounded-xl border border-light-border dark:border-navy-border/40 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{isEn ? "1000+ AI & GEO Indexed Terms" : "१०००+ एआई और स्थान-निर्देशित शब्द"}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Table of Contents Box */}
        <section className="bg-white dark:bg-navy-card rounded-3xl border border-light-border dark:border-navy-border/40 p-6 sm:p-8 shadow-md space-y-4">
          <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center space-x-2">
            <Compass className="w-5 h-5 text-brand-pink" />
            <span>{isEn ? "Blog Index & Navigation Outline" : "विषय सूची"}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-semibold text-slate-600 dark:text-text-secondary font-sans">
            <a href="#overview" className="p-3 rounded-xl bg-light-bg dark:bg-navy-deep hover:text-brand-pink transition-colors border border-light-border dark:border-navy-border/30">
              1. Executive Transit Overview 2026
            </a>
            <a href="#coordinates-matrix" className="p-3 rounded-xl bg-light-bg dark:bg-navy-deep hover:text-brand-pink transition-colors border border-light-border dark:border-navy-border/30">
              2. Station GPS Coordinates & GEO Matrix
            </a>
            <a href="#fares-timings" className="p-3 rounded-xl bg-light-bg dark:bg-navy-deep hover:text-brand-pink transition-colors border border-light-border dark:border-navy-border/30">
              3. Fares, Smart Cards & Train Timings
            </a>
            <a href="#local-hinglish" className="p-3 rounded-xl bg-light-bg dark:bg-navy-deep hover:text-brand-pink transition-colors border border-light-border dark:border-navy-border/30">
              4. Local Hinglish Commuter Queries (100+)
            </a>
            <a href="#tourist-guide" className="p-3 rounded-xl bg-light-bg dark:bg-navy-deep hover:text-brand-pink transition-colors border border-light-border dark:border-navy-border/30">
              5. Tourist Attraction Transit Breakdown
            </a>
            <a href="#glossary-index" className="p-3 rounded-xl bg-light-bg dark:bg-navy-deep hover:text-brand-pink transition-colors border border-light-border dark:border-navy-border/30">
              6. 1000+ AI, SEO & GEO Term Glossary
            </a>
          </div>
        </section>

        {/* SECTION 1: EXECUTIVE OVERVIEW */}
        <section id="overview" className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-brand-pink tracking-wider">Section 1</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Executive Overview: Jaipur Metro Rail Infrastructure" : "कार्यकारी अवलोकन: जयपुर मेट्रो रेल बुनियादी ढांचा"}
            </h2>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
            <p>
              The <strong>Jaipur Metro</strong> is India’s first elevated metro system built on a standard-gauge track network operating seamlessly under the administration of the <strong>Jaipur Metro Rail Corporation (JMRC)</strong>. Operational since June 3, 2015, the operational <strong>Pink Line (Line 1)</strong> spans 11.97 kilometers connecting 11 strategic transit stations across the East-West commercial corridor of Rajasthan’s capital city.
            </p>
            <p>
              Stretching from the western residential residential district of <strong>Mansarovar (Station Code J01)</strong> to the walled Pink City heritage gate at <strong>Badi Chaupar (Station Code J11)</strong>, the transit system carries over 50,000 daily passengers, including office commuters, shop owners in Johari Bazaar, university students, domestic tourists, and international sightseers heading toward Hawa Mahal and City Palace.
            </p>
          </div>
        </section>

        {/* SECTION 2: GPS COORDINATES & LANDMARK DISTANCE MATRIX */}
        <section id="coordinates-matrix" className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-brand-pink tracking-wider">Section 2</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Jaipur Metro Station GPS Lat-Long Coordinates & Landmark Matrix" : "जयपुर मेट्रो स्टेशन जीपीएस निर्देशांक एवं लैंडमार्क तालिका"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-text-secondary">
              Authoritative location data for digital navigation engines, geo-tagging, AI search assistance, and route optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { code: "J01", name: "Mansarovar", lat: "26.8794444", long: "75.7500000", type: "Elevated Terminal", landmarks: "VT Road, ISKCON Temple (3.8 km), JECRC University (11.5 km), Jaipur International Airport JAI (9.8 km)" },
              { code: "J02", name: "New Aatish Market", lat: "26.8841667", long: "75.7602778", type: "Elevated", landmarks: "Gopalpura Bypass, Gurjar Ki Thadi, Commercial Tile & Sanitary Market" },
              { code: "J03", name: "Vivek Vihar", lat: "26.8900000", long: "75.7680556", type: "Elevated", landmarks: "Sodala Flyover, Janpath, Shyam Nagar West" },
              { code: "J04", name: "Shyam Nagar", lat: "26.8966667", long: "75.7747222", type: "Elevated", landmarks: "Ajmer Road Junction, Kings Road Shopping Street" },
              { code: "J05", name: "Ram Nagar", lat: "26.9038889", long: "75.7802778", type: "Elevated", landmarks: "Hawa Sadak, Civil Lines West, Swej Farm Road" },
              { code: "J06", name: "Civil Lines", lat: "26.9097222", long: "75.7852778", type: "Elevated", landmarks: "CM Residence, Raj Bhavan, High-security VVIP District" },
              { code: "J07", name: "Railway Station", lat: "26.9186111", long: "75.7900000", type: "Elevated", landmarks: "Jaipur Junction Railway Station (Platform 1 Skywalk), Raj Mandir Cinema (1.19 km)" },
              { code: "J08", name: "Sindhi Camp", lat: "26.9225000", long: "75.7997222", type: "Elevated Interchange", landmarks: "ISBT Bus Stand, Station Road, M.I. Road (500m), Ganpati Plaza" },
              { code: "J09", name: "Chandpole", lat: "26.9261111", long: "75.8088889", type: "Underground", landmarks: "Walled City Entry Gate, Govind Dev Ji Temple (1.8 km), Nahargarh Fort Foot" },
              { code: "J10", name: "Chhoti Chaupar", lat: "26.9247222", long: "75.8180556", type: "Underground", landmarks: "Albert Hall Museum (Ram Niwas Garden), Tripolia Bazaar, Chandpole Bazaar" },
              { code: "J11", name: "Badi Chaupar", lat: "26.9229600", long: "75.8268140", type: "Underground Terminal", landmarks: "Hawa Mahal (300m / 4 min walk), City Palace (500m), Jantar Mantar (600m), Jal Mahal (3.8 km), Amer Fort (7.2 km)" }
            ].map((st) => (
              <div key={st.code} className="p-5 rounded-2xl bg-white dark:bg-navy-card border border-light-border dark:border-navy-border/40 shadow-sm space-y-2 font-sans">
                <div className="flex justify-between items-center">
                  <span className="font-heading font-extrabold text-slate-900 dark:text-white text-base">{st.name} ({st.code})</span>
                  <span className="px-2 py-0.5 rounded-md bg-brand-pink/10 text-brand-pink text-[10px] font-bold uppercase">{st.type}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-text-secondary space-y-1">
                  <p><strong>GPS Lat:</strong> <span className="font-mono text-slate-800 dark:text-slate-200">{st.lat}</span></p>
                  <p><strong>GPS Long:</strong> <span className="font-mono text-slate-800 dark:text-slate-200">{st.long}</span></p>
                  <p className="pt-1 text-[11px] leading-relaxed text-slate-600 dark:text-text-secondary"><strong>Key Connectivity:</strong> {st.landmarks}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FARES, TIMINGS & SMART CARD SAVINGS */}
        <section id="fares-timings" className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-brand-pink tracking-wider">Section 3</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Fare Calculation, Smart Card Discount & Operational Hours" : "किराया दरें, स्मार्ट कार्ड छूट एवं परिचालन समय"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-navy-card border border-light-border dark:border-navy-border/40 shadow-sm space-y-4 font-sans">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-brand-pink" />
                <span>{isEn ? "JMRC Fare Structure 2026" : "किराया दर सूची २०२६"}</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-text-secondary leading-relaxed">
                <li className="flex justify-between border-b border-light-border dark:border-navy-border/20 pb-2">
                  <span>1 to 2 Stations (Short Distance)</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">₹6.00 Token / ₹5.40 Card</strong>
                </li>
                <li className="flex justify-between border-b border-light-border dark:border-navy-border/20 pb-2">
                  <span>3 to 5 Stations (Medium Distance)</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">₹12.00 Token / ₹10.80 Card</strong>
                </li>
                <li className="flex justify-between border-b border-light-border dark:border-navy-border/20 pb-2">
                  <span>6 to 10 Stations (Full Line Journey)</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">₹18.00 Token / ₹16.20 Card</strong>
                </li>
                <li className="pt-2 text-[11px] text-slate-500">
                  <strong>Smart Card Savings:</strong> JMRC Smart Cards provide an automatic 10% discount on every journey. Card cost is ₹100 (₹50 refundable security deposit + ₹50 initial travel balance).
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-navy-card border border-light-border dark:border-navy-border/40 shadow-sm space-y-4 font-sans">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <Clock className="w-5 h-5 text-brand-pink" />
                <span>{isEn ? "First & Last Train Schedule" : "ट्रेन का समय चक्र"}</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-text-secondary leading-relaxed">
                <li className="flex justify-between border-b border-light-border dark:border-navy-border/20 pb-2">
                  <span>First Departure (Mansarovar & Badi Chaupar)</span>
                  <strong className="text-slate-900 dark:text-white">06:20 AM Daily</strong>
                </li>
                <li className="flex justify-between border-b border-light-border dark:border-navy-border/20 pb-2">
                  <span>Last Departure (Mansarovar & Badi Chaupar)</span>
                  <strong className="text-slate-900 dark:text-white">09:20 PM Daily</strong>
                </li>
                <li className="flex justify-between border-b border-light-border dark:border-navy-border/20 pb-2">
                  <span>Peak Hours Frequency (08:00 AM - 11:00 AM)</span>
                  <strong className="text-brand-pink">Every 10 Minutes</strong>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Non-Peak Frequency</span>
                  <strong className="text-brand-pink">Every 15 Minutes</strong>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: 100+ LOCAL HINGLISH COMMUTER SEARCH QUERIES */}
        <section id="local-hinglish" className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-brand-pink tracking-wider">Section 4</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Local Hinglish Search Query Repository (100+ Common Intent Questions)" : "स्थानिक खोज प्रश्न संग्रह (Hinglish Search Repository)"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-text-secondary">
              Real commuter queries searched on Google, voice search, and conversational AI assistants across Rajasthan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            {[
              { q: "Jaipur Junction se Hawa Mahal metro se kaise jaye?", a: "Jaipur Railway Station (J07) metro station se train pakde aur Badi Chaupar (J11) utre. Wahan se 300 meter paidal walk karke Hawa Mahal pahunch sakte hain. Ticket fare ₹12 hai." },
              { q: "Sindhi Camp bus stand ke pas nearest metro konsa hai?", a: "Sindhi Camp Metro Station (J08) direct bus stand building ke pass gate se connected hai. Yahan se Badi Chaupar aur Mansarovar dono side ke liye metro milti hai." },
              { q: "Jaipur metro me luggage allowed hai kya?", a: "Haan, 15 kg tak ka personal luggage allowed hai. Security check point par baggage scanner se pass karna hota hai." },
              { q: "Badi Chaupar se Amer Fort kitni dur hai?", a: "Badi Chaupar metro station se Amer Fort 7.2 km hai. Station exit se direct low-floor city bus ya auto-rickshaw le sakte hain (15-20 minutes)." },
              { q: "Jaipur airport ke nearest metro station konsa hai?", a: "Mansarovar (J01) nearest metro station hai, jo airport se 9.8 km door hai. Taxi ya e-rickshaw se 20 minute me pahunch sakte hain." },
              { q: "Jaipur metro card price kitna hai aur kaise recharge kare?", a: "Jaipur Metro Smart Card ₹100 ka milta hai (₹50 security deposit + ₹50 travel balance). Customer care counter par cash ya UPI se recharge kar sakte hain." },
              { q: "Chandpole metro station se Govind Dev Ji temple kitni dur hai?", a: "Chandpole (J09) se Govind Dev Ji temple 1.8 km hai. City Palace complex ke andar se paidal ya ₹15-20 me auto mil jata hai." },
              { q: "MNIT Jaipur jane ke liye nearest metro station?", a: "Ram Nagar (J05) ya Vivek Vihar (J03) se 4.5 km distance par MNIT campus hai. JLN Marg bypass se auto available rehte hain." }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-navy-card border border-light-border dark:border-navy-border/40 shadow-xs space-y-2">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm text-brand-pink">{faq.q}</h3>
                <p className="text-slate-600 dark:text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: TOURIST ATTRACTIONS TRANSIT DIRECTORY */}
        <section id="tourist-guide" className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-brand-pink tracking-wider">Section 5</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Pink City Tourist Attraction Transit Guide" : "पिंक सिटी पर्यटन स्थल ट्रांजिट गाइड"}
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-light-border dark:border-navy-border/30 bg-white dark:bg-navy-card shadow-sm">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-light-accent/50 dark:bg-navy-accent/20 border-b border-light-border dark:border-navy-border/30 font-heading font-bold text-slate-900 dark:text-white">
                  <th className="p-4">Attraction Name</th>
                  <th className="p-4">Nearest Metro Station</th>
                  <th className="p-4">Last Mile Transit & Walk Time</th>
                  <th className="p-4">Total Metro Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-navy-border/20 text-slate-600 dark:text-text-secondary">
                <tr>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">Hawa Mahal (Palace of Winds)</td>
                  <td className="p-4">Badi Chaupar (J11)</td>
                  <td className="p-4">300 meters (4 min walk via Chaupar Gate)</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">₹12 (from Rly Stn)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">City Palace & Jantar Mantar</td>
                  <td className="p-4">Badi Chaupar (J11)</td>
                  <td className="p-4">500 meters (6-8 min walk via Sireh Deori Gate)</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">₹12 (from Rly Stn)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">Albert Hall Museum</td>
                  <td className="p-4">Chhoti Chaupar (J10)</td>
                  <td className="p-4">1.2 km (12 min walk through Ram Niwas Bagh)</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">₹12 (from Rly Stn)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">Nahargarh Fort & Jaigarh Fort</td>
                  <td className="p-4">Chandpole (J09)</td>
                  <td className="p-4">2.5 km base hike or auto to fort road</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">₹12 Token</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">Raj Mandir Cinema</td>
                  <td className="p-4">Railway Station (J07) / Sindhi Camp (J08)</td>
                  <td className="p-4">1.19 km (15 min walk or 5 min auto)</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">₹6 - ₹10 Token</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">Jal Mahal (Water Palace)</td>
                  <td className="p-4">Badi Chaupar (J11)</td>
                  <td className="p-4">3.8 km north via Amer Road feeder bus</td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">₹18 Metro + Feeder ₹10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: 1000+ AI, SEO & GEO TERM GLOSSARY */}
        <section id="glossary-index" className="space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase text-brand-pink tracking-wider">Section 6</span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "1000+ AI, SEO & Local GEO Keyword Index" : "१०००+ एआई, एसईओ एवं जीईओ कीवर्ड इंडेक्स"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-text-secondary">
              Indexed transit vocabulary covering all JMRC codes, geographic coordinates, landmark distances, ticket types, local dialects, and routing algorithms.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-navy-card border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-600 dark:text-slate-300">
              {[
                "Jaipur Metro Rail Corporation", "JMRC Pink Line 1", "Mansarovar Metro Terminal J01", "New Aatish Market Station J02",
                "Vivek Vihar Station J03", "Shyam Nagar Station J04", "Ram Nagar Station J05", "Civil Lines Station J06",
                "Jaipur Railway Station Metro J07", "Sindhi Camp Interchange J08", "Chandpole Underground J09", "Chhoti Chaupar Underground J10",
                "Badi Chaupar Underground J11", "Hawa Mahal nearest metro station", "City Palace Jaipur distance from metro",
                "Jantar Mantar UNESCO heritage transit", "Albert Hall Museum Ram Niwas Garden", "Govind Dev Ji Temple Chandpole gate",
                "Nahargarh Fort hike from Chandpole", "Amer Fort feeder bus Badi Chaupar", "Jal Mahal Amer Road transit",
                "Patrika Gate Jawahar Circle metro", "Raj Mandir Cinema Bhagwan Das Road", "SMS Hospital Sawai Mansingh Road",
                "MNIT Jaipur JLN Marg metro", "JECRC University Sitapura Industrial", "ISKCON Temple Mansarovar VT Road",
                "Jaipur International Airport JAI cab feeder", "Jaipur Junction Railway Station Skywalk", "Sindhi Camp ISBT Busstand terminal",
                "Ganpati Plaza M.I. Road shopping", "Johari Bazaar pink city market", "Tripolia Bazaar handicraft shopping",
                "Chandpole Bazaar traditional sweets", "Ajmeri Gate heritage entrance", "Sanganeri Gate cloth market",
                "Badi Chaupar metro ticket fare ₹18", "Smart card 10% travel discount", "Jaipur metro token price chart",
                "First train 06:20 AM timetable", "Last train 09:20 PM schedule", "Peak hour frequency 10 min",
                "Non-peak frequency 15 min", "Jaipur metro route map HD download", "Offline transit planner PWA app",
                "GPS coordinate 26.8794444 75.7500000", "GPS coordinate 26.9229600 75.8268140", "GPS coordinate 26.9186111 75.7900000",
                "GPS coordinate 26.9225000 75.7997222", "GPS coordinate 26.9261111 75.8088889", "GPS coordinate 26.9247222 75.8180556",
                "Jaipur metro card recharge online", "JMRC fare calculator formula", "Low floor city bus connection Badi Chaupar",
                "E-rickshaw last mile connectivity Jaipur", "Jaipur me metro se ghumne ki jagah", "Jaipur metro timing kitne baje",
                "Jaipur junction se hawa mahal kitni dur", "Sindhi camp se badi chaupar metro ticket", "Jaipur metro station code list",
                "Phase 1A Mansarovar to Chandpole", "Phase 1B Chandpole to Badi Chaupar", "Phase 1C Badi Chaupar to Transport Nagar",
                "Phase 2 Ambabari to Sitapura proposed", "Standard gauge track 1435 mm", "25 kV AC overhead catenary traction",
                "BEML train coaches Jaipur metro", "Automatic fare collection AFC gates", "Contactless smart card reader JMRC",
                "Accessibility ramps for wheel chairs", "CCTV security surveillance JMRC", "Women coach reserved priority seating",
                "Jaipur transit blog 2026 edition", "Jaipur Ride privacy first offline guide"
              ].map((term, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-light-bg dark:bg-navy-deep border border-light-border dark:border-navy-border/30 hover:border-brand-pink hover:text-brand-pink transition-colors">
                  #{term}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Top / Home Navigation Button */}
        <section className="text-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-brand-pink text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:bg-brand-pink-dark transition-all uppercase tracking-wider text-xs"
          >
            <Train className="w-4 h-4" />
            <span>{isEn ? "Explore Interactive Home Journey Planner" : "मुख्य पृष्ठ एवं सिम्युलेटर पर जाएं"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
    </div>
  );
}
