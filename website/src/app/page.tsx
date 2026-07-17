"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import statistics from "@/data/statistics.json";
import faqData from "@/data/faq.json";
import tourismData from "@/data/tourism.json";
import { useLanguage } from "@/context/LanguageContext";
import PhoneMockup from "@/components/PhoneMockup";
import {
  Train as TrainIcon,
  MapPin,
  Download,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Smartphone,
  Check
} from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://jaipurride.vercel.app/#website",
        "url": "https://jaipurride.vercel.app",
        "name": "Jaipur Ride",
        "description": "Calculate the best metro route in Jaipur. Get live ticket fares, schedules, timings, interactive Pink Line station maps, nearby tourist monuments (Hawa Mahal, City Palace), local markets, and travel tips.",
        "publisher": {
          "@type": "Organization",
          "name": "Jaipur Ride"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://jaipurride.vercel.app/journey-planner?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://jaipurride.vercel.app/#localbusiness",
        "name": "Jaipur Ride Metro Guide",
        "image": "https://jaipurride.vercel.app/logo1.png",
        "url": "https://jaipurride.vercel.app",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Badi Chaupar Metro Station, Walled City",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "26.9239",
          "longitude": "75.8267"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "06:20",
          "closes": "21:20"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://jaipurride.vercel.app/#breadcrumb",
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
            "name": "Journey Planner",
            "item": "https://jaipurride.vercel.app/journey-planner"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Explore Jaipur",
            "item": "https://jaipurride.vercel.app/explore-jaipur"
          }
        ]
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://jaipurride.vercel.app/#hawamahal",
        "name": "Hawa Mahal",
        "description": "Historical Palace of Winds near Badi Chaupar Metro Station J11.",
        "image": "https://jaipurride.vercel.app/images/hawa_mahal.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://jaipurride.vercel.app/#citypalace",
        "name": "City Palace Jaipur",
        "description": "Royal Palace complex near Badi Chaupar Metro Station J11.",
        "image": "https://jaipurride.vercel.app/images/city_palace.jpg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://jaipurride.vercel.app/#faq",
        "mainEntity": faqData.map(faq => ({
          "@type": "Question",
          "name": isEn ? faq.question : faq.questionHi,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": isEn ? faq.answer : faq.answerHi
          }
        }))
      }
    ]
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          if (registration.scope === window.location.origin + "/") {
            registration.unregister().then((success) => {
              if (success) {
                console.log("Cleared hijacked root service worker registration");
                if ("caches" in window) {
                  caches.keys().then((names) => {
                    names.forEach((name) => caches.delete(name));
                  });
                }
                window.location.reload();
              }
            });
          }
        }
      });
    }
  }, []);

  const testimonials = [
    {
      content: "Your commute won't feel like a maze. 🌀 With the JaipurRide App, everything you need is in one place! Trip Planner to find the route. Details like public convenience, ticket counter, lift access, escalator, checking the availability of a taxi stand, auto-rickshaw and bus stands near metro stations, divyang-friendly features and parking availability and directions to metro stations. New! Explore nearby monuments. No more confusion. Just seamless travel, doorstep to destination.",
      contentHi: "आपकी यात्रा अब भूलभुलैया जैसी नहीं लगेगी। 🌀 जयपुरराइड ऐप के साथ, वह सब कुछ जो आपको चाहिए, एक ही स्थान पर है! मार्ग खोजने के लिए ट्रिप प्लानर, मेट्रो स्टेशनों के पास सार्वजनिक सुविधा, टिकट काउंटर, लिफ्ट एक्सेस, एस्केलेटर, टैक्सी स्टैंड, ऑटो-रिक्शा और बस स्टैंड की उपलब्धता, दिव्यांग-अनुकूल सुविधाएं और पार्किंग उपलब्धता जैसी जानकारी। नया! पास के स्मारकों को एक्सप्लोर करें। कोई भ्रम नहीं, बस निर्बाध यात्रा।",
      name: "Pooja Pal Jain",
      date: "April 21, 2026"
    },
    {
      content: "I've been using this app for a while now, and honestly, it's really impressive. The interface is clean and easy to navigate, which makes planning trips much less stressful. I especially liked how smoothly everything works, from searching destinations to checking details and plus point it also show best time to visit, it feels very user-friendly. The features are practical and actually useful, not just there for show. It saves a lot of time and makes travel planning more organized.",
      contentHi: "मैं कुछ समय से इस ऐप का उपयोग कर रही हूँ, और ईमानदारी से कहूँ तो यह वास्तव में प्रभावशाली है। इंटरफ़ेस साफ और नेविगेट करने में आसान है, जो यात्राओं की योजना बनाने को तनावमुक्त बनाता है। मुझे विशेष रूप से पसंद आया कि सब कुछ कितनी आसानी से काम करता है - स्थलों को खोजने से लेकर विवरणों की जांच करने तक और प्लस पॉइंट यह है कि यह घूमने का सबसे अच्छा समय भी दिखाता है।",
      name: "Tanisha Meena",
      date: "April 22, 2026"
    },
    {
      content: "useful app, jaipur metro needed this !!",
      contentHi: "उपयोगी ऐप, जयपुर मेट्रो को इसकी सख्त जरूरत थी !!",
      name: "Harshit Chhipa",
      date: "April 21, 2026"
    },
    {
      content: "Works great as always 🔥",
      contentHi: "हमेशा की तरह शानदार काम करता है 🔥",
      name: "Pari Sharma",
      date: "April 21, 2026"
    },
    {
      content: "perfect app for travel guide in jaipur and with safety ✨ 👍",
      contentHi: "जयपुर में यात्रा गाइड के लिए सुरक्षा के साथ एक आदर्श ऐप ✨ 👍",
      name: "Madhav Sharma",
      date: "April 21, 2026"
    },
    {
      content: "Super convenient and reliable. Never faced any issues. 5 stars!",
      contentHi: "अत्यंत सुविधाजनक और विश्वसनीय। कभी किसी समस्या का सामना नहीं करना पड़ा। 5 सितारे!",
      name: "Aashna Jaiman",
      date: "April 21, 2026"
    },
    {
      content: "Great App .... It's features are Amazing 🤠 ....It helps alot in jaipur...",
      contentHi: "शानदार ऐप .... इसकी विशेषताएं अद्भुत हैं 🤠 ....यह जयपुर में बहुत मदद करता है...",
      name: "Snehil Gaming",
      date: "April 22, 2026"
    },
    {
      content: "wonderful app for jaipur metro , truly satisfied with service and this platform ❤️",
      contentHi: "जयपुर मेट्रो के लिए अद्भुत ऐप, सेवा और इस प्लेटफॉर्म से पूरी तरह से संतुष्ट हैं ❤️",
      name: "Hansu Sharma",
      date: "April 21, 2026"
    }
  ];

  // Features Comparison data
  const compareFeatures = [
    {
      label: isEn ? "100% Offline Database (SQLite)" : "100% ऑफ़लाइन डेटाबेस (SQLite)",
      app: true,
      web: false
    },
    {
      label: isEn ? "Live GPS Train Route Calculations" : "लाइव जीपीएस ट्रेन रूट गणना",
      app: true,
      web: true
    },
    {
      label: isEn ? "Arrival Vibration Alerts (Native Haptic)" : "आगमन कंपन अलर्ट (मूल हैप्टिक)",
      app: true,
      web: false
    },
    {
      label: isEn ? "One-Tap Emergency Hotline Dialer" : "वन-टैप आपातकालीन हॉटलाइन डायलर",
      app: true,
      web: false
    },
    {
      label: isEn ? "Over-The-Air Database Updates" : "ओवर-द-एयर डेटाबेस अपडेट",
      app: true,
      web: false
    },
    {
      label: isEn ? "Smart Card Value & Fare Integration" : "स्मार्ट कार्ड मूल्य और किराया एकीकरण",
      app: true,
      web: false
    }
  ];

  // 9 Vastu Shastra Corridor items
  const corridors = [
    {
      num: "01",
      title: isEn ? "Corridor Map" : "कॉरिडोर मैप",
      subtitle: isEn ? "Line 1 Layout" : "लाइन 1 लेआउट",
      desc: isEn ? "Seamless SVG route vector tracking all 11 active station coordinates from Mansarovar to Badi Chaupar." : "मानसरोवर से बड़ी चौपड़ तक सभी 11 सक्रिय स्टेशन निर्देशांकों की ट्रैकिंग करने वाला निर्बाध एसवीजी रूट वेक्टर।",
      link: "/metro-map",
      linkText: isEn ? "View Map Guide" : "मानचित्र गाइड देखें"
    },
    {
      num: "02",
      title: isEn ? "Local DB" : "स्थानीय डीबी",
      subtitle: isEn ? "SQLite Storage" : "SQLite स्टोरेज",
      desc: isEn ? "Zero network requests required. All station metadata, gates, and schedules are local to your smartphone." : "शून्य नेटवर्क अनुरोधों की आवश्यकता। सभी स्टेशन मेटाडेटा, द्वार और समय सारणी आपके स्मार्टफोन में स्थानीय रूप से सहेजे हैं।",
      subtext: isEn ? "100% Offline Capable" : "100% ऑफ़लाइन सक्षम"
    },
    {
      num: "03",
      title: isEn ? "Exploration" : "पर्यटन अन्वेषण",
      subtitle: isEn ? "Heritage Landmarks" : "विरासत स्थल",
      desc: isEn ? "Step off the train and straight into history. Walking guides to Hawa Mahal, Jantar Mantar, and local bazaars." : "ट्रेन से उतरें और सीधे इतिहास में प्रवेश करें। हवा महल, जंतर मंतर और स्थानीय बाजारों के लिए पैदल मार्ग निर्देश।",
      link: "/explore-jaipur",
      linkText: isEn ? "View Sights Directory" : "दर्शनीय स्थल निर्देशिका देखें"
    },
    {
      num: "04",
      title: isEn ? "Symmetry" : "समरूपता",
      subtitle: isEn ? "Bilingual Layout" : "द्विभाषी लेआउट",
      desc: isEn ? "Complete support for Hindi and English. All station metrics, fares, and help parameters align dynamically." : "हिंदी और अंग्रेजी के लिए पूर्ण समर्थन। सभी स्टेशन विवरण, किराए और सहायता पैरामीटर गतिशील रूप से बदलते हैं।",
      subtext: "English / हिंदी"
    },
    {
      num: "05",
      title: isEn ? "The Core" : "मुख्य कोर",
      subtitle: isEn ? "Simulator Sandbox" : "सिम्युलेटर सैंडबॉक्स",
      desc: isEn ? "Test the mobile companion application instantly in our digital sandbox. Estimate ticket fares and boarding directions." : "हमारे डिजिटल सैंडबॉक्स में तुरंत मोबाइल एप्लिकेशन का परीक्षण करें। टिकट किराए और बोर्डिंग दिशाओं का अनुमान लगाएं।",
      link: "/simulation",
      linkText: isEn ? "Open Simulator Sandbox" : "सिम्युलेटर सैंडबॉक्स खोलें",
      highlight: true
    },
    {
      num: "06",
      title: isEn ? "Underpasses" : "अंडरपास",
      subtitle: isEn ? "Underground Stations" : "भूमिगत स्टेशन",
      desc: isEn ? "Detailed blueprints of stations like Chhoti Chaupar, combining modern underground engineering with classical arches." : "छोटी चौपड़ जैसे स्टेशनों के विस्तृत विवरण, जो आधुनिक भूमिगत इंजीनियरिंग को पारंपरिक मेहराबों के साथ जोड़ते हैं।",
      subtext: isEn ? "Platform Map Layouts" : "प्लेटफॉर्म मैप लेआउट"
    },
    {
      num: "07",
      title: isEn ? "Finance" : "वित्त",
      subtitle: isEn ? "Fare Auditing" : "किराया ऑडिटिंग",
      desc: isEn ? "Calculate smart card values (10-20% discounts) and compare against cash rates to optimize budget." : "स्मार्ट कार्ड मूल्यों (10-20% छूट) की गणना करें और बजट को अनुकूलित करने के लिए नकद दरों के साथ तुलना करें।",
      link: "/journey-planner",
      linkText: isEn ? "Calculate Fare" : "किराया की गणना करें"
    },
    {
      num: "08",
      title: isEn ? "Frequency" : "आवृत्ति",
      subtitle: isEn ? "Timing Schedules" : "समय सारणी",
      desc: isEn ? "First and last dispatch listings from Mansarovar and Badi Chaupar, with adaptive peak hours frequencies." : "मानसरोवर और बड़ी चौपड़ से पहली और आखिरी ट्रेन की प्रस्थान सूची, पीक आवर्स की आवृत्ति के साथ।",
      link: "/timings",
      linkText: isEn ? "Check Schedules" : "समय सारणी की जाँच करें"
    },
    {
      num: "09",
      title: isEn ? "Helpline" : "हेल्पलाइन",
      subtitle: isEn ? "Safety Hub" : "सुरक्षा हब",
      desc: isEn ? "Instant access to JMRC control center numbers, metro police stations, and women safety helplines." : "JMRC नियंत्रण कक्ष नंबरों, मेट्रो पुलिस स्टेशनों और महिला सुरक्षा हेल्पलाइन नंबरों तक तुरंत पहुंच।",
      link: "/faq",
      linkText: isEn ? "Support & FAQs" : "सहायता और अक्सर पूछे जाने वाले प्रश्न"
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden relative min-h-screen bg-light-bg dark:bg-navy-deep text-foreground transition-colors duration-300">
      
      {/* 1. ROYAL JAIPUR HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-8 lg:pt-14 lg:pb-8 bg-light-bg dark:bg-navy-deep">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-city/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-city/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Jali pattern background grid */}
        <div className="absolute inset-0 jali-screen pointer-events-none opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core pitch */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >


              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-text-primary tracking-tight leading-none">
                {isEn ? "Explore Jaipur" : "जयपुर मेट्रो यात्रा"}{" "}<br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-brand-pink via-pink-city to-brand-pink-dark bg-clip-text text-transparent">
                  {isEn ? "Smarter & Offline" : "स्मार्ट और ऑफ़लाइन"}
                </span>
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 dark:text-text-secondary leading-relaxed font-sans">
                {isEn
                  ? "Navigate the historic Pink City with Jaipur Ride, the definitive Jaipur Metro transit companion. Find platform directions, estimate ticket fares, and plan walking journeys, all with zero tracking and zero ads."
                  : "जयपुर राइड के साथ ऐतिहासिक गुलाबी नगरी के मेट्रो सफर को आसान बनाएं। बिना विज्ञापन और बिना किसी ट्रैकिंग के प्लेटफ़ॉर्म दिशा-निर्देश प्राप्त करें, टिकट किराए की गणना करें और पैदल यात्रा की योजना बनाएं।"}
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/simulation"
                  className="w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-base font-bold shadow-lg shadow-brand-pink/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 border-none cursor-pointer"
                >
                  <TrainIcon className="w-5 h-5" />
                  <span>{isEn ? "Try Web Simulator" : "वेब सिम्युलेटर आज़माएं"}</span>
                </Link>

                <a
                  href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto hover:scale-[1.05] active:scale-[0.95] transition-all shrink-0 inline-flex justify-center h-[64px] items-center"
                >
                  <Image
                    src="/assets/icons/google-play.svg"
                    alt="Get it on Google Play"
                    width={214}
                    height={64}
                    className="h-[64px] w-auto shrink-0 select-none object-contain"
                  />
                </a>
              </div>

              {/* Specs checklist */}
              <div className="flex justify-center lg:justify-start space-x-6 pt-2 text-slate-500 dark:text-text-secondary text-xs font-semibold">
                <span className="flex items-center space-x-1.5"><Check className="w-4 h-4 text-emerald-500" /> <span>{isEn ? "Offline SQLite Database" : "ऑफ़लाइन SQLite डेटाबेस"}</span></span>
                <span className="flex items-center space-x-1.5"><Check className="w-4 h-4 text-emerald-500" /> <span>{isEn ? "No Ads or Permissions" : "विज्ञापन और ट्रैकिंग रहित"}</span></span>
              </div>
            </motion.div>

            {/* Right Column: Real Mobile App Preview Card using PhoneMockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 flex justify-center py-2 lg:-mt-14 lg:mb-0 relative"
            >
              <div className="absolute -inset-8 bg-brand-pink/5 blur-[80px] rounded-full pointer-events-none"></div>
              <PhoneMockup />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. STATISTICS COUNTERS */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white dark:bg-navy-card border border-light-border dark:border-navy-border/40 rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-brand-pink tracking-tight">
                1,000+
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary font-bold uppercase tracking-wider">{t("statsDownloads")}</p>
            </div>
            <div className="space-y-2 border-l border-light-border dark:border-navy-border/20">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
                250+
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary font-bold uppercase tracking-wider">{t("statsActiveUsers")}</p>
            </div>
            <div className="space-y-2 border-l border-light-border dark:border-navy-border/20">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
                {statistics.totalStations}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary font-bold uppercase tracking-wider">{t("statsStations")}</p>
            </div>
            <div className="space-y-2 border-l border-light-border dark:border-navy-border/20">
              <p className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight">
                {statistics.touristAttractions}
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary font-bold uppercase tracking-wider">{t("statsAttractions")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. 3x3 SYMMETRICAL GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16 max-w-3xl mx-auto"
        >

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight">
            {isEn ? "Designed on the Principles of" : "जयपुर शहर की तरह"}{" "}<span className="text-brand-pink font-bold">{isEn ? "Vastu Shastra" : "वास्तु शास्त्र के सिद्धांतों पर आधारित"}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-text-secondary leading-relaxed font-sans">
            {isEn
              ? "Just as Maharaja Sawai Jai Singh II planned Jaipur old city in a symmetrical 3x3 grid, our digital guide splits transit utility into 9 seamless corridors."
              : "जिस प्रकार महाराजा सवाई जयसिंह द्वितीय ने जयपुर के पुराने शहर की योजना एक व्यवस्थित 3x3 ग्रिड में बनाई थी, वैसे ही हमारी डिजिटल गाइड इस मेट्रो सेवा को 9 सहज विभागों में विभाजित करती है।"}
          </p>
        </motion.div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {corridors.map((item, idx) => {
            const isHighlight = item.highlight;
            if (isHighlight) {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-linear-to-br from-brand-pink to-brand-pink-dark text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-lg shadow-brand-pink/20"
                >
                  <div>
                    <span className="text-xs font-bold text-white/80 tracking-widest uppercase mb-2 block font-heading">{item.num} / {item.title}</span>
                    <h3 className="font-heading font-bold text-2xl mb-3 text-white">{item.subtitle}</h3>
                    <p className="text-xs text-white/90 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  {item.link && (
                    <Link href={item.link} className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-brand-pink-dark font-extrabold rounded-xl text-xs shadow-md transition-all hover:scale-[1.02] mt-4 border-none cursor-pointer w-fit">
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white dark:bg-navy-card p-8 rounded-3xl border border-light-border dark:border-navy-border/40 relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-bold text-brand-pink tracking-widest uppercase mb-2 block font-heading">{item.num} / {item.title}</span>
                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3">{item.subtitle}</h3>
                  <p className="text-xs text-slate-500 dark:text-text-secondary leading-relaxed font-sans">{item.desc}</p>
                </div>
                {item.link ? (
                  <Link href={item.link} className="text-xs font-bold text-brand-pink hover:text-brand-pink-dark flex items-center space-x-1 mt-4">
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-slate-400 dark:text-text-secondary/60 mt-4 block">{item.subtext}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. PREVIEW MAP TEASER */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Simulate Routes Instantly" : "मार्गों का तुरंत सिमुलेशन करें"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-text-secondary leading-relaxed font-sans">
              {isEn
                ? "Don't wait until you stand inside the station. Estimate your cash or smart-card ticket fare, examine the intermediate stops list, and find correct platform directions directly from any browser."
                : "स्टेशन के अंदर खड़े होने तक प्रतीक्षा न करें। किसी भी ब्राउज़र से सीधे नकद या स्मार्ट-कार्ड टिकट किराए का अनुमान लगाएं, मध्यवर्ती स्टॉप सूची देखें और सही प्लेटफॉर्म दिशा-निर्देश ढूंढें।"}
            </p>
            <div className="space-y-3 font-semibold text-xs sm:text-sm text-slate-700 dark:text-text-secondary">
              <div className="flex items-center space-x-2.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isEn ? "Zero location permissions needed for web check" : "वेब जांच के लिए स्थान अनुमति की कोई आवश्यकता नहीं"}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isEn ? "Cash vs Smart Card fare calculations" : "नकद बनाम स्मार्ट कार्ड किराए की गणना"}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isEn ? "Platform directions included" : "प्लेटफ़ॉर्म दिशा-निर्देश शामिल"}</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/simulation"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white font-bold rounded-xl shadow-md transition-all hover:scale-[1.02] border-none cursor-pointer"
              >
                <span>{isEn ? "Try Web Simulator" : "वेब सिम्युलेटर आज़माएं"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-navy-card rounded-3xl border border-light-border dark:border-navy-border/40 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group min-h-[300px]">
            {/* Background Map teaser graphic */}
            <div className="absolute right-0 bottom-0 opacity-15 dark:opacity-10 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
              <Image src="/images/metro_map.jpg" alt="Map Grid" width={400} height={250} className="object-cover" />
            </div>
            
            <div className="space-y-4 max-w-lg relative z-10">
              <span className="px-3 py-1 bg-brand-pink/10 text-brand-pink text-xs font-bold rounded-lg uppercase tracking-wider inline-block">
                {isEn ? "Interactive SVG Route" : "इंटरैक्टिव एसवीजी रूट"}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                {isEn ? "Line 1: Pink Line Map Guide" : "लाइन 1: पिंक लाइन मैप गाइड"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-text-secondary leading-relaxed font-sans">
                {isEn
                  ? "Examine the complete layout of Jaipur Metro Line 1. Hover nodes to view opening dates, platforms configuration, and connectivity routes."
                  : "जयपुर मेट्रो लाइन 1 के संपूर्ण लेआउट की जांच करें। उद्घाटन तिथियों, प्लेटफॉर्म कॉन्फ़िगरेशन और कनेक्टिविटी मार्गों को देखने के लिए नोड्स पर कर्सर ले जाएं।"}
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/metro-map"
                className="inline-flex items-center space-x-1 text-sm font-bold text-brand-pink hover:text-brand-pink-dark group"
              >
                <span>{isEn ? "Open Interactive Map" : "इंटरैक्टिव मानचित्र खोलें"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 5. TOURIST CARDS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Explore the" : "जयपुर"}{" "}<span className="text-brand-pink font-bold">{isEn ? "Pink Line" : "पिंक लाइन गाइड"}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-text-secondary">
              {isEn ? "Landmarks just steps away from our major stations." : "मेट्रो स्टेशनों से कुछ ही कदमों की दूरी पर स्थित प्रमुख ऐतिहासिक स्थल।"}
            </p>
          </div>
          <Link
            href="/explore-jaipur"
            className="flex items-center space-x-2 text-sm font-bold text-brand-pink hover:text-brand-pink-dark group whitespace-nowrap"
          >
            <span>{isEn ? "View All Attractions" : "सभी पर्यटन स्थल देखें"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tourismData.slice(11, 14).map((att, idx) => (
            <motion.div
              key={att.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-navy-card rounded-3xl border border-light-border dark:border-navy-border/40 overflow-hidden shadow-md hover:shadow-lg flex flex-col justify-between group"
            >
              <div className="relative h-60 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <Image
                  src={att.image}
                  alt={att.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-pink/10 text-brand-pink font-semibold">
                      {isEn ? att.type : att.typeHi}
                    </span>
                    <span className="text-slate-400 dark:text-text-secondary">{att.entry_fee}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    {isEn ? att.name : att.nameHi}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-text-secondary leading-relaxed font-sans line-clamp-2">
                    {isEn ? att.summary : att.summaryHi}
                  </p>
                </div>

                <div className="pt-4 border-t border-light-border dark:border-navy-border/20 text-xs flex justify-between items-center text-slate-400 dark:text-text-secondary font-semibold">
                  <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-brand-pink" /> <span>{isEn ? att.stationId : T_STATION(att.stationId)}</span></span>
                  <span>{att.walk_time_min ? `${att.walk_time_min} ${isEn ? "min walk" : "मिनट पैदल"}` : `${att.approx_drive_time_min} ${isEn ? "min drive" : "मिनट ड्राइव"}`}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FEATURE COMPARISON MATRIX (APP VS WEB) */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="bg-white dark:bg-navy-card rounded-3xl border border-light-border dark:border-navy-border/40 p-8 lg:p-12 shadow-xl space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              {isEn ? "Choose Your Experience" : "अपनी आवश्यकता चुनें"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-text-secondary leading-relaxed font-sans">
              {isEn
                ? "Whether you're on the move with our Android app or planning from home via the web, we've got you covered."
                : "चाहे आप हमारे एंड्रॉइड ऐप के साथ यात्रा पर हों या वेब के माध्यम से घर से योजना बना रहे हों, हम आपकी सहायता के लिए तैयार हैं।"}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-light-border dark:border-navy-border/20">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-light-accent/50 dark:bg-navy-accent/20 border-b border-light-border dark:border-navy-border/30 text-sm">
                  <th className="p-6 text-xs font-bold uppercase text-slate-500 dark:text-text-secondary tracking-wider font-heading">{isEn ? "Features" : "सुविधाएं"}</th>
                  <th className="p-6 text-center bg-brand-pink/5 rounded-t-lg">
                    <span className="block text-brand-pink font-heading font-bold text-base">{isEn ? "Android App" : "एंड्रॉइड ऐप"}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">{isEn ? "Best for Daily Travel" : "दैनिक यात्रा के लिए श्रेष्ठ"}</span>
                  </th>
                  <th className="p-6 text-center">
                    <span className="block text-slate-900 dark:text-white font-heading font-bold text-base">{isEn ? "Web Simulator" : "वेब सिम्युलेटर"}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">{isEn ? "Best for Planning" : "योजना बनाने के लिए श्रेष्ठ"}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-navy-border/20 text-sm text-slate-700 dark:text-slate-300">
                {compareFeatures.map((feat, fIdx) => (
                  <tr key={fIdx}>
                    <td className="p-6 font-semibold">{feat.label}</td>
                    <td className="p-6 text-center bg-brand-pink/5"><CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="p-6 text-center text-slate-400">
                      {feat.web ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" /> : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* 7. APP DOWNLOAD BANNER (QR Code & Version notes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[36px] overflow-hidden relative min-h-[400px] flex items-center p-8 lg:p-16 text-white shadow-xl shadow-brand-pink/15"
        >
          {/* Background image & gradient overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEN15dDd_3ppZqLHJV5mSNyPx7_EX4Vn2jyOFHhKJReiQTZLsxKTLM6SoND7YLU5SgdMBfBojw_x7ypvzxc2g1l-21BAEuWqrHlORt_3sTBlFAo9l7nXW0ddLmNUug4jW5tZ6T3mHRMERXOgjTdhIVLs4xXr_w-8PzrOmwT_Hyft0JxjM5DVNwSTyt1rSTYf3f7eD4LGly6_d4ayBdJGYzE-XM1LTvvq56xo9A6l8oVAPf96_UUTFmZjdCR7IbQUOkcgf8CFb8')` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-navy-deep via-navy-deep/90 to-navy-deep/30 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
            {/* Texts */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
                {t("downloadTitle")}
              </h2>
              <p className="max-w-2xl text-white/80 leading-relaxed text-sm sm:text-base font-sans">
                {t("downloadSubtitle")}
              </p>

              {/* Release Notes */}
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 max-w-xl text-left space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-brand-pink" />
                  <span>{isEn ? "Release Notes (v2.0.4)" : "रिलीज नोट्स (v2.0.4)"}</span>
                </div>
                <p className="text-xs text-white/90 leading-relaxed font-sans">
                  {isEn
                    ? "• Fixed Lucide offline visuals for true network disconnection capability. \n• Refined modal permission checks under Android target nodes."
                    : "• नेटवर्क डिस्कनेक्शन क्षमता के लिए ऑफ़लाइन विज़ुअल्स को ठीक किया गया। \n• एंड्रॉइड लक्षित नोड्स के तहत अनुमति जांच को परिष्कृत किया गया।"}
                </p>
                <div className="text-[10px] text-white/60">
                  {isEn ? "Play Store Release • Size: ~53 MB" : "प्ले स्टोर रिलीज • साइज: ~53 MB"}
                </div>
              </div>
            </div>

            {/* Badges and QR */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6">
              <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col items-center space-y-3">
                <Image
                  src="/assets/icons/qrcraft.png"
                  alt="Google Play QR Code"
                  width={144}
                  height={144}
                  className="object-contain rounded-xl select-none"
                />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{isEn ? "Scan to Download" : "डाउनलोड करने के लिए स्कैन करें"}</span>
              </div>

              <div className="flex gap-4 w-full justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-[1.05] active:scale-[0.95] transition-all duration-200 shrink-0 inline-block"
                >
                  <Image
                    src="/assets/icons/google-play.svg"
                    alt="Get it on Google Play"
                    width={200}
                    height={60}
                    className="h-14 w-auto shrink-0 select-none"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="w-full overflow-hidden py-10 bg-slate-50 dark:bg-navy-dark/30 border-y border-light-border dark:border-navy-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
            {isEn ? "What Commuters Say" : "यात्रियों के अनुभव"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-text-secondary font-sans">
            {isEn ? "Real reviews from Google Play Store users" : "गूगल प्ले स्टोर उपयोगकर्ताओं की वास्तविक समीक्षाएं"}
          </p>
        </div>

        {/* Scrolling strip wrapper */}
        <div className="w-full overflow-hidden flex relative select-none">
          {/* Shadow gradients for smooth fade out at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-r from-light-bg dark:from-navy-deep to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-l from-light-bg dark:from-navy-deep to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Track moving from LEFT to RIGHT */}
          <div className="animate-marquee-right flex space-x-6 py-4">
            {/* Set 1 */}
            {testimonials.map((test, idx) => (
              <div
                key={`m1-${idx}`}
                className="w-[280px] sm:w-[350px] shrink-0 bg-white dark:bg-navy-card rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{test.name}</span>
                    <div className="flex space-x-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary leading-relaxed font-sans line-clamp-4">
                    &ldquo;{isEn ? test.content : test.contentHi}&rdquo;
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-text-secondary/60 font-semibold border-t border-light-border dark:border-navy-border/20 pt-3 flex justify-between">
                  <span>{isEn ? "Google Play Store" : "गूगल प्ले स्टोर"}</span>
                  <span>{isEn ? test.date : test.date.replace("April", "अप्रैल").replace("2026", "२०२६")}</span>
                </div>
              </div>
            ))}
            
            {/* Set 2 (Identical duplicate for infinite scroll) */}
            {testimonials.map((test, idx) => (
              <div
                key={`m2-${idx}`}
                className="w-[280px] sm:w-[350px] shrink-0 bg-white dark:bg-navy-card rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{test.name}</span>
                    <div className="flex space-x-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-text-secondary leading-relaxed font-sans line-clamp-4">
                    &ldquo;{isEn ? test.content : test.contentHi}&rdquo;
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-text-secondary/60 font-semibold border-t border-light-border dark:border-navy-border/20 pt-3 flex justify-between">
                  <span>{isEn ? "Google Play Store" : "गूगल प्ले स्टोर"}</span>
                  <span>{isEn ? test.date : test.date.replace("April", "अप्रैल").replace("2026", "२०२६")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            {t("faqTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-text-secondary">
            {t("faqSubtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white dark:bg-navy-card rounded-2xl border border-light-border dark:border-navy-border/40 overflow-hidden shadow-sm transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer focus:outline-none select-none">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-pink transition-colors pr-4">
                  {isEn ? faq.question : faq.questionHi}
                </h3>
                <span className="transition-transform duration-200 group-open:-rotate-180 shrink-0 text-brand-pink">
                  <svg
                     fill="none"
                     height="24"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2.5"
                     viewBox="0 0 24 24"
                     width="24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-sm text-slate-600 dark:text-on-surface-variant leading-relaxed border-t border-light-border dark:border-navy-border/20 pt-4 bg-light-accent/30 dark:bg-navy-accent/10 font-sans">
                <p>{isEn ? faq.answer : faq.answerHi}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 10. SEMANTIC TRAVEL DIRECTORY & GEOGRAPHIC GUIDE (SEO, GEO & AEO OPTIMIZATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-light-border/40 dark:border-navy-border/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left/Main Column: In-depth Travel Guides */}
          <div className="lg:col-span-8 space-y-8 text-slate-600 dark:text-text-secondary">
            
            <div className="space-y-4">
              <span className="px-3 py-1 bg-brand-pink/10 text-brand-pink rounded-md text-xs font-bold uppercase tracking-wider">
                {isEn ? "Ultimate Local Navigation Hub" : "सर्वोत्तम स्थानीय नेविगेशन गाइड"}
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                {isEn ? "Comprehensive Guide to Jaipur Metro & Historic Pink City Travel" : "जयपुर मेट्रो और ऐतिहासिक गुलाबी नगरी यात्रा का संपूर्ण गाइड"}
              </h2>
              <p className="text-sm leading-relaxed font-sans">
                {isEn 
                  ? "Welcome to Jaipur Ride, your ultimate digital companion for planning the best metro route in Jaipur. Designed as a privacy-first, offline-capable transit guide, we help tourists, daily commuters, students, and international travelers unlock the full transportation potential of the Jaipur Metro Rail Corporation (JMRC) Pink Line (Line 1). Learn how to navigate from the suburban residential sectors of Mansarovar to the historic core at Badi Chaupar, optimizing your time and travel budget with smart ticketing insights, train operational timetables, and walking distances."
                  : "जयपुर राइड में आपका स्वागत है, जो जयपुर में सबसे अच्छा मेट्रो रूट खोजने और योजना बनाने के लिए आपका अंतिम डिजिटल साथी है। ऑफ़लाइन-प्रथम नेविगेशन ऐप के रूप में डिज़ाइन किया गया यह ऐप पर्यटकों, दैनिक यात्रियों, छात्रों और अंतर्राष्ट्रीय यात्रियों को जयपुर मेट्रो रेल कॉर्पोरेशन (JMRC) पिंक लाइन (लाइन 1) की पूरी क्षमता का उपयोग करने में मदद करता है।"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                {isEn ? "1. Jaipur Metro Pink Line Stations & Connectivity Directory" : "1. जयपुर मेट्रो पिंक लाइन स्टेशन और कनेक्टिविटी निर्देशिका"}
              </h3>
              <p className="text-sm leading-relaxed font-sans">
                {isEn 
                  ? "The operational JMRC Pink Line currently covers 11 stations spanning 12 kilometers. Starting from the west at Mansarovar (J01), the elevated corridor moves through New Aatish Market (J02), Vivek Vihar (J03), Shyam Nagar (J04), Ram Nagar (J05), and Civil Lines (J06). It links directly to the main transit centers at the Jaipur Railway Station (J07) and the Sindhi Camp Inter-State Bus Stand Terminal (J08). Continuing east, it transitions underground via Chandpole (J09) and Chhoti Chaupar (J10), terminating at Badi Chaupar (J11) deep within the walled city heritage zone. Upcoming expansion phases (Phase 1C) will connect Badi Chaupar to Transport Nagar, while the proposed Phase 2 corridor will span north-south from Sitapura Industrial Area to Ambabari, linking crucial colleges, schools, hospitals, and commercial shopping centers."
                  : "जयपुर मेट्रो की पिंक लाइन वर्तमान में 12 किलोमीटर में फैले 11 स्टेशनों को कवर करती है। पश्चिम में मानसरोवर (J01) से शुरू होकर, यह कॉरिडोर न्यू आतिश मार्केट (J02), विवेक विहार (J03), श्याम नगर (J04), राम नगर (J05), और सिविल लाइंस (J06) से होकर गुजरता है। यह सीधे रेलवे स्टेशन (J07) और सिंधी कैंप अंतर-राज्यीय बस स्टैंड टर्मिनल (J08) से जुड़ता है।"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                {isEn ? "2. Exploring Iconic Landmarks and Historical Monuments near Metro Stations" : "2. मेट्रो स्टेशनों के पास प्रतिष्ठित स्थलों और ऐतिहासिक स्मारकों की खोज"}
              </h3>
              <p className="text-sm leading-relaxed font-sans">
                {isEn 
                  ? "Jaipur Ride maps your train journey directly to the top sightseeing destinations in Rajasthan. Alight at Badi Chaupar (J11) station for a short walk to the majestic Hawa Mahal (Palace of Winds), the sprawling City Palace complex, the UNESCO World Heritage Jantar Mantar observatory, and the vibrant shopping lanes of Johari Bazaar and Bapu Bazaar. If you're interested in art and legacy, take the metro to Chhoti Chaupar (J10) to visit the iconic Albert Hall Museum (Central Museum) situated in Ram Niwas Garden. Chandpole (J09) station provides close access to the hiking trails and auto-rickshaw transfers leading to Nahargarh Fort, Jaigarh Fort, and the royal cenotaphs at Gaitore. For shopping and dining, get off at Mansarovar (J01) to explore the artistic Patrika Gate at Jawahar Circle, or visit premium shopping malls like World Trade Park (WTP) and Gaurav Tower (GT) in Malviya Nagar."
                  : "जयपुर राइड आपकी ट्रेन यात्रा को सीधे राजस्थान के प्रमुख दर्शनीय स्थलों से जोड़ता है। शानदार हवा महल, सिटी पैलेस परिसर, यूनेस्को विश्व धरोहर जंतर मंतर और जोहरी बाजार व बापू बाजार की जीवंत गलियों में जाने के लिए बड़ी चौपड़ (J11) स्टेशन पर उतरें।"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                {isEn ? "3. Transit Hub Integrations: Airport, Railway, and Bus Terminals" : "3. ट्रांजिट हब एकीकरण: हवाई अड्डा, रेलवे और बस टर्मिनल"}
              </h3>
              <ul className="list-disc pl-5 text-sm leading-relaxed space-y-2 font-sans">
                <li>
                  <strong>{isEn ? "Jaipur Junction Railway Station (JP)" : "जयपुर जंक्शन रेलवे स्टेशन (JP)"}:</strong>{" "}
                  {isEn 
                    ? "Directly connected via the Railway Station Metro Station (J07). Commuters can step off express trains and immediately enter the metro concourse using dedicated skywalks and pedestrian paths."
                    : "रेलवे स्टेशन मेट्रो स्टेशन (J07) के माध्यम से सीधे जुड़ा हुआ है।"}
                </li>
                <li>
                  <strong>{isEn ? "Sindhi Camp Central Bus Stand" : "सिंधी कैंप केंद्रीय बस स्टैंड"}:</strong>{" "}
                  {isEn 
                    ? "Located at Sindhi Camp Station (J08), which serves as the primary interchange. Here, you can board state-run RSRTC buses to New Delhi, Agra, Jodhpur, and Udaipur."
                    : "सिंधी कैंप स्टेशन (J08) पर स्थित है, जो प्राथमिक इंटरचेंज के रूप में कार्य करता है।"}
                </li>
                <li>
                  <strong>{isEn ? "Jaipur International Airport (JAI)" : "जयपुर अंतर्राष्ट्रीय हवाई अड्डा (JAI)"}:</strong>{" "}
                  {isEn 
                    ? "Located in Sanganer, approximately 10 km from Mansarovar Metro Station (J01). Travelers can take a budget-friendly metro ride to Mansarovar and connect to the airport via local taxi, cab services, or auto-rickshaws."
                    : "सांगानेर में स्थित, मानसरोवर मेट्रो स्टेशन (J01) से लगभग 10 किमी दूर। यात्री स्थानीय टैक्सी या ऑटो-रिक्शा के माध्यम से हवाई अड्डे से जुड़ सकते हैं।"}
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                {isEn ? "4. Travel Tips, Fares, and Essential Station Facilities" : "4. यात्रा युक्तियाँ, किराया और आवश्यक स्टेशन सुविधाएं"}
              </h3>
              <p className="text-sm leading-relaxed font-sans">
                {isEn 
                  ? "To enjoy a hassle-free journey, JMRC offers multiple ticketing options. Single Journey Tokens are ideal for one-time trips, but daily commuters and tourists can save 10% on fare ticket prices by purchasing a rechargeable Smart Card. Senior citizens receive a 25% discount, and students benefit from 15% concessions. All Jaipur Metro terminals are equipped with modern facilities including elevators, escalators, clean public toilets, wheelchair-accessible ramps, and detailed platform directions. JMRC security desks, CCTV surveillance, and dedicated women's safety helplines ensure safe travels at all times."
                  : "दैनिक यात्री और पर्यटक रिचार्जेबल स्मार्ट कार्ड खरीदकर किराए पर 10% की बचत कर सकते हैं। वरिष्ठ नागरिकों को 25% और छात्रों को 15% की छूट मिलती है।"}
              </p>
            </div>

          </div>

          {/* Right Column: Key Entity Quick Mappings */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white dark:bg-navy-card rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-brand-pink" />
                <span>{isEn ? "Jaipur Tourism Quick Links" : "जयपुर पर्यटन त्वरित लिंक"}</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-slate-500 dark:text-text-secondary">{isEn ? "Hawa Mahal nearest station" : "हवा महल का निकटतम स्टेशन"}</span>
                  <Link href="/explore-jaipur/hawa_mahal" className="font-bold text-brand-pink hover:underline">Badi Chaupar (1.1 km)</Link>
                </div>
                <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-slate-500 dark:text-text-secondary">{isEn ? "City Palace nearest station" : "सिटी पैलेस का निकटतम स्टेशन"}</span>
                  <Link href="/explore-jaipur/city_palace" className="font-bold text-brand-pink hover:underline">Badi Chaupar (1.3 km)</Link>
                </div>
                <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-slate-500 dark:text-text-secondary">{isEn ? "Albert Hall nearest station" : "अल्बर्ट हॉल का निकटतम स्टेशन"}</span>
                  <Link href="/explore-jaipur/albert_hall" className="font-bold text-brand-pink hover:underline">Chhoti Chaupar (1.8 km)</Link>
                </div>
                <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                  <span className="text-slate-500 dark:text-text-secondary">{isEn ? "Patrika Gate nearest station" : "पत्रिका गेट का निकटतम स्टेशन"}</span>
                  <Link href="/explore-jaipur/patrika_gate" className="font-bold text-brand-pink hover:underline">Mansarovar (6.5 km)</Link>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 dark:text-text-secondary">{isEn ? "Sindhi Camp Bus Terminal" : "सिंधी कैंप बस स्टैंड"}</span>
                  <Link href="/metro-stations/J08" className="font-bold text-brand-pink hover:underline">Sindhi Camp Station</Link>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-navy-card rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-brand-pink" />
                <span>{isEn ? "AI Engine Optimization Context" : "एआई इंजन संदर्भ"}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-text-secondary leading-relaxed font-sans">
                {isEn 
                  ? "This guide serves as a verified travel directory for search engine bots, ChatGPT, Gemini, and Claude web crawlers to provide accurate response feeds on Jaipur Metro schedules, local shopping centers, temples, schools, hotels, and tourist coordinates."
                  : "यह गाइड सर्च इंजन बॉट्स, चैटजीपीटी, जेमिनी और क्लाउड वेब क्रॉलर्स के लिए सत्यापित संदर्भ प्रदान करती है।"}
              </p>
            </div>

          </div>

        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
    </div>
  );
}

function T_STATION(name: string): string {
  // Simple fallback translation helper
  const stationTranslations: Record<string, string> = {
    "Mansarovar": "मानसरोवर",
    "New Aatish Market": "न्यू आतिश मार्केट",
    "Vivek Vihar": "विवेक विहार",
    "Shyam Nagar": "श्याम नगर",
    "Ram Nagar": "राम नगर",
    "Civil Lines": "सिविल लाइन्स",
    "Railway Station": "रेलवे स्टेशन",
    "Sindhi Camp": "सिंधी कैंप",
    "Chandpole": "चांदपोल",
    "Chhoti Chaupar": "छोटी चौपड़",
    "Badi Chaupar": "बड़ी चौपड़"
  };
  return stationTranslations[name] || name;
}
