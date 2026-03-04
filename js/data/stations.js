// ============================================================
//  JAIPUR RIDE — Metro Data
//  Pink Line: Mansarovar ↔ Badi Chaupar | 11 stations
// ============================================================

export const metroData = {
  pink: {
    name: "Pink Line",
    color: "#EC4899",
    stations: [
      { id: "J01", name: "Mansarovar",        lat: 26.879531, lon: 75.749971, maps_link: "https://www.google.com/maps/search/?api=1&query=26.879531,75.749971", timeToNext: 120, distanceToNext: 1.2, platforms: { forward: 2, backward: 1 } },
      { id: "J02", name: "New Aatish Market",  lat: 26.880308, lon: 75.764602, maps_link: "https://www.google.com/maps/search/?api=1&query=26.880308,75.764602", timeToNext: 115, distanceToNext: 1.1, platforms: { forward: 2, backward: 1 } },
      { id: "J03", name: "Vivek Vihar",        lat: 26.888952, lon: 75.768499, maps_link: "https://www.google.com/maps/search/?api=1&query=26.888952,75.768499", timeToNext: 110, distanceToNext: 1.0, platforms: { forward: 2, backward: 1 } },
      { id: "J04", name: "Shyam Nagar",        lat: 26.896650, lon: 75.770667, maps_link: "https://www.google.com/maps/search/?api=1&query=26.896650,75.770667", timeToNext: 115, distanceToNext: 1.1, platforms: { forward: 2, backward: 1 } },
      { id: "J05", name: "Ram Nagar",          lat: 26.901944, lon: 75.774652, maps_link: "https://www.google.com/maps/search/?api=1&query=26.901944,75.774652", timeToNext: 125, distanceToNext: 1.2, platforms: { forward: 2, backward: 1 } },
      { id: "J06", name: "Civil Lines",        lat: 26.909585, lon: 75.781277, maps_link: "https://www.google.com/maps/search/?api=1&query=26.909585,75.781277", timeToNext: 130, distanceToNext: 1.3, platforms: { forward: 2, backward: 1 } },
      { id: "J07", name: "Railway Station",    lat: 26.918559, lon: 75.789903, maps_link: "https://www.google.com/maps/search/?api=1&query=26.918559,75.789903", timeToNext: 120, distanceToNext: 1.2, platforms: { forward: 2, backward: 1 } },
      { id: "J08", name: "Sindhi Camp",        lat: 26.922563, lon: 75.799747, maps_link: "https://www.google.com/maps/search/?api=1&query=26.922563,75.799747", timeToNext: 110, distanceToNext: 1.0, platforms: { forward: 2, backward: 1 } },
      { id: "J09", name: "Chandpole",          lat: 26.926370, lon: 75.807456, maps_link: "https://www.google.com/maps/search/?api=1&query=26.926370,75.807456", timeToNext: 105, distanceToNext: 1.0, platforms: { forward: 2, backward: 1 } },
      { id: "J10", name: "Chhoti Chaupar",     lat: 26.924720, lon: 75.818456, maps_link: "https://www.google.com/maps/search/?api=1&query=26.924720,75.818456", timeToNext:  95, distanceToNext: 0.9, platforms: { forward: 2, backward: 1 } },
      { id: "J11", name: "Badi Chaupar",       lat: 26.922960, lon: 75.826814, maps_link: "https://www.google.com/maps/search/?api=1&query=26.922960,75.826814", timeToNext:   0, distanceToNext: 0,   platforms: { forward: 2, backward: 1 } }
    ]
  }
};

