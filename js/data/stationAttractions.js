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
      name: "ISKCON Sri Sri Giridhari Dauji Temple",
      type: "Temple",
      lat: 26.8430,
      lon: 75.7593,
      distance_km: 3.8,
      walk_time_min: null,
      approx_drive_distance_km: 4.2,
      approx_drive_time_min: 14,
      last_mile: true,
      description: "The main ISKCON campus in Jaipur on New Sanganer Road, Mansarovar (PIN 302020). Dedicated to Lord Krishna and Balarama with 3-ft hand-crafted deity forms, 52 stained-glass Puranic windows, a Govinda's vegetarian restaurant, and a spiritual library. Evening Aarti and Sunday kirtans draw hundreds of devotees. Nearest Pink Line station: Mansarovar (source: ISKCON Jaipur official address).",
      entry_fee: "Free",
      best_time: "6:30 AM – 8:00 AM & 7:00 PM – 8:30 PM (Aarti)",
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
      name: "Patrika Gate (Patrika Darwaza)",
      type: "Monument",
      lat: 26.8627,
      lon: 75.8011,
      distance_km: 6.22,
      walk_time_min: null,
      approx_drive_distance_km: 7.5,
      approx_drive_time_min: 22,
      last_mile: true,
      description: "An ornamental gateway at Jawahar Circle (2016) by the Rajasthan Patrika group. Nine hand-painted archways depict the culture and festivals of all 33 districts of Rajasthan. Illuminated spectacularly every evening. Located 5 min from Jaipur International Airport — many visitors stop here on arrival or departure. Nearest Pink Line metro: Vivek Vihar at 6.22 km road distance (source: YoMetro). Take a cab/auto from Vivek Vihar (~20 min, ₹100–130).",
      entry_fee: "Free (open 24 hours)",
      best_time: "6:00 AM – 8:00 AM (sunrise) or 7:30 PM – 9:30 PM (illuminated)",
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
      type: "Palace",
      lat: 26.8992,
      lon: 75.8094,
      distance_km: 3.2,
      walk_time_min: null,
      approx_drive_distance_km: 4.0,
      approx_drive_time_min: 14,
      last_mile: true,
      description: "A 200-year-old Shekhawati-style heritage haveli on Shivaji Marg, globally famed as the venue of the Jaipur Literature Festival — Asia's largest free literary gathering (every January). The palace courtyards, gardens, and open-air stage are accessible on a walk-in basis. Beautiful carved archways and a peaceful colonial-era garden. Nearest Pink Line station: Shyam Nagar at 3.2 km (auto ~14 min, ₹60–80).",
      entry_fee: "Free (grounds) / Ticket for JLF events",
      best_time: "9:00 AM – 6:00 PM | January for Jaipur Literature Festival",
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
      name: "Jawahar Kala Kendra (JKK)",
      type: "Museum",
      lat: 26.9042,
      lon: 75.8160,
      distance_km: 2.8,
      walk_time_min: null,
      approx_drive_distance_km: 3.5,
      approx_drive_time_min: 12,
      last_mile: true,
      description: "A world-class multi-arts centre on JLN Marg, designed by Charles Correa and inspired by Jaipur's nine-square Navagraha city grid. Hosts rotating art galleries, classical music and dance performances, open-air craft exhibitions, and the Jaipur Virasat Heritage Festival. The architecture — nine interlocking pavilion-squares each open to a different sky — is itself a landmark. One of Jaipur's most undervisited and intellectually rewarding destinations. Auto from Ram Nagar metro: ~12 min, ₹50–70.",
      entry_fee: "₹20 (Indians) / ₹50 (Foreigners) — events priced separately",
      best_time: "10:00 AM – 6:00 PM (Tue–Sun, closed Monday)",
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
      name: "Birla Mandir (Laxmi Narayan Temple)",
      type: "Temple",
      lat: 26.8983,
      lon: 75.8268,
      distance_km: 3.9,
      walk_time_min: null,
      approx_drive_distance_km: 4.8,
      approx_drive_time_min: 16,
      last_mile: true,
      description: "A gleaming white marble temple at the foot of Moti Dungri Hill on JLN Marg, built by the Birla Foundation in 1988. Walls carved with Bhagavad Gita shlokas and scenes from the Puranas. Most magical at dusk when the white marble glows against the rocky hillside. Moti Dungri Fort towers dramatically above. Nearest Pink Line station: Civil Lines at 3.90 km (source: YoMetro). Auto ~16 min, ₹70–90.",
      entry_fee: "Free",
      best_time: "6:30 AM – 12:30 PM / 3:00 PM – 8:30 PM (best at dusk)",
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
      name: "Jaipur Junction (Heritage Station Building)",
      type: "Monument",
      lat: 26.9200,
      lon: 75.7870,
      distance_km: 0.6,
      walk_time_min: 8,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Jaipur Junction (Code: JP) — one of India's most architecturally distinguished railway stations, its entire façade clad in pink sandstone in Rajput-Mughal style, built 1875. Headquarters of North Western Railway, serving 35,000+ passengers daily. The heritage building is a major photography landmark and the boarding point for the Palace on Wheels luxury train. Directly connected to the metro exit via a covered pedestrian link.",
      entry_fee: "Free (platform ticket ₹10)",
      best_time: "Any time — early morning light is best for photography",
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
      type: "Monument",
      lat: 26.9189,
      lon: 75.8068,
      distance_km: 1.19,
      walk_time_min: 15,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "The 'Pride of Asia' on Bhagwan Das Road, C-Scheme — India's most celebrated single-screen cinema hall. Opened 1 June 1976 with 1,300 seats and an extraordinary meringue-shaped Art Moderne ceiling by W.M. Namjoshi. Crystal chandeliers, velvet tiered seating, and nine gemstone stars on the exterior. Watching a Bollywood film here is a quintessential Pink City experience. Nearest metro: Sindhi Camp at 1.19 km (source: YoMetro). 15-min walk or 5-min auto from metro exit.",
      entry_fee: "₹130 – ₹280 (book via BookMyShow)",
      best_time: "Evening shows at 6:30 PM or 9:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9189,75.8068",
      image: "assets/images/raj_mandir.jpg"
    },
    {
      id: "mi_road",
      name: "MI Road (Mirza Ismail Road)",
      type: "Market",
      lat: 26.9160,
      lon: 75.8120,
      distance_km: 1.5,
      walk_time_min: 18,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Jaipur's most cosmopolitan commercial boulevard, named after Dewan Sir Mirza Ismail. Home to LMB (Laxmi Misthan Bhandar, sweet shop est. 1727), Niro's restaurant (est. 1949), premium gem boutiques, and Rajasthani garment stores. Ideal for evening strolling, shopping, and dining. 18-min walk or 5-min auto from Sindhi Camp metro.",
      entry_fee: "Free",
      best_time: "6:00 PM – 10:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9160,75.8120",
      image: "assets/images/mi_road.jpg"
    },
    {
      id: "central_park_jaipur",
      name: "Central Park Jaipur",
      type: "Park",
      lat: 26.9127,
      lon: 75.8042,
      distance_km: 2.4,
      walk_time_min: null,
      approx_drive_distance_km: 3.0,
      approx_drive_time_min: 10,
      last_mile: true,
      description: "A 200-acre urban park on JLN Marg with one of India's tallest flagpoles (206 ft) flying a giant Tricolour. Features a musical fountain, shaded jogging tracks, and a children's play zone. Early mornings see hundreds of joggers with peacocks wandering freely. Distance from Sindhi Camp: 2.4 km by road (source: YoMetro). Auto ~10 min, ₹40–60.",
      entry_fee: "₹30 (Adults) / ₹15 (Children)",
      best_time: "5:30 AM – 8:00 AM or 5:00 PM – 7:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9127,75.8042",
      image: "assets/images/central_park.jpg"
    },
    {
      id: "rambagh_palace",
      name: "Rambagh Palace (Taj Hotel)",
      type: "Palace",
      lat: 26.8930,
      lon: 75.8155,
      distance_km: 3.0,
      walk_time_min: null,
      approx_drive_distance_km: 3.8,
      approx_drive_time_min: 12,
      last_mile: true,
      description: "The 'Jewel of Jaipur' — former royal residence of Maharaja Sawai Man Singh II on Bhawani Singh Road, now a Taj luxury hotel in 47 acres of Mughal gardens. Non-guests can experience the palace via High Tea at the Verandah restaurant (₹2,500+) or cocktails at the Polo Bar. Distance from Sindhi Camp: 3.0 km (source: YoMetro). Auto ~12 min, ₹60–80.",
      entry_fee: "No entry fee — dining/tea only (₹2,000+)",
      best_time: "4:00 PM – 7:00 PM (High Tea + golden hour gardens)",
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
      type: "Market",
      lat: 26.9236,
      lon: 75.8095,
      distance_km: 0.2,
      walk_time_min: 3,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "One of Jaipur's oldest commercial streets running from Chandpole Gate into the Walled City. Specialises in white marble handicrafts, hand-carved wooden furniture, Jaipur's famous blue pottery (made from quartz, not clay — unique to India), traditional brassware, and Rajasthani miniature paintings. More authentic and lower-priced than Johari Bazaar. The Chandpole Gate itself — a pink sandstone ceremonial arch from 1727 — is a major landmark 3 min on foot from the metro exit.",
      entry_fee: "Free",
      best_time: "9:00 AM – 8:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9236,75.8095",
      image: "assets/images/chandpole_bazaar.jpg"
    },
    {
      id: "isarlat_tower",
      name: "Isarlat — Swargasuli Tower",
      type: "Monument",
      lat: 26.9242,
      lon: 75.8135,
      distance_km: 0.6,
      walk_time_min: 8,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A dramatic 7-storey, 30-metre victory tower built in 1749 by Maharaja Ishwari Singh. A spiral internal staircase climbs to a rooftop with a sweeping 360° view over the entire Walled City — one of Jaipur's best-kept secrets. Almost completely missed by tourists. 8-min walk from Chandpole metro exit.",
      entry_fee: "₹30 (Indians) / ₹70 (Foreigners)",
      best_time: "9:00 AM – 5:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9242,75.8135",
      image: "assets/images/isarlat_tower.jpg"
    },
    {
      id: "sanjay_sharma_museum",
      name: "Sanjay Sharma Museum & Research Institute",
      type: "Museum",
      lat: 26.9229,
      lon: 75.8108,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A rare private museum inside the Walled City near Chandpole Bazaar with 6,000+ artefacts: ancient Sanskrit manuscripts, Rajput miniature paintings, medieval coins, antique weapons, and Mughal-era documents. Founded by collector Sanjay Sharma. One of Jaipur's most overlooked intellectual experiences. 6-min walk from Chandpole metro.",
      entry_fee: "₹20 (Indians) / ₹100 (Foreigners)",
      best_time: "9:00 AM – 5:00 PM (closed Fridays)",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9229,75.8108",
      image: "assets/images/sanjay_sharma_museum.jpg"
    },
    {
      id: "albert_hall_museum",
      name: "Albert Hall Museum",
      type: "Museum",
      lat: 26.9124,
      lon: 75.8219,
      distance_km: 2.03,
      walk_time_min: 25,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Rajasthan's oldest public museum (1887) in a magnificent Indo-Saracenic sandstone building by Sir Samuel Swinton Jacob. Collections include Rajput armour, Mughal miniatures, a 2,500-year-old Egyptian mummy (the only one on public display in India outside Delhi), Persian carpets, and a 2,000-year coin gallery. Spectacular nightly light-and-sound show. Nearest metro: Chandpole at 2.03 km (source: YoMetro). 25-min walk or 8-min auto.",
      entry_fee: "₹40 (Indians) / ₹300 (Foreigners) — Night show ₹100 extra",
      best_time: "10:00 AM – 5:00 PM / 7:00 PM – 10:00 PM (light show)",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9124,75.8219",
      image: "assets/images/albert_hall.jpg"
    },
    {
      id: "nahargarh_fort",
      name: "Nahargarh Fort",
      type: "Fort",
      lat: 26.9429,
      lon: 75.8124,
      distance_km: 2.5,
      walk_time_min: null,
      approx_drive_distance_km: 4.5,
      approx_drive_time_min: 18,
      last_mile: true,
      description: "The 'Abode of Tigers' built in 1734 on the Aravalli ridge above the Pink City. Jaipur's most spectacular sunset viewpoint — the entire city glitters below at dusk. Inside: Madhavendra Bhawan with 12 painted royal suites, a wax museum, and Café Padao (rooftop restaurant with panoramic views). The 1.5 km forest trail from Chandpole Bazaar is a memorable approach. Auto from Chandpole metro: ~18 min, ₹80–100.",
      entry_fee: "₹50 (Indians) / ₹200 (Foreigners) / ₹25 Madhavendra Bhawan",
      best_time: "5:00 PM – 8:30 PM (sunset + city lights)",
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
      type: "Temple",
      lat: 26.9268,
      lon: 75.8213,
      distance_km: 0.5,
      walk_time_min: 7,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "One of India's holiest Krishna temples, inside City Palace grounds, housing the original Govind Dev Ji deity brought from Vrindavan by Maharaja Jai Singh II. Seven daily Aarti sessions — the Sandhya Aarti at sunset draws thousands in a flower-strewn, lamp-lit atmosphere of pure devotion. Free entry. 7-min walk from Chhoti Chaupar metro exit. Arrive 30 min before any Aarti for a good position.",
      entry_fee: "Free",
      best_time: "Aarti: 4:45 AM / 7:30 AM / 10:00 AM / 11:00 AM / 5:30 PM / 6:30 PM / 8:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9268,75.8213",
      image: "assets/images/govind_dev_ji.jpg"
    },
    {
      id: "tripolia_bazaar",
      name: "Tripolia Bazaar",
      type: "Market",
      lat: 26.9252,
      lon: 75.8200,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A long old-city market stretching from the triple-arched Tripolia Gate on the City Palace wall, specialising in lac bangles, handmade diyas, brassware, and folk art objects. The Tripolia Gate — a royal ceremonial arch traditionally used only by the royal family — is a photographic marvel. Far less visited than nearby bazaars, making it one of the most authentic market experiences in the Walled City. 6-min walk from metro.",
      entry_fee: "Free",
      best_time: "9:00 AM – 8:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9252,75.8200",
      image: "assets/images/tripolia_bazaar.jpg"
    },
    {
      id: "bapu_bazaar",
      name: "Bapu Bazaar",
      type: "Market",
      lat: 26.9211,
      lon: 75.8220,
      distance_km: 0.6,
      walk_time_min: 8,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Jaipur's most celebrated handicraft and textile street, running parallel to Johari Bazaar. Stalls sell block-printed sanganeri and bagru fabrics, hand-embroidered leather juttis, traditional lac bangles, handmade razais (quilts), and camel-leather goods at negotiable prices. More affordable and authentic than boutiques on MI Road. Morning visits yield the best bargaining. 8-min walk from metro.",
      entry_fee: "Free",
      best_time: "10:00 AM – 2:00 PM (best bargaining) or 6:00 PM – 9:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9211,75.8220",
      image: "assets/images/bapu_bazaar.jpg"
    },
    {
      id: "nehru_bazaar",
      name: "Nehru Bazaar",
      type: "Market",
      lat: 26.9153,
      lon: 75.8212,
      distance_km: 1.1,
      walk_time_min: 14,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A vibrant market near Sanganeri Gate famed for handcrafted mojari shoes — traditional Rajasthani footwear in coloured leather and velvet in dozens of embroidered designs. Also sells bandhani fabrics, silver tribal jewellery, and excellent street snacks. Less touristy than Johari Bazaar with genuine local character. The evening street food strip here is one of the Pink City's best for chaat and kachori. 14-min walk from metro.",
      entry_fee: "Free",
      best_time: "10:00 AM – 9:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9153,75.8212",
      image: "assets/images/nehru_bazaar.jpg"
    },
    {
      id: "ram_niwas_garden",
      name: "Ram Niwas Garden & Jaipur Zoo",
      type: "Park",
      lat: 26.9116,
      lon: 75.8218,
      distance_km: 1.4,
      walk_time_min: 17,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "A gracious 30-acre public garden built in 1868 by Maharaja Ram Singh II, adjacent to Albert Hall Museum. Contains Rajasthan's oldest zoo, a botanical garden, the Ravindra Manch open-air theatre, and a rose garden. Early mornings: peacocks wander the paths freely and the sandstone pillared museum facade glows in the soft light. Perfect for combining with an Albert Hall Museum visit. 17-min walk from metro.",
      entry_fee: "Garden: ₹20 / Zoo Adults: ₹50 / Zoo Children: ₹25",
      best_time: "8:00 AM – 11:00 AM or 5:00 PM – 6:30 PM",
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
      name: "Hawa Mahal — Palace of Winds",
      type: "Palace",
      lat: 26.9239,
      lon: 75.8267,
      distance_km: 0.3,
      walk_time_min: 4,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      heritage: true,
      description: "The most photographed façade in Rajasthan — a 5-storey pink sandstone screen with 953 latticed jharokha windows, built in 1799 by Maharaja Sawai Pratap Singh. Designed so royal women in purdah could observe street life unseen. Part of the UNESCO Walled City of Jaipur inscription (2019). Enter from the rear gate on Johari Bazaar Road for the full interior — five ramp-connected levels and a rooftop terrace. Sunrise turns the exterior molten gold. 4-min walk from Badi Chaupar metro exit.",
      entry_fee: "₹50 (Indians) / ₹200 (Foreigners)",
      best_time: "8:00 AM – 10:00 AM (sunrise photography) / Open until 4:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9239,75.8267",
      image: "assets/images/hawa_mahal.jpg"
    },
    {
      id: "city_palace",
      name: "City Palace",
      type: "Palace",
      lat: 26.9257,
      lon: 75.8236,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      heritage: true,
      description: "The royal seat of the Jaipur House since 1729, a blend of Rajput, Mughal, and European architecture across multiple courtyards. Highlights: Mubarak Mahal, Diwan-e-Khas with two 340-kg sterling silver Gangajali vessels (Guinness World Record), Diwan-e-Aam, and the Maharaja Sawai Man Singh II Museum. HH Padmanabh Singh still occupies the Chandra Mahal. UNESCO Walled City of Jaipur (2019). 6-min walk from metro exit.",
      entry_fee: "₹200 (Indians) / ₹700 (Foreigners) — museum included",
      best_time: "9:30 AM – 12:00 PM (lighter crowds, best courtyard light)",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9257,75.8236",
      image: "assets/images/city_palace.jpg"
    },
    {
      id: "jantar_mantar",
      name: "Jantar Mantar",
      type: "Monument",
      lat: 26.9247,
      lon: 75.8237,
      distance_km: 0.4,
      walk_time_min: 6,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      heritage: true,
      description: "UNESCO World Heritage Site (2010) — the world's largest stone astronomical observatory, built in 1734 by Maharaja Sawai Jai Singh II. Contains 19 monumental instruments including the 27-metre Samrat Yantra (world's largest sundial, accurate to 2 seconds) and the Jai Prakash Yantra. All instruments still deliver accurate readings today. Audio guide strongly recommended. 6-min walk from metro exit.",
      entry_fee: "₹50 (Indians) / ₹200 (Foreigners) — audio guide ₹100",
      best_time: "10:00 AM – 12:00 PM (best light + manageable crowds)",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9247,75.8237",
      image: "assets/images/jantar_mantar.jpg"
    },
    {
      id: "johari_bazaar",
      name: "Johari Bazaar",
      type: "Market",
      lat: 26.9234,
      lon: 75.8283,
      distance_km: 0.2,
      walk_time_min: 3,
      approx_drive_distance_km: null,
      approx_drive_time_min: null,
      last_mile: false,
      description: "Jaipur's legendary gem and jewellery street — the city is the global capital of coloured gemstone cutting and polishing. Hundreds of shops sell Kundan Meenakari necklaces, polki diamond sets, precious and semi-precious stone jewellery, antique silver, and lac bangles. Many shops deal wholesale in uncut sapphires, rubies, and emeralds. 3-min walk from metro exit.",
      entry_fee: "Free",
      best_time: "10:00 AM – 8:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9234,75.8283",
      image: "assets/images/johari_bazaar.jpg"
    },
    {
      // ⚑ EXCEPTION — UNESCO heritage, no closer Pink Line station
      id: "amer_fort",
      name: "Amer Fort (Amber Fort)",
      type: "Fort",
      lat: 26.9855,
      lon: 75.8513,
      distance_km: 7.2,
      walk_time_min: null,
      approx_drive_distance_km: 11.0,
      approx_drive_time_min: 28,
      last_mile: true,
      heritage: true,
      description: "UNESCO World Heritage Site (Hill Forts of Rajasthan, 2013). A 16th-century fort-palace by Raja Man Singh I above Maota Lake. Must-sees: Ganesh Pol gateway, Sheesh Mahal (Hall of Mirrors — one candle multiplied 10,000×), Sukh Niwas (natural A/C via water channels), and Diwan-e-Aam. Nightly Sound and Light show. From Badi Chaupar: taxi/auto ~28 min, ₹150–200. Combine with Jaigarh Fort above on the same trip.",
      entry_fee: "₹100 (Indians) / ₹500 (Foreigners) — Light show from ₹295",
      best_time: "8:00 AM – 10:00 AM (before crowds) / Light show 7:30 PM or 9:00 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9855,75.8513",
      image: "assets/images/amer_fort.jpg"
    },
    {
      // ⚑ EXCEPTION — UNESCO heritage, companion to Amer Fort
      id: "jaigarh_fort",
      name: "Jaigarh Fort",
      type: "Fort",
      lat: 26.9849,
      lon: 75.8487,
      distance_km: 7.5,
      walk_time_min: null,
      approx_drive_distance_km: 11.5,
      approx_drive_time_min: 30,
      last_mile: true,
      heritage: true,
      description: "UNESCO World Heritage Site (Hill Forts of Rajasthan, 2013) on Cheel Ka Teela above Amer. Home to the Jaivana — world's largest wheeled cannon (barrel 50 tonnes, length 6.15 m). Underground treasury vaults and a cannon-casting foundry are extraordinary engineering achievements. Connected to Amer Fort by a 2-km underground tunnel. A combined Amer + Jaigarh ticket is the best value. From Badi Chaupar: taxi/auto ~30 min.",
      entry_fee: "₹35 (Indians) / ₹85 (Foreigners) — combined ticket with Amer available",
      best_time: "9:00 AM – 4:30 PM",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9849,75.8487",
      image: "assets/images/jaigarh_fort.jpg"
    },
    {
      // ⚑ EXCEPTION — iconic Jaipur landmark, nearest Pink Line station
      id: "jal_mahal",
      name: "Jal Mahal — Water Palace",
      type: "Palace",
      lat: 26.9506,
      lon: 75.8499,
      distance_km: 3.8,
      walk_time_min: null,
      approx_drive_distance_km: 5.0,
      approx_drive_time_min: 16,
      last_mile: true,
      description: "A 5-storey palace (c.1750) floating at the centre of Man Sagar Lake on Amer Road — four storeys permanently submerged. Cannot be entered, but the lakeside Jal Mahal Parisar promenade is deeply atmospheric: a craft market, street food, and October–March migratory birds (cormorants, herons, flamingos) on the water. The palace mirrored in the lake at golden hour is one of Rajasthan's most iconic images. From Badi Chaupar: taxi/auto ~16 min, ₹120–160.",
      entry_fee: "Free (lakeside promenade)",
      best_time: "Sunrise Oct–Mar (birds + mist) or Sunset year-round",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9506,75.8499",
      image: "assets/images/jal_mahal.jpg"
    },
    {
      // ⚑ EXCEPTION — major pilgrimage site, nearest Pink Line station
      id: "galtaji_temple",
      name: "Galta Ji Temple (Monkey Temple)",
      type: "Temple",
      lat: 26.9197,
      lon: 75.8717,
      distance_km: 4.5,
      walk_time_min: null,
      approx_drive_distance_km: 5.5,
      approx_drive_time_min: 18,
      last_mile: true,
      description: "An ancient pilgrimage complex in a rocky gorge accessed through the dramatic Ghat Ki Guni mountain pass. Seven natural freshwater kunds (holy tanks fed by perennial springs), multiple mandirs, and hundreds of resident rhesus macaques. The sunrise hike to the Surya Mandir ridge gives the single most mystical view in Jaipur — the entire Pink City spread below. Bring water; keep bags closed near monkeys. From Badi Chaupar: taxi/auto ~18 min, ₹120–150.",
      entry_fee: "Free",
      best_time: "6:30 AM – 10:00 AM (sunrise hike + avoid midday heat)",
      maps_link: "https://www.google.com/maps/search/?api=1&query=26.9197,75.8717",
      image: "assets/images/galta_ji.jpg"
    }
  ]

};
