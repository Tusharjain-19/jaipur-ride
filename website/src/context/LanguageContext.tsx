"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

type TranslationDict = {
  [key: string]: {
    en: string;
    hi: string;
  };
};

const translations: TranslationDict = {
  // Navigation
  navHome: { en: "Home", hi: "होम" },
  navPlanner: { en: "Journey Planner", hi: "यात्रा योजनाकार" },
  navStations: { en: "Metro Stations", hi: "मेट्रो स्टेशन" },
  navMap: { en: "Metro Map", hi: "मेट्रो मैप" },
  navExplore: { en: "Explore Jaipur", hi: "जयपुर घूमें" },
  navFeatures: { en: "Features", hi: "विशेषताएं" },
  navDownload: { en: "Download App", hi: "ऐप डाउनलोड करें" },
  navAbout: { en: "About Us", hi: "हमारे बारे में" },
  navContact: { en: "Contact", hi: "संपर्क" },
  navFaq: { en: "FAQ", hi: "अक्सर पूछे जाने वाले सवाल" },

  // General Buttons
  btnTryOnline: { en: "Try Online Simulator", hi: "ऑनलाइन सिम्युलेटर आज़माएं" },
  btnDownloadApp: { en: "Download Android App", hi: "एंड्रॉइड ऐप डाउनलोड करें" },
  btnViewRoute: { en: "View Details & Route", hi: "विवरण और मार्ग देखें" },
  btnOpenMaps: { en: "Open in Google Maps", hi: "गूगल मैप्स में खोलें" },
  btnSubmit: { en: "Submit Feedback", hi: "फीडबैक भेजें" },
  btnBackToHome: { en: "Back to Home", hi: "होम पर वापस जाएँ" },

  // Hero Section
  heroTitle: { en: "Explore Jaipur Metro Smarter", hi: "जयपुर मेट्रो को अधिक समझदारी से एक्सप्लोर करें" },
  heroSubtitle: { en: "Plan your Jaipur Metro journeys instantly. Find stations, calculate fares, explore nearby historic attractions, and travel like a local.", hi: "अपनी जयपुर मेट्रो यात्राओं की तुरंत योजना बनाएं। स्टेशन खोजें, किराए की गणना करें, ऐतिहासिक पर्यटन स्थलों का पता लगाएं।" },
  appVersionLabel: { en: "Latest Version: v2.0.4 • Stable Release", hi: "नवीनतम संस्करण: v2.0.4 • स्थिर रिलीज़" },

  // Statistics
  statsDownloads: { en: "App Downloads", hi: "ऐप डाउनलोड" },
  statsActiveUsers: { en: "Monthly Active Users", hi: "मासिक सक्रिय उपयोगकर्ता" },
  statsStations: { en: "Metro Stations Covered", hi: "मेट्रो स्टेशन" },
  statsAttractions: { en: "Tourist Places Mapped", hi: "पर्यटन स्थल" },

  // Journey Planner
  plannerTitle: { en: "Jaipur Metro Route Simulator", hi: "जयपुर मेट्रो मार्ग सिम्युलेटर" },
  plannerSubtitle: { en: "Compute fares, route maps, platforms, and journey duration. Offline-first in React.", hi: "किराए, रूट मैप, प्लेटफॉर्म और यात्रा अवधि की गणना करें।" },
  selectOrigin: { en: "Select Origin Station", hi: "प्रस्थान स्टेशन चुनें" },
  selectDest: { en: "Select Destination Station", hi: "गंतव्य स्टेशन चुनें" },
  fareCalculated: { en: "Estimated Fare", hi: "अनुमानित किराया" },
  journeyTime: { en: "Journey Duration", hi: "यात्रा समय" },
  stationsTraveled: { en: "Stations Crossed", hi: "पार किए जाने वाले स्टेशन" },
  platformHint: { en: "Platform Guide", hi: "प्लेटफॉर्म गाइड" },
  simulationWarning: {
    en: "This is a web simulation. Download the Android app for Live Journey tracking and location alerts.",
    hi: "यह एक वेब सिम्युलेटर है। लाइव यात्रा ट्रैकिंग और जीपीएस अलर्ट के लिए एंड्रॉइड ऐप डाउनलोड करें।"
  },
  boardAt: { en: "Board Train At", hi: "ट्रेन में चढ़ें" },
  exitAt: { en: "Exit Train At", hi: "ट्रेन से उतरें" },
  towards: { en: "towards", hi: "की ओर" },
  stopsList: { en: "Intermediate Stops", hi: "मध्यवर्ती स्टेशन" },
  platformNum: { en: "Platform", hi: "प्लेटफॉर्म" },

  // Explore Jaipur
  exploreTitle: { en: "Discover Jaipur via Metro", hi: "मेट्रो के माध्यम से जयपुर को खोजें" },
  exploreSubtitle: { en: "Jaipur's iconic forts, palaces, and heritage bazaars linked to their nearest Pink Line stations.", hi: "जयपुर के प्रसिद्ध किले, महल और पारंपरिक बाजार जो उनके निकटतम मेट्रो स्टेशन से जुड़े हैं।" },
  nearestStation: { en: "Nearest Metro Station", hi: "निकटतम मेट्रो स्टेशन" },
  walkTime: { en: "Walk Time", hi: "पैदल समय" },
  driveTime: { en: "Drive Time", hi: "गाड़ी से समय" },
  entryFee: { en: "Entry Fee", hi: "प्रवेश शुल्क" },
  bestTime: { en: "Best Time to Visit", hi: "घूमने का सर्वोत्तम समय" },

  // Download App CTA
  downloadTitle: { en: "Download Jaipur Ride App", hi: "जयपुर राइड ऐप डाउनलोड करें" },
  downloadSubtitle: { en: "Take the complete metro assistant offline. Get live location updates, station proximity alerts, offline routes, and safety contacts directly on your Android phone.", hi: "मेट्रो सहायक को पूरी तरह ऑफलाइन उपयोग करें। अपने एंड्रॉइड फोन पर सीधे लाइव लोकेशन अपडेट, स्टेशन अलर्ट और सुरक्षा नंबर प्राप्त करें।" },
  downloadBtnSubtext: { en: "Get it on Google Play", hi: "गूगल प्ले पर उपलब्ध" },
  downloadDirectApk: { en: "Download direct .APK file", hi: "सीधे .APK फ़ाइल डाउनलोड करें" },
  installGuideTitle: { en: "How to Install", hi: "कैसे इंस्टॉल करें" },
  installSteps: {
    en: "1. Tap Download APK. \n2. Allow installation from unknown sources in settings if prompted. \n3. Open file and click install. \n4. Launch Jaipur Ride and explore!",
    hi: "1. डाउनलोड APK पर टैप करें। \n2. पूछे जाने पर अज्ञात स्रोतों से इंस्टॉलेशन की अनुमति दें। \n3. फ़ाइल खोलें और इंस्टॉल पर क्लिक करें। \n4. ऐप खोलें और यात्रा शुरू करें!"
  },
  reqAndroidVersion: { en: "Requires Android 7.0 (Nougat) and above", hi: "एंड्रॉइड 7.0 (नौगट) और उससे ऊपर के लिए आवश्यक" },
  appPermissions: { en: "Permissions Required: Fine Geolocation, Network Status, Local Storage", hi: "आवश्यक अनुमतियां: जीपीएस लोकेशन, नेटवर्क स्थिति, लोकल स्टोरेज" },

  // FAQ
  faqTitle: { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  faqSubtitle: { en: "Have questions? We have answers. If you need anything else, feel free to contact us.", hi: "कुछ प्रश्न हैं? हमारे पास जवाब हैं। यदि आपको कुछ और चाहिए, तो हमसे संपर्क करें।" },

  // Contact
  contactTitle: { en: "Contact Us & Submit Feedback", hi: "संपर्क करें और प्रतिक्रिया दें" },
  contactSubtitle: { en: "Report bugs, request new features, or send general inquiries to our development team.", hi: "बग रिपोर्ट करें, नई सुविधाओं का अनुरोध करें, या हमारे डेवलपर टीम को सामान्य पूछताछ भेजें।" },
  formName: { en: "Your Name", hi: "आपका नाम" },
  formEmail: { en: "Email Address", hi: "ईमेल पता" },
  formType: { en: "Feedback Type", hi: "प्रतिक्रिया का प्रकार" },
  formTypeBug: { en: "Bug Report", hi: "बग रिपोर्ट" },
  formTypeFeature: { en: "Feature Request", hi: "सुविधा का अनुरोध" },
  formTypeInquiry: { en: "General Inquiry", hi: "सामान्य पूछताछ" },
  formMessage: { en: "Message", hi: "संदेश" },
  formSubmitSuccess: { en: "Feedback submitted successfully! Thank you.", hi: "प्रतिक्रिया सफलतापूर्वक भेज दी गई! धन्यवाद।" }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language preference from local storage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("jaipur-ride-locale") as Language;
    if (savedLanguage === "en" || savedLanguage === "hi") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("jaipur-ride-locale", lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key; // Return the key as fallback
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