export const translations = {
  en: {
    appName: "Jaipur Ride",
    planYourTrip: "Plan Your Trip",
    selectStationsHint: "Select stations to see the fastest route.",
    startLiveJourney: "Start Live Journey",
    disclaimer: "Disclaimer: Timings and fare are estimates.",
    nextTrain: "Next Train",
    totalTime: "Total Time",
    estFare: "Est. Fare",
    minutes: "min",
    now: "Now",
    route: "Route",
    stops: "Stops",
    depart: "Depart",
    arrive: "Arrive",
    boardAt: "Board at",
    towards: "Towards",
    liveJourney: "Live Journey",
    nextStop: "Next Stop",
    exitJourney: "Exit Journey",
    platform: "Platform",
    numStops: "Stops",
    minRemaining: "min remaining",
    walkTime: "min walk",
    navPlan: "Plan",
    navExplore: "Explore",
    navStations: "Stations",
    navTools: "Safety",
    normalService: "Normal Service",
    heroTitle: "Where to today?",
    iamat: "I am at...",
    findNearest: "Find nearest station & navigate",
    fare: "Fare",
    timings: "Timings",
    stations: "Stations",
    safety: "Safety",
    back: "Back",
    simulationDisclaimer: "Estimated times · Not an official JMRC app",
    allStationsSub: "Pink Line • Tap a station to discover nearby gems",
    timingsSub: "Jaipur Metro schedule",
    safetyHelp: "Safety & Help",
    safetySub: "Emergency contacts & useful info",
    exit: "Exit",
    liveJourneyUpper: "LIVE JOURNEY",
    simulatedDisclaimer: "Simulated · Not an official JMRC service",
    navigate: "Navigate",
    navigatePrompt: "Navigate to",
    selectOrigin: "From — Select origin",
    selectDestination: "To — Select destination",
    searchPlaceholder: "Search your station...",
    noStationsFound: "No stations found",
    fromPlaceholder: "Enter starting station",
    toPlaceholder: "Where are you going?",
    noRouteFound: "No route found",
    selectBothStations: "Please select both stations",
    startAndEndDifferent: "Start and end must be different",
    detectingLocation: "Detecting your location...",
    nearest: "Nearest",
    locAccessDenied: "Location access denied",
    noNearbyStation: "Could not find nearby station",
    smartCardFare: "Smart Card Fare",
    seniorCitizenFare: "Senior Citizen",
    studentFare: "Student Fare"
  },
  hi: {
    appName: "जयपुर राइड",
    planYourTrip: "यात्रा की योजना बनाएं",
    selectStationsHint: "सबसे तेज़ मार्ग देखने के लिए स्टेशन चुनें।",
    startLiveJourney: "लाइव यात्रा शुरू करें",
    disclaimer: "अस्वीकरण: समय और किराया अनुमानित हैं।",
    nextTrain: "अगली ट्रेन",
    totalTime: "कुल समय",
    estFare: "अनुमानित किराया",
    minutes: "मिनट",
    now: "अभी",
    route: "मार्ग",
    stops: "स्टॉप",
    depart: "प्रस्थान",
    arrive: "आगमन",
    boardAt: "चढ़ें",
    towards: "की ओर",
    liveJourney: "लाइव यात्रा",
    nextStop: "अगला स्टेशन",
    exitJourney: "यात्रा समाप्त करें",
    platform: "प्लेटफॉर्म",
    numStops: "स्टॉप",
    minRemaining: "मिनट शेष",
    walkTime: "मिनट पैदल",
    navPlan: "प्लान",
    navExplore: "एक्सप्लोर",
    navStations: "स्टेशन",
    navTools: "सुरक्षा",
    normalService: "सामान्य सेवा",
    heroTitle: "आज कहाँ<br>जाना है?",
    iamat: "मैं यहाँ हूँ...",
    findNearest: "निकटतम स्टेशन खोजें और नेविगेट करें",
    fare: "किराया",
    timings: "समय",
    stations: "स्टेशन",
    safety: "सुरक्षा",
    back: "पीछे",
    simulationDisclaimer: "अनुमानित समय · यह आधिकारिक JMRC ऐप नहीं है",
    allStationsSub: "पिंक लाइन • प्रसिद्ध स्थलों को देखने के लिए स्टेशन पर टैप करें",
    timingsSub: "जयपुर मेट्रो समय सारणी",
    safetyHelp: "सुरक्षा और सहायता",
    safetySub: "आपातकालीन संपर्क और उपयोगी जानकारी",
    exit: "बाहर निकलें",
    liveJourneyUpper: "लाइव यात्रा",
    simulatedDisclaimer: "सिम्युलेटेड · आधिकारिक JMRC सेवा नहीं",
    navigate: "नेविगेट करें",
    navigatePrompt: "नेविगेट करें",
    selectOrigin: "प्रस्थान — स्टेशन चुनें",
    selectDestination: "गंतव्य — स्टेशन चुनें",
    searchPlaceholder: "स्टेशन का नाम लिखें...",
    noStationsFound: "कोई स्टेशन नहीं मिला",
    fromPlaceholder: "शुरुआती स्टेशन चुनें",
    toPlaceholder: "आप कहाँ जा रहे हैं?",
    noRouteFound: "कोई मार्ग नहीं मिला",
    selectBothStations: "कृपया दोनों स्टेशन चुनें",
    startAndEndDifferent: "प्रस्थान और गंतव्य अलग होने चाहिए",
    detectingLocation: "आपकी लोकेशन का पता लगाया जा रहा है...",
    nearest: "निकटतम",
    locAccessDenied: "लोकेशन एक्सेस की अनुमति नहीं है",
    noNearbyStation: "कोई पास का स्टेशन नहीं मिला",
    smartCardFare: "स्मार्ट कार्ड किराया",
    seniorCitizenFare: "वरिष्ठ नागरिक",
    studentFare: "छात्र किराया"
  }
};

export const stationTranslations = {
  "Mansarovar":        { hi: "मानसरोवर" },
  "New Aatish Market": { hi: "न्यू आतिश मार्केट" },
  "Vivek Vihar":       { hi: "विवेक विहार" },
  "Shyam Nagar":       { hi: "श्याम नगर" },
  "Ram Nagar":         { hi: "राम नगर" },
  "Civil Lines":       { hi: "सिविल लाइन्स" },
  "Railway Station":   { hi: "रेलवे स्टेशन" },
  "Sindhi Camp":       { hi: "सिंधी कैंप" },
  "Chandpole":         { hi: "चांदपोल" },
  "Chhoti Chaupar":    { hi: "छोटी चौपड़" },
  "Badi Chaupar":      { hi: "बड़ी चौपड़" },
  "Pink Line":         { hi: "पिंक लाइन" }
};

export const lineNameMap = {
  "Pink Line": "Pink Line"
};

// Fare logic (Effective Jan 31, 2025)
// Pricing based on number of stations traveled
export function calculateFare(stationCount) {
  if (stationCount <= 2) return 10; // Short
  if (stationCount <= 5) return 15; // Medium
  if (stationCount <= 8) return 25; // Long
  return 30; // 9+ stations (Extended)
}

// Safety data
export const safetyData = {
  emergencyNumbers: [
    { name: "Metro Helpline",   nameHi: "मेट्रो हेल्पलाइन",  number: "18001806236", available: "24/7" },
    { name: "Tourist Helpline", nameHi: "टूरिस्ट हेल्पलाइन", number: "1364",        available: "24/7" },
    { name: "Police",           nameHi: "पुलिस",              number: "100",         available: "24/7" },
    { name: "Ambulance",        nameHi: "एम्बुलेंस",          number: "108",         available: "24/7" },
    { name: "Women Helpline",   nameHi: "महिला हेल्पलाइन",   number: "1091",        available: "24/7" },
    { name: "Fire",             nameHi: "अग्निशमन",           number: "101",         available: "24/7" }
  ]
};

// Tourist trails
export const touristTrails = [];