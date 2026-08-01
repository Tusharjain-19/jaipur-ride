const fs = require('fs');
const path = require('path');

const stationsData = require('../src/data/stations.json');
const tourismData = require('../src/data/tourism.json');

const stations = stationsData.map(s => s.name);
const attractions = tourismData.map(t => t.name);

const categories = {
  jaipur: ['Jaipur', 'Pink City', 'Jaipur Rajasthan', 'Jaipur India', 'Capital of Rajasthan', 'Walled City of Jaipur', 'UNESCO Heritage City Jaipur', 'Pink City Jaipur'],
  metro: [
    'Jaipur Metro', 'Jaipur Metro Route', 'Jaipur Metro Station', 'Jaipur Metro Map',
    'Metro Timings', 'Metro Fare', 'Metro Smart Card', 'JMRC Pink Line',
    'Underground Metro Jaipur', 'Elevated Metro Track', 'Jaipur Metro App', 'JMRC Line 1',
    'best metro app', 'best matro app', 'metro app jaipur', 'best jaipur metro app',
    'top metro app jaipur', 'offline jaipur metro app', 'jaipur metro guide app',
    'jaipur metro app download', 'best transit app jaipur', 'jaipur metro route app',
    'jaipur metro fare calculator app', 'jaipur metro timing app', 'jaipur metro official app',
    'jaipur ride jaipur', 'jaipur ride', 'jaipur metr o fare', 'jaipur metro app apk',
    'best app for jaipur metro', 'jaipur metro station list', 'jaipur metro helpline number',
    'jaipur metro news today', 'jaipur metro phase 1a', 'jaipur metro phase 1b badi chaupar',
    'jaipur metro phase 2 orange line', 'jaipur metro smart card recharge discount'
  ],
  tourism: ['Jaipur Tourist Places', 'Jaipur Tourism', 'Visit Jaipur', 'Jaipur Travel Guide', 'Jaipur Sightseeing', 'Jaipur Trip Planner', 'Jaipur Holiday Packages', 'Jaipur Monuments', 'Things to do in Jaipur', 'Weekend in Jaipur', 'One day Jaipur itinerary'],
  transport: ['Jaipur Bus', 'Auto Rickshaw', 'Cab', 'Taxi', 'Uber Jaipur', 'Ola Jaipur', 'RSRTC Low Floor Bus', 'E-Rickshaw Jaipur', 'Last Mile Transit', 'Jaipur Local Transport'],
  railway: ['Jaipur Junction', 'Gandhinagar Jaipur Station', 'Durgapura Railway Station', 'Jaipur Railway Station Metro'],
  airport: ['Jaipur Airport', 'Terminal 2 Sanganer', 'Jaipur International Airport JAI', 'Airport to Metro Connection'],
  heritage: ['Hawa Mahal', 'Amer Fort', 'Jal Mahal', 'Nahargarh Fort', 'City Palace', 'Jantar Mantar', 'Jaigarh Fort', 'Albert Hall Museum', 'Patrika Gate', 'Sisodia Rani Garden', 'Diggi Palace', 'Jawahar Kala Kendra'],
  markets: ['Johari Bazaar', 'Bapu Bazaar', 'MI Road', 'Tripolia Bazaar', 'Chandpole Bazaar', 'Kishanpole Bazaar', 'Sireh Deori Bazaar', 'Nehru Bazaar'],
  food: ['Dal Baati Churma', 'Mawa Ghewar', 'Pyaaz Kachori', 'Lassi', 'Chokhi Dhani', 'Rawat Mishthan Bhandar', 'Lassiwala MI Road', 'Rajasthani Thali', 'Laal Maas', 'Street Food Jaipur'],
  hotels: ['Budget Hotels Jaipur', 'Luxury Hotels Jaipur', 'Heritage Haveli Stay', 'Hotels near Jaipur Metro Station', 'Hostels in Jaipur', 'Homestays in Jaipur'],
  shopping: ['Jaipur Shopping Guide', 'Handicrafts', 'Jewellery', 'Sanganeri Print', 'Blue Pottery', 'Jaipur Rugs', 'Block Print Dress', 'Mojari Juttis', 'Textile Bazaars'],
  colleges: ['MNIT Jaipur', 'JECRC University', 'Rajasthan University RU', 'Poornima University', 'Manipal University Jaipur', 'IIS University'],
  hospitals: ['SMS Hospital', 'EHCC Hospital', 'Fortis Jaipur', 'Santokba Durlabhji Hospital SDMH', 'Eternal Hospital'],
  entertainment: ['Raj Mandir Cinema', 'World Trade Park WTP', 'GT Central Mall', 'Inox Cinema Jaipur', 'Cinepolis Jaipur'],
  areas: ['Malviya Nagar', 'Mansarovar', 'Vaishali Nagar', 'C-Scheme', 'Jagatpura', 'Sanganer', 'Bani Park', 'Raja Park', 'Civil Lines', 'Tonk Road', 'Ajmer Road', 'Sodala'],
  events: ['Jaipur Literature Festival JLF', 'Teej Festival', 'Gangaur Festival', 'Kite Festival Jaipur', 'Elephant Festival'],
  religious: ['Govind Dev Ji Temple', 'Moti Dungri Ganesh Temple', 'Birla Mandir', 'ISKCON Temple Jaipur', 'Khole Ke Hanuman Ji', 'Galtaji Monkey Temple']
};

