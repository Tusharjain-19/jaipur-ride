// ─────────────────────────────────────────────────────────────────────────────
// JaipurRide — stationAttractions.js
// Proximity rule : only attractions within 2–3.2 km road distance per station
// Verified exceptions (kept regardless of distance):
//   Amer Fort · Jaigarh Fort · Jal Mahal · Galta Ji Temple
//   Birla Mandir · Patrika Gate · ISKCON Temple
// All distances sourced from YoMetro.com & JMRC official data (2026)
// walk_time_min = distance_km × 12  |  last_mile: true if >3 km or non-walkable
// ─────────────────────────────────────────────────────────────────────────────

export const stationAttractions = {

  // ══════════════════════════════════════════════════════════════
  // 1 · MANSAROVAR  |  26.8628°N  75.7434°E  ·  Elevated
  // ══════════════════════════════════════════════════════════════
  "Mansarovar": [
    {
      // ⚑ EXCEPTION — major temple, no closer Pink Line station
      id: "iskcon_jaipur",
      name: "ISKCON Temple",
      nameHi: "इस्कॉन मंदिर",
      type: "Temple",
      typeHi: "मंदिर",
      lat: 26.8430,
      lon: 75.7593,
      distance_km: 3.8,
      walk_time_min: null,
      approx_drive_distance_km: 4.2,
      approx_drive_time_min: 14,
      last_mile: true,
      summary: "Beautiful Krishna temple with ornate architecture and a spiritual vibe.",
      summaryHi: "भगवान कृष्ण का सुंदर मंदिर, जो अपनी वास्तुकला और आध्यात्मिक वातावरण के लिए प्रसिद्ध है।",
      description: "A major Krishna temple set on several acres of land, known for its stunning white marble architecture and beautifully maintained gardens. It features a Govinda's vegetarian restaurant, a bookstore, and peaceful prayer halls that offer a serene escape from the city bustle.",
      descriptionHi: "कई एकड़ भूमि में फैला भगवान कृष्ण का एक प्रमुख मंदिर, जो अपनी शानदार सफेद संगमरमर की वास्तुकला और सुंदर उद्यानों के लिए जाना जाता है। इसमें गोविंदा का शाकाहारी भोजनालय, एक किताबों की दुकान और शांतिपूर्ण प्रार्थना कक्ष हैं जो शहर की हलचल से दूर एक शांत अनुभव प्रदान करते हैं।",
      entry_fee: "Free",
      best_time: "6:30 AM - 8:00 AM & 7:00 PM - 8:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.8430,75.7593",
      image: "assets/images/iskcon_temple.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 2 · NEW AATISH MARKET  |  26.8678°N  75.7545°E  ·  Elevated
  // No tourist attractions within 3.2 km
  // ══════════════════════════════════════════════════════════════
  "New Aatish Market": [],

  // ══════════════════════════════════════════════════════════════
  // 3 · VIVEK VIHAR  |  26.8734°N  75.7659°E  ·  Elevated
  // WTP removed (5.36 km — too far, not an approved exception)
  // ══════════════════════════════════════════════════════════════
  "Vivek Vihar": [
    {
      // ⚑ EXCEPTION — iconic Jaipur landmark, nearest Pink Line station
      id: "patrika_gate",
      name: "Patrika Gate",
      nameHi: "पत्रिका गेट",
      type: "Monument",
      typeHi: "स्मारक",
      lat: 26.8627,
      lon: 75.8011,
      distance_km: 6.22,
      walk_time_min: null,
      approx_drive_distance_km: 7.5,
      approx_drive_time_min: 22,
      last_mile: true,
      description: "A vibrant, hand-painted gateway representing Rajasthan's rich culture and heritage. One of the most photographed spots in Jaipur.",
      descriptionHi: "राजस्थान की समृद्ध संस्कृति और विरासत का प्रतिनिधित्व करने वाला एक जीवंत, हाथ से चित्रित गेट। जयपुर के सबसे चर्चित फोटोशूट स्थानों में से एक।",
      entry_fee: "Free",
      best_time: "6:00 AM - 8:00 AM or 7:30 PM - 9:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.8627,75.8011",
      image: "assets/images/patrika_gate.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 4 · SHYAM NAGAR  |  26.8793°N  75.7775°E  ·  Elevated
  // ══════════════════════════════════════════════════════════════
  "Shyam Nagar": [
    {
      id: "diggi_palace",
      name: "Diggi Palace",
      nameHi: "डिग्गी पैलेस",
      type: "Palace",
      typeHi: "महल",
      lat: 26.8992,
      lon: 75.8094,
      distance_km: 3.2,
      walk_time_min: null,
      approx_drive_distance_km: 4.0,
      approx_drive_time_min: 14,
      last_mile: true,
      description: "A heritage haveli famous for hosting the Jaipur Literature Festival. Features beautiful courtyards and gardens.",
      descriptionHi: "जयपुर साहित्य उत्सव (JLF) की मेजबानी के लिए प्रसिद्ध एक विरासत हवेली। इसमें सुंदर आंगन और बगीचे हैं।",
      entry_fee: "Free (grounds)",
      best_time: "9:00 AM - 6:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.8992,75.8094",
      image: "assets/images/diggi_palace.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 5 · RAM NAGAR  |  26.8873°N  75.7897°E  ·  Elevated
  // ══════════════════════════════════════════════════════════════
  "Ram Nagar": [
    {
      id: "jawahar_kala_kendra",
      name: "Jawahar Kala Kendra",
      nameHi: "जवाहर कला केंद्र",
      type: "Museum",
      typeHi: "संग्रहालय",
      lat: 26.9042,
      lon: 75.8160,
      distance_km: 2.8,
      walk_time_min: null,
      approx_drive_distance_km: 3.5,
      approx_drive_time_min: 12,
      last_mile: true,
      description: "A multi-arts centre designed to preserve Rajasthani arts and crafts. Known for its unique architecture and galleries.",
      descriptionHi: "राजस्थानी कला और शिल्प को संरक्षित करने के लिए डिज़ाइन किया गया एक बहु-कला केंद्र। अपनी अनूठी वास्तुकला और दीर्घाओं के लिए जाना जाता है।",
      entry_fee: "₹20 (Indians) / ₹50 (Foreigners)",
      best_time: "10:00 AM - 6:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9042,75.8160",
      image: "assets/images/jawahar_kala_kendra.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 6 · CIVIL LINES  |  26.8963°N  75.8006°E  ·  Elevated
  // ══════════════════════════════════════════════════════════════
  "Civil Lines": [
    {
      // ⚑ EXCEPTION — major temple, no closer Pink Line station
      id: "birla_mandir",
      name: "Birla Mandir",
      nameHi: "बिड़ला मंदिर",
      type: "Temple",
      typeHi: "मंदिर",
      lat: 26.8983,
      lon: 75.8268,
      distance_km: 3.9,
      walk_time_min: null,
      approx_drive_distance_km: 4.8,
      approx_drive_time_min: 16,
      last_mile: true,
      description: "A stunning white marble temple dedicated to Lord Vishnu and Goddess Lakshmi. Especially beautiful when illuminated at night.",
      descriptionHi: "भगवान विष्णु और देवी लक्ष्मी को समर्पित एक शानदार सफेद संगमरमर का मंदिर। रात में रोशनी होने पर यह और भी सुंदर लगता है।",
      entry_fee: "Free",
      best_time: "6:30 AM - 12:30 PM / 3:00 PM - 8:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.8983,75.8268",
      image: "assets/images/birla_mandir.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 7 · RAILWAY STATION  |  26.9127°N  75.7832°E  ·  Elevated
  // Directly connected to Jaipur Junction (pedestrian link)
  // ══════════════════════════════════════════════════════════════
  "Railway Station": [
    {
      id: "jaipur_junction_heritage",
      name: "Jaipur Junction",
      nameHi: "जयपुर जंक्शन",
      type: "Monument",
      typeHi: "स्मारक",
      lat: 26.9200,
      lon: 75.7870,
      distance_km: 0.6,
      walk_time_min: 8,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "One of India's most beautiful railway stations, featuring Rajput-Mughal style architecture and a pink sandstone facade.",
      descriptionHi: "भारत के सबसे सुंदर रेलवे स्टेशनों में से एक, जिसमें राजपूत-मुगल शैली की वास्तुकला और गुलाबी बलुआ पत्थर का मुखौटा है।",
      entry_fee: "Free (platform ticket ₹10)",
      best_time: "Any time - early morning for photography",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9200,75.7870",
      image: "assets/images/jaipur_junction.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 8 · SINDHI CAMP  |  26.9220°N  75.7954°E  ·  Elevated
  // Adjacent to Sindhi Camp inter-state bus terminal
  // ══════════════════════════════════════════════════════════════
  "Sindhi Camp": [
    {
      id: "raj_mandir_cinema",
      name: "Raj Mandir Cinema",
      nameHi: "राज मंदिर सिनेमा",
      type: "Monument",
      typeHi: "स्मारक",
      lat: 26.9189,
      lon: 75.8068,
      distance_km: 1.19,
      walk_time_min: 15,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A famous Art Deco cinema hall known as the 'Pride of Asia'. Watching a Bollywood movie here is a unique Jaipur experience.",
      descriptionHi: "एक प्रसिद्ध आर्ट डेको सिनेमा हॉल जिसे 'एशिया का गौरव' कहा जाता है। यहां बॉलीवुड फिल्म देखना जयपुर का एक अनूठा अनुभव है।",
      entry_fee: "₹130 - ₹280",
      best_time: "Evening shows",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9189,75.8068",
      image: "assets/images/raj_mandir.jpg"
    },
    {
      id: "mi_road",
      name: "MI Road",
      nameHi: "एमआई रोड",
      type: "Market",
      typeHi: "बाजार",
      lat: 26.9160,
      lon: 75.8120,
      distance_km: 1.5,
      walk_time_min: 18,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Jaipur's main commercial street, home to traditional sweet shops, luxury boutiques, and high-end restaurants.",
      descriptionHi: "जयपुर की मुख्य व्यावसायिक सड़क, जहां पारंपरिक मिठाई की दुकानें, लक्जरी बुटीक और शानदार रेस्टोरेंट हैं।",
      entry_fee: "Free",
      best_time: "6:00 PM - 10:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9160,75.8120",
      image: "assets/images/mi_road.jpg"
    },
    {
      id: "central_park_jaipur",
      name: "Central Park",
      nameHi: "सेंट्रल पार्क",
      type: "Park",
      typeHi: "पार्क",
      lat: 26.9127,
      lon: 75.8042,
      distance_km: 2.4,
      walk_time_min: null,
      approx_drive_distance_km: 3.0,
      approx_drive_time_min: 10,
      last_mile: true,
      description: "A large urban park featuring a musical fountain, jogging tracks, and the tallest flagpole in the state.",
      descriptionHi: "एक विशाल शहरी पार्क जिसमें म्यूजिकल फाउंटेन, जॉगिंग ट्रैक और राज्य का सबसे ऊंचा ध्वजस्तंभ है।",
      entry_fee: "Free",
      best_time: "5:30 AM - 8:00 AM or 5:00 PM - 7:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9127,75.8042",
      image: "assets/images/central_park.jpg"
    },
    {
      id: "rambagh_palace",
      name: "Rambagh Palace",
      nameHi: "रामबाग पैलेस",
      type: "Palace",
      typeHi: "महल",
      lat: 26.8930,
      lon: 75.8155,
      distance_km: 3.0,
      walk_time_min: null,
      approx_drive_distance_km: 3.8,
      approx_drive_time_min: 12,
      last_mile: true,
      description: "A former royal residence turned luxury hotel, set in 47 acres of beautiful Mughal gardens.",
      descriptionHi: "एक पूर्व शाही निवास जिसे अब लक्जरी होटल में बदल दिया गया है, जो 47 एकड़ के सुंदर मुगल उद्यानों में स्थित है।",
      entry_fee: "Dining/Tea visits",
      best_time: "4:00 PM - 7:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.8930,75.8155",
      image: "assets/images/rambagh_palace.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 9 · CHANDPOLE  |  26.9239°N  75.8090°E  ·  Elevated
  // Western gateway to the Walled City (Pink City)
  // Maharani Ki Chhatri (3.4 km) removed — over limit, not an exception
  // ══════════════════════════════════════════════════════════════
  "Chandpole": [
    {
      id: "chandpole_bazaar",
      name: "Chandpole Bazaar",
      nameHi: "चांदपोल बाजार",
      type: "Market",
      typeHi: "बाजार",
      lat: 26.9236,
      lon: 75.8095,
      distance_km: 0.2,
      walk_time_min: 3,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      summary: "Historic market famous for marble crafts and blue pottery.",
      summaryHi: "संगमरमर के शिल्प और ब्लू पॉटरी के लिए प्रसिद्ध ऐतिहासिक बाजार।",
      description: "One of Jaipur's oldest commercial streets running from Chandpole Gate. It specializes in white marble handicrafts, hand-carved furniture, and the city's famous blue pottery. The area provides a very authentic glimpse into the traditional trading culture of the Pink City.",
      descriptionHi: "चांदपोल गेट से शुरू होने वाली जयपुर की सबसे पुरानी व्यावसायिक सड़कों में से एक। यह सफेद संगमरमर के हस्तशिल्प, हाथ से नक्काशीदार फर्नीचर और शहर की प्रसिद्ध ब्लू पॉटरी में माहिर है। यह क्षेत्र गुलाबी शहर की पारंपरिक व्यापारिक संस्कृति की एक वास्तविक झलक पेश करता है।",
      entry_fee: "Free",
      best_time: "9:00 AM - 8:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9236,75.8095",
      image: "assets/images/chandpole_bazaar.jpg"
    },
    {
      id: "isarlat_tower",
      name: "Isarlat Tower",
      nameHi: "इसरलाट मीनार",
      type: "Monument",
      typeHi: "स्मारक",
      lat: 26.9242,
      lon: 75.8135,
      distance_km: 0.6,
      walk_time_min: 8,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      summary: "7-storey victory tower with 360-degree city views.",
      summaryHi: "शहर के 360-डिग्री दृश्यों वाली 7 मंजिला विजय मीनार।",
      description: "A dramatic 30-metre victory tower built in 1749 by Maharaja Ishwari Singh. A spiral internal staircase climbs to the rooftop, offering a sweeping panoramic view over the entire Walled City. It is one of Jaipur's best-kept secrets and is often overlooked by tourists.",
      descriptionHi: "1749 में महाराजा ईश्वरी सिंह द्वारा निर्मित एक शानदार 30-मीटर ऊंची विजय मीनार। भीतर की घुमावदार सीढ़ियां छत तक जाती हैं, जहां से पूरे परकोटा शहर का मनोरम दृश्य दिखाई देता है। यह जयपुर के सबसे गुप्त रहस्यों में से एक है और अक्सर पर्यटकों की नजरों से बच जाता है।",
      entry_fee: "₹30 (Indians) / ₹70 (Foreigners)",
      best_time: "9:00 AM - 5:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9242,75.8135",
      image: "assets/images/isarlat_tower.jpg"
    },
    {
      id: "sanjay_sharma_museum",
      name: "Sanjay Sharma Museum",
      nameHi: "संजय शर्मा संग्रहालय",
      type: "Museum",
      typeHi: "संग्रहालय",
      lat: 26.9229,
      lon: 75.8108,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A private museum with a vast collection of ancient manuscripts, Rajput paintings, and historical artifacts.",
      descriptionHi: "प्राचीन पांडुलिपियों, राजपूत चित्रों और ऐतिहासिक कलाकृतियों के विशाल संग्रह वाला एक निजी संग्रहालय।",
      entry_fee: "₹20 (Indians) / ₹100 (Foreigners)",
      best_time: "9:00 AM - 5:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9229,75.8108",
      image: "assets/images/sanjay_sharma_museum.jpg"
    },
    {
      id: "albert_hall_museum",
      name: "Albert Hall Museum",
      nameHi: "अल्बर्ट हॉल संग्रहालय",
      type: "Museum",
      typeHi: "संग्रहालय",
      lat: 26.9124,
      lon: 75.8219,
      distance_km: 2.03,
      walk_time_min: 25,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Rajasthan's oldest museum, famous for its Indo-Saracenic architecture and diverse collection of artifacts.",
      descriptionHi: "राजस्थान का सबसे पुराना संग्रहालय, जो अपनी इंडो-सारासेनिक वास्तुकला और कलाकृतियों के विविध संग्रह के लिए प्रसिद्ध है।",
      entry_fee: "₹40 (Indians) / ₹300 (Foreigners)",
      best_time: "10:00 AM - 5:00 PM / 7:00 PM - 10:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9124,75.8219",
      image: "assets/images/albert_hall.jpg"
    },
    {
      id: "nahargarh_fort",
      name: "Nahargarh Fort",
      nameHi: "नाहरगढ़ किला",
      type: "Fort",
      typeHi: "किला",
      lat: 26.9429,
      lon: 75.8124,
      distance_km: 2.5,
      walk_time_min: null,
      approx_drive_distance_km: 4.5,
      approx_drive_time_min: 18,
      last_mile: true,
      description: "A hilltop fort offering breathtaking sunset views of the entire Pink City.",
      descriptionHi: "पहाड़ी पर स्थित एक किला जो पूरे गुलाबी शहर (Pink City) के सूर्यास्त का लुभावना दृश्य प्रस्तुत करता है।",
      entry_fee: "₹50 (Indians) / ₹200 (Foreigners)",
      best_time: "5:00 PM - 8:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9429,75.8124",
      image: "assets/images/nahargarh_fort.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 10 · CHHOTI CHAUPAR  |  26.9248°N  75.8179°E  ·  Underground
  // Heart of the Walled City — all attractions are within 1.4 km
  // ══════════════════════════════════════════════════════════════
  "Chhoti Chaupar": [
    {
      id: "govind_dev_ji_temple",
      name: "Govind Dev Ji Temple",
      nameHi: "गोविंद देव जी मंदिर",
      type: "Temple",
      typeHi: "मंदिर",
      lat: 26.9268,
      lon: 75.8213,
      distance_km: 0.5,
      walk_time_min: 7,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A highly revered Krishna temple located within the City Palace complex. Famous for its daily Aarti sessions.",
      descriptionHi: "सिटी पैलेस परिसर के भीतर स्थित एक अत्यधिक पूजनीय कृष्ण मंदिर। यह अपने दैनिक आरती सत्रों के लिए प्रसिद्ध है।",
      entry_fee: "Free",
      best_time: "Multiple Aarti times (e.g. 5:30 PM, 6:30 PM)",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9268,75.8213",
      image: "assets/images/govind_dev_ji.jpg"
    },
    {
      id: "tripolia_bazaar",
      name: "Tripolia Bazaar",
      nameHi: "त्रिपोलिया बाजार",
      type: "Market",
      typeHi: "बाजार",
      lat: 26.9252,
      lon: 75.8200,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A traditional market specializing in lac bangles, brassware, and local handicrafts.",
      descriptionHi: "लाख की चूड़ियों, पीतल के बर्तनों और स्थानीय हस्तशिल्प में विशेषज्ञता रखने वाला एक पारंपरिक बाजार।",
      entry_fee: "Free",
      best_time: "9:00 AM - 8:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9252,75.8200",
      image: "assets/images/tripolia_bazaar.jpg"
    },
    {
      id: "bapu_bazaar",
      name: "Bapu Bazaar",
      nameHi: "बापू बाजार",
      type: "Market",
      typeHi: "बाजार",
      lat: 26.9211,
      lon: 75.8220,
      distance_km: 0.6,
      walk_time_min: 8,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Jaipur's famous market for textiles, block-printed fabrics, and traditional footwear (juttis).",
      descriptionHi: "कपड़ों, ब्लॉक-प्रिंटेड फैब्रिक और पारंपरिक जूतियों (मोजड़ी) के लिए जयपुर का प्रसिद्ध बाजार।",
      entry_fee: "Free",
      best_time: "10:00 AM - 9:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9211,75.8220",
      image: "assets/images/bapu_bazaar.jpg"
    },
    {
      id: "nehru_bazaar",
      name: "Nehru Bazaar",
      nameHi: "नेहरू बाजार",
      type: "Market",
      typeHi: "बाजार",
      lat: 26.9153,
      lon: 75.8212,
      distance_km: 1.1,
      walk_time_min: 14,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A vibrant market known for its colorful mojari shoes and authentic Rajasthani textiles.",
      descriptionHi: "रंगीन मोजड़ी जूतों और प्रामाणिक राजस्थानी कपड़ों के लिए जाना जाने वाला एक जीवंत बाजार।",
      entry_fee: "Free",
      best_time: "10:00 AM - 9:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9153,75.8212",
      image: "assets/images/nehru_bazaar.jpg"
    },
    {
      id: "ram_niwas_garden",
      name: "Ram Niwas Garden",
      nameHi: "राम निवास बाग",
      type: "Park",
      typeHi: "पार्क",
      lat: 26.9116,
      lon: 75.8218,
      distance_km: 1.4,
      walk_time_min: 17,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A historical public garden home to the Albert Hall Museum, a zoo, and beautiful evening walks.",
      descriptionHi: "एक ऐतिहासिक सार्वजनिक उद्यान जिसमें अल्बर्ट हॉल संग्रहालय, एक चिड़ियाघर और शाम की सैर के लिए सुंदर स्थान है।",
      entry_fee: "Free (Garden) / Pay for Zoo",
      best_time: "8:00 AM - 11:00 AM or 5:00 PM - 6:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9116,75.8218",
      image: "assets/images/ram_niwas_garden.jpg"
    }
  ],

  // ══════════════════════════════════════════════════════════════
  // 11 · BADI CHAUPAR  |  26.9250°N  75.8240°E  ·  Underground
  // Eastern terminus — closest station to Hawa Mahal, City Palace,
  // Jantar Mantar (confirmed JMRC official, jaipurmetro.com)
  // Far attractions kept as approved exceptions only:
  //   Amer Fort ✓ · Jaigarh Fort ✓ · Jal Mahal ✓ · Galta Ji ✓
  // Removed: Kanak Vrindavan (4.8 km), Sisodia Rani (9.1 km),
  //          Panna Meena Ka Kund (7.2 km from station)
  // ══════════════════════════════════════════════════════════════
  "Badi Chaupar": [
    {
      id: "hawa_mahal",
      name: "Hawa Mahal",
      nameHi: "हवा महल",
      type: "Palace",
      typeHi: "महल",
      lat: 26.9239,
      lon: 75.8267,
      distance_km: 0.3,
      walk_time_min: 4,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      heritage: true,
      summary: "Iconic 5-storey 'Palace of Winds' with 953 windows.",
      summaryHi: "953 खिड़कियों वाला प्रतिष्ठित 5 मंजिला 'हवाओं का महल'।",
      description: "The most photographed façade in Rajasthan - a 5-storey pink sandstone screen with 953 latticed jharokha windows, built in 1799 by Maharaja Sawai Pratap Singh. Designed so royal women in purdah could observe street life unseen. Part of the UNESCO Walled City of Jaipur. Enter from the rear gate on Johari Bazaar Road for the full interior.",
      descriptionHi: "राजस्थान का सबसे अधिक फोटो खींचा जाने वाला स्थल - 953 नक्काशीदार झरोखों वाला 5 मंजिला गुलाबी बलुआ पत्थर का महल, जिसे 1799 में महाराजा सवाई प्रताप सिंह ने बनवाया था। इसे इसलिए बनाया गया था ताकि शाही महिलाएं बिना किसी की नजर में आए सड़क के जीवन को देख सकें। यह यूनेस्को विश्व धरोहर (जयपुर परकोटा क्षेत्र) का हिस्सा है।",
      entry_fee: "₹50 (Indians) / ₹200 (Foreigners)",
      best_time: "8:00 AM - 10:00 AM for photography",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9239,75.8267",
      image: "assets/images/hawa_mahal.jpg"
    },
    {
      id: "city_palace",
      name: "City Palace",
      nameHi: "सिटी पैलेस",
      type: "Palace",
      typeHi: "महल",
      lat: 26.9257,
      lon: 75.8236,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      heritage: true,
      summary: "Grand complex of courtyards, museums, and Rajput-Mughal architecture.",
      summaryHi: "आंगनों, संग्रहालयों और राजपूत-मुगल वास्तुकला का भव्य परिसर।",
      description: "The royal seat of the Jaipur House since 1729, a blend of Rajput, Mughal, and European architecture across multiple courtyards. Highlights include the Mubarak Mahal, Diwan-e-Khas with its legendary silver vessels, and the Maharaja Sawai Man Singh II Museum. The royal family still resides in part of the palace.",
      descriptionHi: "1729 से जयपुर राजघराने का निवास स्थल, जो कि कई आंगनों में फैली राजपूत, मुगल और यूरोपीय वास्तुकला का मिश्रण है। मुख्य आकर्षणों में मुबारक महल, प्रसिद्ध चांदी के बर्तनों वाला दीवान-ए-खास और महाराजा सवाई मान सिंह द्वितीय संग्रहालय शामिल हैं। राजपरिवार अभी भी महल के एक हिस्से में रहता है।",
      entry_fee: "₹200 (Indians) / ₹700 (Foreigners)",
      best_time: "9:30 AM - 12:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9257,75.8236",
      image: "assets/images/city_palace.jpg"
    },
    {
      id: "jantar_mantar",
      name: "Jantar Mantar",
      nameHi: "जंतर मंतर",
      type: "Monument",
      typeHi: "स्मारक",
      lat: 26.9247,
      lon: 75.8237,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      heritage: true,
      summary: "UNESCO World Heritage stone observatory with world's largest sundial.",
      summaryHi: "यूनेस्को विश्व धरोहर पत्थर की वेधशाला, जिसमें दुनिया की सबसे बड़ी सौर घड़ी है।",
      description: "A UNESCO World Heritage Site containing 19 monumental astronomical instruments built in 1734 by Maharaja Sawai Jai Singh II. It features the world's largest stone sundial and is considered an architectural and astronomical marvel. The instruments allow the observation of astronomical positions with the naked eye.",
      descriptionHi: "यूनेस्को विश्व धरोहर स्थल जिसमें 1734 में महाराजा सवाई जय सिंह द्वितीय द्वारा निर्मित 19 विशाल खगोलीय उपकरण हैं। इसमें दुनिया की सबसे बड़ी पत्थर की सौर घड़ी है और इसे एक वास्तुकला और खगोलीय चमत्कार माना जाता है। ये उपकरण नग्न आंखों से खगोलीय पिंडों की स्थिति देखने की अनुमति देते हैं।",
      entry_fee: "₹50 (Indians) / ₹200 (Foreigners)",
      best_time: "10:00 AM - 12:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9247,75.8237",
      image: "assets/images/jantar_mantar.jpg"
    },
    {
      id: "johari_bazaar",
      name: "Johari Bazaar",
      nameHi: "जौहरी बाजार",
      type: "Market",
      typeHi: "बाजार",
      lat: 26.9234,
      lon: 75.8283,
      distance_km: 0.2,
      walk_time_min: 3,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "The world-famous jewelry market known for precious gemstones, Kundan jewelry, and silver artifacts.",
      descriptionHi: "कीमती रत्नों, कुंदन आभूषणों और चांदी की कलाकृतियों के लिए दुनिया भर में प्रसिद्ध आभूषण बाजार।",
      entry_fee: "Free",
      best_time: "10:00 AM - 8:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9234,75.8283",
      image: "assets/images/johari_bazaar.jpg"
    },
    {
      // ⚑ EXCEPTION — UNESCO heritage, no closer Pink Line station
      id: "amer_fort",
      name: "Amer Fort",
      nameHi: "आमेर का किला",
      type: "Fort",
      typeHi: "किला",
      lat: 26.9855,
      lon: 75.8513,
      distance_km: 7.2,
      walk_time_min: null,
      approx_drive_distance_km: 11.0,
      approx_drive_time_min: 28,
      last_mile: true,
      heritage: true,
      description: "A massive hill fort known for its artistic style elements, including the Sheesh Mahal (Hall of Mirrors).",
      descriptionHi: "एक विशाल पहाड़ी किला जो अपनी कलात्मक शैली के तत्वों के लिए जाना जाता है, जिसमें शीश महल (दर्पणों का हॉल) शामिल है।",
      entry_fee: "₹100 (Indians) / ₹500 (Foreigners)",
      best_time: "8:00 AM - 10:00 AM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9855,75.8513",
      image: "assets/images/amer_fort.jpg"
    },
    {
      // ⚑ EXCEPTION — UNESCO heritage, companion to Amer Fort
      id: "jaigarh_fort",
      name: "Jaigarh Fort",
      nameHi: "जयगढ़ किला",
      type: "Fort",
      typeHi: "किला",
      lat: 26.9849,
      lon: 75.8487,
      distance_km: 7.5,
      walk_time_min: null,
      approx_drive_distance_km: 11.5,
      approx_drive_time_min: 30,
      last_mile: true,
      heritage: true,
      description: "The 'Victory Fort' home to the world's largest cannon on wheels and offering great views of Amer Fort.",
      descriptionHi: "'विजय किला' जो पहियों वाली दुनिया की सबसे बड़ी तोप का घर है और आमेर किले का शानदार दृश्य प्रस्तुत करता है।",
      entry_fee: "₹35 (Indians) / ₹85 (Foreigners)",
      best_time: "9:00 AM - 4:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9849,75.8487",
      image: "assets/images/jaigarh_fort.jpg"
    },
    {
      // ⚑ EXCEPTION — iconic Jaipur landmark, nearest Pink Line station
      id: "jal_mahal",
      name: "Jal Mahal",
      nameHi: "जल महल",
      type: "Palace",
      typeHi: "महल",
      lat: 26.9506,
      lon: 75.8499,
      distance_km: 3.8,
      walk_time_min: null,
      approx_drive_distance_km: 5.0,
      approx_drive_time_min: 16,
      last_mile: true,
      summary: "The 'Water Palace' floating in the center of Man Sagar Lake.",
      summaryHi: "मान सागर झील के बीच में तैरता 'जल महल'।",
      description: "A 5-storey palace floating at the center of Man Sagar Lake. While the lower four storeys are submerged when the lake is full, the top floor remains visible. It's one of Jaipur's most tranquil and beautiful sights, especially during sunset when its lights reflect in the water.",
      descriptionHi: "मान सागर झील के केंद्र में स्थित एक 5 मंजिला महल। जब झील भरी होती है, तो नीचे की चार मंजिलें पानी में डूब जाती हैं, और केवल ऊपरी मंजिल दिखाई देती है। यह जयपुर के सबसे शांत और सुंदर दृश्यों में से एक है, विशेष रूप से सूर्यास्त के समय जब इसकी रोशनी पानी में झलकती है।",
      entry_fee: "Free (promenade)",
      best_time: "Sunrise or Sunset",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9506,75.8499",
      image: "assets/images/jal_mahal.jpg"
    },
    {
      // ⚑ EXCEPTION — major pilgrimage site, nearest Pink Line station
      id: "galtaji_temple",
      name: "Galta Ji Temple",
      nameHi: "गलता जी मंदिर",
      type: "Temple",
      typeHi: "मंदिर",
      lat: 26.9197,
      lon: 75.8717,
      distance_km: 4.5,
      walk_time_min: null,
      approx_drive_distance_km: 5.5,
      approx_drive_time_min: 18,
      last_mile: true,
      description: "An ancient Hindu pilgrimage site known for its natural springs, holy kunds, and resident monkeys.",
      descriptionHi: "एक प्राचीन हिंदू तीर्थ स्थल जो अपने प्राकृतिक झरनों, पवित्र कुंडों और वहां रहने वाले बंदरों के लिए जाना जाता है।",
      entry_fee: "Free",
      best_time: "6:30 AM - 10:00 AM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9197,75.8717",
      image: "assets/images/galta_ji.jpg"
    }
  ]

};
