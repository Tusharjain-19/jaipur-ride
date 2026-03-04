// stationAttractions.js
// Tourist attractions reachable from Jaipur Metro stations

export const stationAttractions = {

  "Mansarovar": [
    {
      id: "iskcon_temple",
      name: "ISKCON Temple Jaipur",
      type: "Temple",
      lat: 26.8470,
      lon: 75.8122,
      distance_km: 2.5,
      walk_time_min: 30,
      description: "Beautiful Krishna temple known for peaceful atmosphere and evening aarti.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/iskcon_temple.jpg",
      maps_link: "https://maps.google.com/?q=ISKCON+Temple+Jaipur",
      source: "Official"
    },
    {
      id: "patrika_gate",
      name: "Patrika Gate",
      type: "Architecture / Photo Spot",
      lat: 26.8467,
      lon: 75.8045,
      distance_km: 6,
      walk_time_min: 70,
      description: "Colorful gateway and one of Jaipur's most famous Instagram photography spots.",
      best_time: "Morning",
      entry_fee: "Free",
      image: "assets/images/patrika_gate.jpg",
      maps_link: "https://maps.google.com/?q=Patrika+Gate+Jaipur",
      source: "Official"
    }
  ],

  "Civil Lines": [
    {
      id: "birla_mandir",
      name: "Birla Mandir",
      type: "Temple",
      lat: 26.9076,
      lon: 75.8131,
      distance_km: 3,
      walk_time_min: 35,
      description: "White marble temple dedicated to Lord Vishnu and Goddess Lakshmi.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/birla_mandir.jpg",
      maps_link: "https://maps.google.com/?q=Birla+Mandir+Jaipur",
      source: "Wikimedia"
    },
    {
      id: "central_park",
      name: "Central Park Jaipur",
      type: "Park",
      lat: 26.9124,
      lon: 75.8073,
      distance_km: 3.2,
      walk_time_min: 38,
      description: "Largest park in Jaipur with India's tallest national flag.",
      best_time: "Morning",
      entry_fee: "Free",
      image: "assets/images/central_park.jpg",
      maps_link: "https://maps.google.com/?q=Central+Park+Jaipur",
      source: "Official"
    },
    {
      id: "statue_circle",
      name: "Statue Circle",
      type: "Landmark",
      distance_km: 3,
      walk_time_min: 35,
      description: "Popular landmark and evening hangout spot.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/statue_circle.jpg",
      maps_link: "https://maps.google.com/?q=Statue+Circle+Jaipur",
      source: "Local"
    }
  ],

  "Railway Station": [
    {
      id: "mi_road",
      name: "MI Road",
      type: "Shopping Street",
      distance_km: 1,
      walk_time_min: 12,
      description: "One of Jaipur's main shopping streets.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/mi_road.jpg",
      maps_link: "https://maps.google.com/?q=MI+Road+Jaipur",
      source: "Local"
    }
  ],

  "Sindhi Camp": [
    {
      id: "raj_mandir",
      name: "Raj Mandir Cinema",
      type: "Landmark Cinema",
      lat: 26.9120,
      lon: 75.8050,
      distance_km: 1.5,
      walk_time_min: 18,
      description: "One of India's most beautiful movie theatres.",
      best_time: "Evening",
      entry_fee: "Movie ticket",
      image: "assets/images/raj_mandir.jpg",
      maps_link: "https://maps.google.com/?q=Raj+Mandir+Cinema+Jaipur",
      source: "Official"
    },
    {
      id: "nehru_bazaar",
      name: "Nehru Bazaar",
      type: "Market",
      distance_km: 1.3,
      walk_time_min: 16,
      description: "Traditional bazaar famous for handicrafts and textiles.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/nehru_bazaar.jpg",
      maps_link: "https://maps.google.com/?q=Nehru+Bazaar+Jaipur",
      source: "Local"
    }
  ],

  "Chandpole": [
    {
      id: "nahargarh_fort",
      name: "Nahargarh Fort",
      type: "Fort",
      lat: 26.9373,
      lon: 75.8156,
      distance_km: 5,
      walk_time_min: 60,
      description: "Historic fort with panoramic views of Jaipur city.",
      best_time: "Sunset",
      entry_fee: "₹50",
      image: "assets/images/nahargarh_fort.jpg",
      maps_link: "https://maps.google.com/?q=Nahargarh+Fort",
      source: "Wikimedia"
    },
    {
      id: "chandpole_bazaar",
      name: "Chandpole Bazaar",
      type: "Market",
      distance_km: 0.2,
      walk_time_min: 3,
      description: "Traditional Jaipur market for handicrafts.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/chandpole_bazaar.jpg",
      maps_link: "https://maps.google.com/?q=Chandpole+Bazaar",
      source: "Local"
    }
  ],

  "Chhoti Chaupar": [
    {
      id: "bapu_bazaar",
      name: "Bapu Bazaar",
      type: "Market",
      distance_km: 0.3,
      walk_time_min: 5,
      description: "Popular for mojari shoes and textiles.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/bapu_bazaar.jpg",
      maps_link: "https://maps.google.com/?q=Bapu+Bazaar+Jaipur",
      source: "Local"
    },
    {
      id: "albert_hall",
      name: "Albert Hall Museum",
      type: "Museum",
      lat: 26.9174,
      lon: 75.8182,
      distance_km: 1.3,
      walk_time_min: 16,
      description: "Historic museum showcasing Rajasthan's art and artifacts.",
      best_time: "Morning",
      entry_fee: "₹50",
      image: "assets/images/albert_hall.jpg",
      maps_link: "https://maps.google.com/?q=Albert+Hall+Museum+Jaipur",
      source: "Wikimedia"
    }
  ],

  "Badi Chaupar": [
    {
      id: "hawa_mahal",
      name: "Hawa Mahal",
      type: "Monument",
      lat: 26.9239,
      lon: 75.8266,
      distance_km: 0.6,
      walk_time_min: 8,
      description: "Iconic pink sandstone palace and symbol of Jaipur.",
      best_time: "Morning",
      entry_fee: "₹50",
      image: "assets/images/hawa_mahal.jpg",
      maps_link: "https://maps.google.com/?q=Hawa+Mahal",
      source: "Wikimedia"
    },
    {
      id: "city_palace",
      name: "City Palace",
      type: "Palace",
      lat: 26.9270,
      lon: 75.8244,
      distance_km: 0.9,
      walk_time_min: 12,
      description: "Royal palace complex with museums and courtyards.",
      best_time: "Morning",
      entry_fee: "₹200",
      image: "assets/images/city_palace.jpg",
      maps_link: "https://maps.google.com/?q=City+Palace+Jaipur",
      source: "Wikimedia"
    },
    {
      id: "jantar_mantar",
      name: "Jantar Mantar",
      type: "UNESCO Site",
      lat: 26.9244,
      lon: 75.8235,
      distance_km: 1,
      walk_time_min: 12,
      description: "UNESCO World Heritage astronomical observatory.",
      best_time: "Morning",
      entry_fee: "₹50",
      image: "assets/images/jantar_mantar.jpg",
      maps_link: "https://maps.google.com/?q=Jantar+Mantar+Jaipur",
      source: "Wikimedia"
    },
    {
      id: "johari_bazaar",
      name: "Johari Bazaar",
      type: "Market",
      distance_km: 0.4,
      walk_time_min: 6,
      description: "Historic market famous for jewellery and textiles.",
      best_time: "Evening",
      entry_fee: "Free",
      image: "assets/images/johari_bazaar.jpg",
      maps_link: "https://maps.google.com/?q=Johari+Bazaar",
      source: "Local"
    }
  ]

};