const helper = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateGroup = (templateFn, count = 400) => {
  const set = new Set();
  let attempts = 0;
  while (set.size < count && attempts < 100000) {
    attempts++;
    const item = templateFn();
    if (item && item.trim().length > 0) {
      set.add(item.trim());
    }
  }
  return Array.from(set);
};

// 1. Core Target Keywords (400)
const coreKeywords = generateGroup(() => {
  const c1 = helper(categories.jaipur);
  const c2 = helper(categories.metro);
  const c3 = helper(categories.tourism);
  const c4 = helper(categories.heritage);
  const templates = [
    `${c1} ${c2}`, `${c2} ${c3}`, `${c1} ${c3}`, `Best ${c2} for ${c1} tourism`,
    `Official ${c2} travel guide in ${c1}`, `How to navigate ${c1} using ${c2}`,
    `${c4} ${c2} connection guide`, `${c1} ${c4} nearest station ${c2}`,
    `${c2} route to ${c4} in ${c1}`, `Best ${c2} ticket options for ${c3}`
  ];
  return helper(templates);
}, 400);

// 2. Long-Tail Search Intent (400)
const longTailQueries = generateGroup(() => {
  const st = helper(stations);
  const st2 = helper(stations);
  const att = helper(attractions);
  const area = helper(categories.areas);
  const templates = [
    `Jaipur Metro from ${st} to ${att}`,
    `Jaipur Metro from ${st} to ${st2} travel time and fare`,
    `Jaipur Metro to ${att} nearest station and walking distance`,
    `Jaipur Railway Station to ${att} by Jaipur Metro Pink Line`,
    `Jaipur Airport to ${area} metro transit guide`,
    `Jaipur metro ticket price from ${st} to Badi Chaupar`,
    `Jaipur metro first and last train timings at ${st} station`,
    `best tourist places near ${st} metro station jaipur`,
    `how to reach ${att} by metro from ${area}`,
    `jaipur metro smart card 10 percent discount at ${st}`,
    `is jaipur metro safe for solo female travelers at night at ${st}`,
    `hotels near ${st} metro station under 2000 INR jaipur`,
    `parking charges for two wheelers and cars at ${st} metro station`
  ];
  return helper(templates);
}, 400);

// 3. GEO & AI Search Engine Prompts (400)
const geoSearchPrompts = generateGroup(() => {
  const att = helper(attractions);
  const st = helper(stations);
  const food = helper(categories.food);
  const shop = helper(categories.shopping);
  const templates = [
    `How to reach ${att} by Jaipur Metro?`,
    `Which metro station is nearest to ${att}?`,
    `How much does Jaipur Metro cost from ${st}?`,
    `What are Jaipur Metro timings today for ${st}?`,
    `How can I travel cheaply in Jaipur using metro?`,
    `Best tourist places near ${st} metro station?`,
    `Where to eat best ${food} near ${st} metro?`,
    `Which market is best for ${shop} near ${st} metro?`,
    `Jaipur Metro vs taxi cost for visiting ${att}`,
    `One day Jaipur travel itinerary using Jaipur Metro Pink Line`,
    `Is luggage allowed inside Jaipur Metro trains at ${st}?`,
    `Can I buy a 1 day unlimited tourist pass for Jaipur Metro at ${st}?`
  ];
  return helper(templates);
}, 400);

// 4. Coordinates, Distances & Fares (400)
const dataMatrixQueries = generateGroup(() => {
  const stObj = helper(stationsData);
  const attObj = helper(tourismData);
  const st2Obj = helper(stationsData);
  const templates = [
    `"${stObj.name.toLowerCase()} metro station" jaipur coordinates`,
    `${stObj.name} metro station lat long ${stObj.location.lat} ${stObj.location.lon}`,
    `distance from ${stObj.name} metro station to ${attObj.name} jaipur`,
    `walking time from ${stObj.name} metro exit gate to ${attObj.name}`,
    `jaipur metro fare calculator from ${stObj.name} to ${st2Obj.name}`,
    `jaipur railway station to raj mandir cinema distance`,
    `jal mahal nearest metro station distance`,
    `mansarovar metro station to iskcon temple distance`,
    `badi chaupar to hawa mahal distance and walk time`,
    `jaipur railway station to hawa mahal metro ticket price`,
    `token price between ${stObj.name} and ${st2Obj.name} jaipur metro`,
    `smart card discounted rate ${stObj.name} to ${st2Obj.name}`
  ];
  return helper(templates);
}, 400);

