"use client";

import React from "react";
import Image from "next/image";
import { Shield, Smartphone, AlertCircle, CheckCircle, Info, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DownloadPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const changelog = [
    {
      version: "v2.0.4",
      date: isEn ? "July 2026" : "जुलाई 2026",
      notes: isEn ? [
        "Fixed CDN Lucide load failures in airplane/offline modes by vendoring assets locally.",
        "Resolved geolocation cancel callback promise freezes in station lookup modals.",
        "Synchronized language toggles to persist custom EN/HI choices across app launches.",
        "Refined Android vibration durations for stop arrival haptics."
      ] : [
        "स्थानीय रूप से एसेट्स को सहेजकर एयरप्लेन/ऑफ़लाइन मोड में सीडीएन ल्यूसाइड लोड विफलताओं को ठीक किया गया।",
        "स्टेशन लुकअप मॉडल में जियोलोकेशन रद्द कॉलबैक प्रॉमिस फ़्रीज़ को हल किया गया।",
        "ऐप लॉन्च के दौरान कस्टम ईएन/एचआई विकल्पों को बनाए रखने के लिए भाषा टॉगल को सिंक किया गया।",
        "स्टॉप आगमन हैप्टिक्स के लिए एंड्रॉइड कंपन अवधि को परिष्कृत किया गया।"
      ]
    },
    {
      version: "v2.0.0",
      date: isEn ? "May 2026" : "मई 2026",
      notes: isEn ? [
        "Complete migration to Capacitor 7.0 native runtime bridge.",
        "Added background location service tracking for station reminders.",
        "Implemented local SQLite data cache for offline attractions.",
        "Redesigned premium dark mode layout matching Material Design 3."
      ] : [
        "कैपेसिटर 7.0 मूल रनटाइम ब्रिज पर पूर्ण माइग्रेशन।",
        "स्टेशन रिमाइंडर्स के लिए बैकग्राउंड लोकेशन सर्विस ट्रैकिंग जोड़ी गई।",
        "ऑफ़लाइन आकर्षणों के लिए स्थानीय SQLite डेटा कैश लागू किया गया।",
        "मटेरियल डिज़ाइन 3 से मेल खाते हुए प्रीमियम डार्क मोड लेआउट को नया रूप दिया गया।"
      ]
    }
  ];

  const permissions = isEn ? [
    {
      name: "Fine / Coarse Geolocation",
      purpose: "Required to track your position relative to station coordinates to alert you when your destination is close."
    },
    {
      name: "Vibration / Haptics",
      purpose: "Required to trigger tactile haptic alarms when you arrive at your stop."
    },
    {
      name: "Network State Detection",
      purpose: "Required to dynamically switch between local cached databases and live JMRC alerts."
    },
    {
      name: "Foreground Location Service",
      purpose: "Required to keep location tracking active in the background when your phone screen is locked."
    }
  ] : [
    {
      name: "सटीक / सामान्य जियोलोकेशन",
      purpose: "स्टेशन निर्देशांकों के सापेक्ष आपकी स्थिति को ट्रैक करने के लिए आवश्यक है ताकि जब आपका गंतव्य निकट हो तो आपको सतर्क किया जा सके।"
    },
    {
      name: "कंपन / हैप्टिक्स",
      purpose: "जब आप अपने स्टॉप पर पहुँचते हैं तो स्पर्शनीय हैप्टिक्स अलार्म को ट्रिगर करने के लिए आवश्यक है।"
    },
    {
      name: "नेटवर्क स्थिति का पता लगाना",
      purpose: "स्थानीय कैश्ड डेटाबेस और लाइव जेएमआरसी अलर्ट के बीच गतिशील रूप से स्विच करने के लिए आवश्यक है।"
    },
    {
      name: "अग्रभूमि स्थान सेवा",
      purpose: "जब आपके फोन की स्क्रीन लॉक हो तो बैकग्राउंड में लोकेशन ट्रैकिंग को सक्रिय रखने के लिए आवश्यक है।"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* 1. HERO DOWNLOAD HEADER */}
      <div className="bg-linear-to-br from-navy-dark to-navy-accent text-white rounded-[36px] p-8 lg:p-16 border border-navy-border shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <span className="px-3 py-1 bg-brand-pink text-white rounded-md text-xs font-bold uppercase tracking-wider">
              {isEn ? "Available on Google Play" : "गूगल प्ले पर उपलब्ध"}
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl tracking-tight leading-tight">
              {isEn ? "Get Jaipur Ride for Android" : "एंड्रॉइड के लिए जयपुर राइड प्राप्त करें"}
            </h1>
            <p className="max-w-2xl text-white/80 leading-relaxed text-sm sm:text-base font-sans">
              {isEn
                ? "Take the complete Pink City transit assistant offline. Experience live GPS journey alerts, stop reminders, safety helpline contacts, and tourist directions deep inside underground tunnels."
                : "पिंक सिटी के इस संपूर्ण मेट्रो गाइड को ऑफलाइन इस्तेमाल करें। भूमिगत टनल के भीतर भी लाइव जीपीएस यात्रा अलर्ट, स्टॉप रिमाइंडर्स, सुरक्षा हेल्पलाइन नंबर और पर्यटन गाइड प्राप्त करें।"}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              {/* Google Play Store Link */}
              <a
                href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-[1.05] active:scale-[0.95] transition-all shrink-0 inline-flex items-center"
              >
                <Image
                  src="/assets/icons/google-play.svg"
                  alt="Get it on Google Play"
                  width={246}
                  height={74}
                  className="h-[74px] w-auto shrink-0 select-none object-contain"
                />
              </a>
            </div>

            <div className="text-xs text-white/50 pt-2">
              {isEn ? "Official App Store release • Safe & malware checked." : "आधिकारिक ऐप स्टोर रिलीज • सुरक्षित और मालवेयर-मुक्त।"}
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-5 rounded-3xl shadow-xl flex flex-col items-center space-y-3">
              <Image
                src="/assets/icons/qrcraft.png"
                alt="Google Play Store QR Code"
                width={144}
                height={144}
                className="object-contain rounded-xl select-none"
              />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-sans">
                {isEn ? "Scan to Open Play Store" : "प्ले स्टोर खोलने के लिए स्कैन करें"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SPECIFICATIONS & INSTALLATION GUIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Play Store Guide */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
          <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-brand-pink" />
            <span>{isEn ? "Installation Guide" : "इंस्टॉलेशन गाइड"}</span>
          </h2>
          <p className="text-sm text-foreground/75 leading-relaxed">
            {isEn
              ? "Follow these simple steps to install Jaipur Ride from Google Play Store:"
              : "गूगल प्ले स्टोर से जयपुर राइड इंस्टॉल करने के लिए इन सरल चरणों का पालन करें:"}
          </p>

          <ol className="space-y-4 text-sm text-foreground/80">
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-bold">{isEn ? "Open Google Play Store" : "गूगल प्ले स्टोर खोलें"}</p>
                <p className="text-xs text-foreground/60">
                  {isEn 
                    ? "Click the button above or scan the QR code to open the app page on Play Store."
                    : "प्ले स्टोर पर ऐप पेज खोलने के लिए ऊपर दिए गए बटन पर क्लिक करें या क्यूआर कोड स्कैन करें।"}
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-bold">{isEn ? "Click Install" : "इंस्टॉल पर क्लिक करें"}</p>
                <p className="text-xs text-foreground/60">
                  {isEn
                    ? "Tap the Install button on the Play Store page to download and set up the app on your device."
                    : "अपने डिवाइस पर ऐप डाउनलोड करने और सेटअप करने के लिए प्ले स्टोर पेज पर इंस्टॉल बटन पर टैप करें।"}
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-bold">{isEn ? "Open & Enable Location Access" : "ऐप खोलें और लोकेशन एक्सेस सक्षम करें"}</p>
                <p className="text-xs text-foreground/60">
                  {isEn
                    ? "Launch Jaipur Ride and grant GPS Geolocation permissions to enable automatic stop vibration alerts during your train rides."
                    : "जयपुर राइड लॉन्च करें और ट्रेन यात्राओं के दौरान स्वचालित स्टॉप कंपन अलर्ट को सक्षम करने के लिए जीपीएस जियोलोकेशन अनुमतियां प्रदान करें।"}
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
            <h2 className="font-heading font-bold text-xl text-foreground flex items-center space-x-2">
              <Info className="w-5 h-5 text-brand-pink" />
              <span>{isEn ? "Technical Specs" : "तकनीकी विवरण"}</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-foreground/80">
              <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/50">{isEn ? "Minimum Android Version" : "न्यूनतम एंड्रॉइड संस्करण"}</span>
                <span className="font-bold">7.0 (API 24 - Nougat)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/50">{isEn ? "Recommended Version" : "अनुशंसित संस्करण"}</span>
                <span className="font-bold">11.0 (API 30) or above</span>
              </div>
              <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/50">{isEn ? "Package Size" : "डाउनलोड साइज"}</span>
                <span className="font-bold">~53 MB</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-foreground/50">{isEn ? "Runtime Framework" : "रनटाइम फ्रेमवर्क"}</span>
                <span className="font-bold">Capacitor JS Bridge</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HARDWARE PERMISSIONS EXPLAINER */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
        <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
          <Shield className="w-6 h-6 text-brand-pink" />
          <span>{isEn ? "Device Permissions Explained" : "आवश्यक डिवाइस अनुमतियाँ"}</span>
        </h2>
        <p className="text-sm text-foreground/75 leading-relaxed">
          {isEn
            ? "To provide location tracking and haptics, the app requests the following system permissions. We respect your privacy: location coordinates are processed 100% locally on your device and are never sent to remote servers."
            : "लोकेशन ट्रैकिंग और हैप्टिक्स प्रदान करने के लिए, ऐप निम्नलिखित अनुमतियों का अनुरोध करता है। हम आपकी गोपनीयता का सम्मान करते हैं: स्थान निर्देशांक आपके डिवाइस पर 100% स्थानीय रूप से संसाधित होते हैं और कभी भी सर्वर पर नहीं भेजे जाते हैं।"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {permissions.map((perm, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-light-accent dark:bg-navy-card/40 border border-light-border/60 dark:border-navy-border/20 space-y-2"
            >
              <h3 className="font-heading font-bold text-base text-foreground flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-pink" />
                <span>{perm.name}</span>
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed font-sans">
                {perm.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CHANGELOG & VERSION NOTES */}
      <div className="space-y-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground text-center">
          {isEn ? "Changelog & Version History" : "बदलाव सूची और संस्करण इतिहास"}
        </h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {changelog.map((log) => (
            <div
              key={log.version}
              className="bg-white dark:bg-navy-dark rounded-2xl p-6 border border-light-border dark:border-navy-border/40 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-heading font-extrabold text-lg text-brand-pink">{log.version}</span>
                <span className="text-xs text-foreground/50">{log.date}</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/80 pl-4 list-disc font-sans">
                {log.notes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
