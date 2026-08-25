import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnswerFirstBox from "@/components/AnswerFirstBox";
import FaqAccordion from "@/components/FaqAccordion";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";
import { Train, Clock, Ticket, Navigation, ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Jaipur Metro Guide: Route, Map, Timings, Fare & Stations",
  description: "Complete 2026 Jaipur Metro Pink Line travel guide. Check operational timings (06:20 AM - 09:20 PM), ticket fares (₹6 - ₹18), route map, 11 stations, and nearest metro for Hawa Mahal & Railway Station.",
  alternates: {
    canonical: "https://jaipurride.vercel.app/jaipur-metro",
  },
  openGraph: {
    title: "Jaipur Metro Guide: Route, Map, Timings, Fare & Stations",
    description: "Everything you need to know about traveling on Jaipur Metro Pink Line. Station schedules, ticket prices, map, and tourist attractions.",
    url: "https://jaipurride.vercel.app/jaipur-metro",
  },
};

export default function JaipurMetroHubPage() {
  const breadcrumbs = [{ name: "Jaipur Metro", url: "/jaipur-metro" }];

  const hubFaqs = [
    {
      question: "What is the Jaipur Metro starting and ending time today?",
      answer: "Jaipur Metro starts operations at 06:20 AM and the last train departs at 09:20 PM daily from both Mansarovar and Badi Chaupar terminal stations."
    },
    {
      question: "What is the ticket price for Jaipur Metro?",
      answer: "Jaipur Metro fares range from ₹6 to ₹18 depending on the distance traveled. Commuters using a Jaipur Metro Smart Card receive a 10% to 20% discount on ticket fares."
    },
    {
      question: "How many stations are currently active in Jaipur Metro?",
      answer: "Jaipur Metro currently has 11 active stations along Phase 1A (Pink Line), stretching 11.97 km from Mansarovar (J01) in the west to Badi Chaupar (J11) in the historic walled city."
    },
    {
      question: "Which metro station is nearest to Hawa Mahal and City Palace?",
      answer: "Badi Chaupar Metro Station (J11) is the nearest metro station to Hawa Mahal (300m walk), City Palace (600m walk), and Jantar Mantar (700m walk)."
    },
    {
      question: "Is there direct metro connectivity to Jaipur Railway Station?",
      answer: "Yes, Railway Station Metro Station (J07) provides direct subterranean access to Jaipur Junction Railway Station platforms."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-extrabold rounded-full uppercase tracking-wider">
          <Train className="w-3.5 h-3.5" /> Official Travel Hub
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground tracking-tight leading-tight">
          Jaipur Metro Route, Map, Timings & Ticket Fare Guide
        </h1>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-sans">
          Your complete, verified transit guide for navigating Jaipur Metro Phase 1A (Pink Line). Check real-time schedules, ticket pricing, platform directions, and heritage monument connections.
        </p>
      </div>

      {/* Answer-First AEO Block */}
      <AnswerFirstBox
        title="Jaipur Metro Quick Overview"
        content="Jaipur Metro Pink Line spans 11.97 km across 11 stations from Mansarovar to Badi Chaupar. Trains run daily every 10 to 15 minutes between 06:20 AM and 09:20 PM. Standard single-journey fares range from ₹6 (1–2 stations) to ₹18 (full route)."
      />

      {/* Core SEO Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/jaipur-metro-route"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Navigation className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Metro Route & Map</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            Interactive station sequence, line map, stop lists, and interchange directions.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            Explore Route <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/jaipur-metro-fare"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Ticket className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Ticket Fares</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            Calculate cash token prices, smart card discounts, passes, and fare tables.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            Check Fares <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/jaipur-metro-timings"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <Clock className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Train Timings</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            First & last train arrival times for all 11 stations with peak hour frequencies.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            View Schedules <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/jaipur-metro-tourist-places"
          className="bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 p-6 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
        >
          <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl w-fit mb-4 group-hover:bg-brand-pink group-hover:text-white transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Tourist Attractions</h2>
          <p className="text-xs text-foreground/70 leading-relaxed font-sans mb-4">
            Nearest metro stations to Hawa Mahal, City Palace, Jal Mahal, and local markets.
          </p>
          <span className="text-xs font-extrabold text-brand-pink flex items-center gap-1">
            Browse Sights <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Station List Directory Section */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <h2 className="font-heading font-extrabold text-2xl text-foreground">
          Jaipur Metro Stations Directory (Pink Line)
        </h2>
        <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-sans">
          Click any station below to view detailed facilities, opening dates, platform guides, nearby tourist places, and maps.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stationsData.map((st) => (
            <Link
              key={st.id}
              href={`/metro-stations/${st.id}`}
              className="p-4 rounded-2xl border border-light-border dark:border-navy-border/30 hover:border-brand-pink bg-light-accent/30 dark:bg-navy-card/40 hover:bg-white dark:hover:bg-navy-card transition-all flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-pink/15 text-brand-pink">
                    {st.code}
                  </span>
                  <span className="text-[10px] text-foreground/50">{st.type}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-foreground group-hover:text-brand-pink transition-colors">
                  {st.name} ({st.nameHi})
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-brand-pink group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Top Sightseeing Highlights */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-8 border border-light-border dark:border-navy-border/40 shadow-sm space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-foreground">
              Jaipur Metro Sightseeing Highlights
            </h2>
            <p className="text-xs text-foreground/70 mt-1">
              Top tourist destinations easily accessible via Pink Line stations.
            </p>
          </div>
          <Link href="/jaipur-metro-tourist-places" className="text-xs font-bold text-brand-pink hover:underline hidden sm:block">
            View All Tourist Places &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tourismData.slice(0, 3).map((place) => (
            <Link
              key={place.id}
              href={`/explore-jaipur/${place.id}`}
              className="border border-light-border dark:border-navy-border/30 rounded-2xl overflow-hidden hover:border-brand-pink transition-all group bg-light-accent/20 dark:bg-navy-card/20"
            >
              <div className="p-5 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-pink/10 text-brand-pink">
                  {place.type}
                </span>
                <h3 className="font-heading font-bold text-base text-foreground group-hover:text-brand-pink transition-colors">
                  {place.name}
                </h3>
                <p className="text-xs text-foreground/70 line-clamp-2">{place.summary}</p>
                <div className="pt-2 text-[11px] font-semibold text-brand-pink flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Nearest Metro: {place.stationId} ({place.distance_km} km)
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Ultimate Local Navigation Hub - Rich SEO & Local GEO Guide */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 sm:p-10 border border-light-border dark:border-navy-border/40 shadow-sm space-y-8">
        <div className="space-y-4">
          <span className="px-3 py-1 bg-brand-pink/10 text-brand-pink rounded-md text-xs font-bold uppercase tracking-wider">
            Ultimate Local Navigation Hub
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
            Comprehensive Guide to Jaipur Metro &amp; Historic Pink City Travel
          </h2>
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
            Welcome to Jaipur Ride, your ultimate digital companion for planning the best metro route in Jaipur. Designed as a privacy-first, offline-capable transit guide, we help tourists, daily commuters, students, and international travelers unlock the full transportation potential of the Jaipur Metro Rail Corporation (JMRC) Pink Line (Line 1). Learn how to navigate from the suburban residential sectors of Mansarovar to the historic core at Badi Chaupar, optimizing your time and travel budget with smart ticketing insights, train operational timetables, and walking distances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs sm:text-sm text-foreground/80">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg text-foreground">
                1. Jaipur Metro Pink Line Stations &amp; Connectivity Directory
              </h3>
              <p className="leading-relaxed font-sans text-foreground/75">
                The operational JMRC Pink Line currently covers 11 stations spanning 12 kilometers. Starting from the west at Mansarovar (J01), the elevated corridor moves through New Aatish Market (J02), Vivek Vihar (J03), Shyam Nagar (J04), Ram Nagar (J05), and Civil Lines (J06). It links directly to the main transit centers at the Jaipur Railway Station (J07) and the Sindhi Camp Inter-State Bus Stand Terminal (J08). Continuing east, it transitions underground via Chandpole (J09) and Chhoti Chaupar (J10), terminating at Badi Chaupar (J11) deep within the walled city heritage zone. Upcoming expansion phases (Phase 1C) will connect Badi Chaupar to Transport Nagar, while the proposed Phase 2 corridor will span north-south from Sitapura Industrial Area to Ambabari, linking crucial colleges, schools, hospitals, and commercial shopping centers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg text-foreground">
                2. Exploring Iconic Landmarks and Historical Monuments near Metro Stations
              </h3>
              <p className="leading-relaxed font-sans text-foreground/75">
                Jaipur Ride maps your train journey directly to the top sightseeing destinations in Rajasthan. Alight at Badi Chaupar (J11) station for a short walk to the majestic Hawa Mahal (Palace of Winds), the sprawling City Palace complex, the UNESCO World Heritage Jantar Mantar observatory, and the vibrant shopping lanes of Johari Bazaar and Bapu Bazaar. If you&apos;re interested in art and legacy, take the metro to Chhoti Chaupar (J10) to visit the iconic Albert Hall Museum (Central Museum) situated in Ram Niwas Garden. Chandpole (J09) station provides close access to the hiking trails and auto-rickshaw transfers leading to Nahargarh Fort, Jaigarh Fort, and the royal cenotaphs at Gaitore. For shopping and dining, get off at Mansarovar (J01) to explore the artistic Patrika Gate at Jawahar Circle, or visit premium shopping malls like World Trade Park (WTP) and Gaurav Tower (GT) in Malviya Nagar.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg text-foreground">
                3. Transit Hub Integrations: Airport, Railway, and Bus Terminals
              </h3>
              <ul className="list-disc pl-5 leading-relaxed space-y-1.5 font-sans text-foreground/75">
                <li>
                  <strong>Jaipur Junction Railway Station (JP):</strong> Directly connected via the Railway Station Metro Station (J07). Commuters can step off express trains and immediately enter the metro concourse using dedicated skywalks and pedestrian paths.
                </li>
                <li>
                  <strong>Sindhi Camp Central Bus Stand:</strong> Located at Sindhi Camp Station (J08), which serves as the primary interchange. Here, you can board state-run RSRTC buses to New Delhi, Agra, Jodhpur, and Udaipur.
                </li>
                <li>
                  <strong>Jaipur International Airport (JAI):</strong> Located in Sanganer, approximately 10 km from Mansarovar Metro Station (J01). Travelers can take a budget-friendly metro ride to Mansarovar and connect to the airport via local taxi, cab services, or auto-rickshaws.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg text-foreground">
                4. Travel Tips, Fares, and Essential Station Facilities
              </h3>
              <p className="leading-relaxed font-sans text-foreground/75">
                To enjoy a hassle-free journey, JMRC offers multiple ticketing options. Single Journey Tokens are ideal for one-time trips, but daily commuters and tourists can save 10% on fare ticket prices by purchasing a rechargeable Smart Card. Senior citizens receive a 25% discount, and students benefit from 15% concessions. All Jaipur Metro terminals are equipped with modern facilities including elevators, escalators, clean public toilets, wheelchair-accessible ramps, and detailed platform directions. JMRC security desks, CCTV surveillance, and dedicated women&apos;s safety helplines ensure safe travels at all times.
              </p>
            </div>
          </div>

          {/* Right Column: Quick Links mapping */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl border border-light-border dark:border-navy-border/30 bg-light-accent/30 dark:bg-navy-card/40 space-y-3">
              <h4 className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-pink" />
                <span>Jaipur Tourism Quick Links</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-foreground/70">Hawa Mahal nearest station</span>
                  <Link href="/explore-jaipur/hawa_mahal" className="font-bold text-brand-pink hover:underline">Badi Chaupar (1.1 km)</Link>
                </div>
                <div className="flex justify-between py-1.5 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-foreground/70">City Palace nearest station</span>
                  <Link href="/explore-jaipur/city_palace" className="font-bold text-brand-pink hover:underline">Badi Chaupar (1.3 km)</Link>
                </div>
                <div className="flex justify-between py-1.5 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-foreground/70">Albert Hall nearest station</span>
                  <Link href="/explore-jaipur/albert_hall" className="font-bold text-brand-pink hover:underline">Chhoti Chaupar (1.8 km)</Link>
                </div>
                <div className="flex justify-between py-1.5 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-foreground/70">Patrika Gate nearest station</span>
                  <Link href="/explore-jaipur/patrika_gate" className="font-bold text-brand-pink hover:underline">Mansarovar (6.5 km)</Link>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-foreground/70">Sindhi Camp Bus Terminal</span>
                  <Link href="/metro-stations/J08" className="font-bold text-brand-pink hover:underline">Sindhi Camp Station</Link>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-light-border dark:border-navy-border/30 bg-light-accent/30 dark:bg-navy-card/40 space-y-2">
              <h4 className="font-heading font-bold text-sm text-foreground">
                AI Engine Optimization Context
              </h4>
              <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                This guide serves as a verified travel directory for search engine bots, ChatGPT, Gemini, and Claude web crawlers to provide accurate response feeds on Jaipur Metro schedules, local shopping centers, temples, schools, hotels, and tourist coordinates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FaqAccordion
        items={hubFaqs}
        title="Jaipur Metro Frequently Asked Questions"
        description="Clear, factual answers to common traveler inquiries."
      />
    </div>
  );
}