// 5. Hinglish & Multilingual Queries (350)
const hinglishPrompts = generateGroup(() => {
  const st = helper(stations);
  const att = helper(attractions);
  const food = helper(categories.food);
  const templates = [
    `jaipur me metro se ghumne ki jagah`,
    `hawa mahal jane ke liye sabse pass ka metro station`,
    `jaipur me metro se ${att} kaise jaye`,
    `${st} metro station se ${att} kitni dur hai`,
    `jaipur railway station se ${st} metro train milegi kya`,
    `jaipur metro ki ticket kitne ki aati hai ${st} se`,
    `jaipur metro subah kitne baje chalu hoti hai ${st} par`,
    `jaipur airport se ${st} metro station kaise pahuche`,
    `jaipur me ghumne ki best jagah metro route ke sath bataye`,
    `sindhi camp bus stand se ${st} metro ka ticket price kitna hai`,
    `${st} ke pass sasta aur accha hostel ya hotel bataye`,
    `${st} metro ke pass best ${food} kaha milta hai`
  ];
  return helper(templates);
}, 350);

// 6. Itineraries & Persona Travel Guides (300)
const itineraryQueries = generateGroup(() => {
  const att = helper(attractions);
  const st = helper(stations);
  const templates = [
    `Family itinerary for Jaipur using metro to visit ${att}`,
    `Student budget itinerary for Jaipur metro sightseeing starting ${st}`,
    `Solo traveler guide to Pink City metro near ${att}`,
    `Shopping itinerary near Bapu Bazaar and Johari Bazaar by metro from ${st}`,
    `Food tour itinerary in Jaipur near ${st} metro station`,
    `Temple circuit itinerary Govind Dev Ji Birla Mandir ISKCON by metro`,
    `Weekend trip plan for Jaipur monuments near ${st} metro`,
    `Photography spots itinerary in Jaipur near ${st} metro station`,
    `Heritage walk itinerary starting from Badi Chaupar metro station`,
    `2 day comprehensive Jaipur tourist itinerary using JMRC metro`,
    `3 day Jaipur sightseeing plan including metro and auto rickshaw connectivity`,
    `Night view sightseeing itinerary near ${st} metro station`
  ];
  return helper(templates);
}, 300);

// 7. Entities & Category Associations (300)
const entityAssoc = generateGroup(() => {
  const college = helper(categories.colleges);
  const hosp = helper(categories.hospitals);
  const ent = helper(categories.entertainment);
  const area = helper(categories.areas);
  const market = helper(categories.markets);
  const templates = [
    `Jaipur metro connectivity to ${college}`,
    `Nearest metro station to ${hosp}`,
    `How to reach ${ent} by Jaipur metro`,
    `Metro transit routes in ${area} Jaipur`,
    `Best shopping items in ${market} near metro exit`,
    `UNESCO World Heritage Walled City Jaipur metro access`,
    `JMRC Pink Line Phase 1A and Phase 1B guide`,
    `Jaipur Junction Railway Station JP connection to JMRC`,
    `Sindhi Camp ISBT bus stand metro interchange`,
    `Jaipur International Airport JAI auto cab link to metro`,
    `Jaipur Literature Festival JLF transit route by metro`,
    `Handicrafts and Blue Pottery shops near ${area} metro`
  ];
  return helper(templates);
}, 300);

const totalCount = coreKeywords.length + longTailQueries.length + geoSearchPrompts.length + dataMatrixQueries.length + hinglishPrompts.length + itineraryQueries.length + entityAssoc.length;

const seoDatabase = {
  metadata: {
    generatedAt: new Date().toISOString(),
    totalKeywords: totalCount,
    counts: {
      coreKeywords: coreKeywords.length,
      longTailQueries: longTailQueries.length,
      geoSearchPrompts: geoSearchPrompts.length,
      dataMatrixQueries: dataMatrixQueries.length,
      hinglishPrompts: hinglishPrompts.length,
      itineraryQueries: itineraryQueries.length,
      entityAssoc: entityAssoc.length
    }
  },
  data: {
    coreKeywords,
    longTailQueries,
    geoSearchPrompts,
    dataMatrixQueries,
    hinglishPrompts,
    itineraryQueries,
    entityAssoc
  }
};

const outputPath = path.join(__dirname, '../src/data/seo-knowledge-base.json');
fs.writeFileSync(outputPath, JSON.stringify(seoDatabase, null, 2));

console.log(`Success! Generated Expanded SEO Knowledge Base with ${seoDatabase.metadata.totalKeywords} keywords.`);
console.log(`Saved output to: ${outputPath}`);
console.log(`Breakdown:`, seoDatabase.metadata.counts);
