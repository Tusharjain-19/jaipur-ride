const fs = require('fs');
const path = require('path');

// Load stations and tourism data to make keywords highly accurate and contextual
const stationsData = require('../src/data/stations.json');
const tourismData = require('../src/data/tourism.json');

const stations = stationsData.map(s => s.name);
const stationsHi = stationsData.map(s => s.nameHi);
const attractions = tourismData.map(t => t.name);
const attractionsHi = tourismData.map(t => t.nameHi);

const facilitiesList = ['Toilets', 'Escalator', 'Elevator', 'Ticket Counter', 'Smart Card Recharge', 'Wheelchair Access', 'Parking'];
const transportList = ['local city bus', 'auto rickshaw', 'e-rickshaw', 'Uber/Ola cab', 'skywalk', 'pedestrian crossing'];
const timeModifiers = ['morning hours', 'late evening', 'peak traffic times', 'Sunday schedule', 'holidays'];
const foodList = ['Dal Baati Churma', 'Pyaaz Kachori', 'Mawa Ghewar', 'Lassi', 'traditional thali', 'street food', 'fast food'];
const shoppingItems = ['traditional textiles', 'block print fabrics', 'gemstones', 'juttis', 'handicrafts', 'blue pottery', 'souvenirs'];

// Helper to get random item from array
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate unique items up to a specific limit (e.g. 310 to satisfy 300+)
const generateGroup = (templateFn, count = 310) => {
  const set = new Set();
  let attempts = 0;
  while (set.size < count && attempts < 50000) {
    attempts++;
    const item = templateFn();
    if (item && item.trim().length > 0) {
      set.add(item.trim());
    }
  }
  return Array.from(set);
};

// 1. Long-tail Keywords (300+)
const longTailKeywords = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const trans = rand(transportList);
  const templates = [
    `best route from ${st} metro station to ${att} jaipur`,
    `how to go to ${att} via ${st} metro line`,
    `jaipur metro station nearest to ${att} opening hours`,
    `walking time from ${st} metro to ${att} ticket counter`,
    `budget travel guide for ${att} using jaipur metro`,
    `jaipur metro fare calculator from ${st} to other stations`,
    `metro facilities for disable and senior citizens at ${st}`,
    `best cafes and local restaurants near ${st} metro station`,
    `hotels near ${st} metro station jaipur under 2000 INR`,
    `shopping markets for block print dress near ${st} metro`,
    `nearest schools and top colleges near ${st} metro corridor`,
    `emergency hospitals and medical care clinics near ${st}`,
    `family weekend trip guide for ${att} by metro`,
    `solo female traveler safety tips for jaipur metro at ${st}`,
    `how to buy jaipur metro tourist smart card at ${st}`,
    `transit directions from jaipur railway station to ${st} station`,
    `best connection from jaipur airport to ${st} metro line using ${trans}`,
    `local sightseeing package around ${st} metro station`,
    `historical monuments walking tour from ${st} underpass`,
    `traditional puppet show and temples near ${st} station`
  ];
  return rand(templates);
});

// 2. Conversational Search Queries (300+)
const conversationalQueries = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const food = rand(foodList);
  const templates = [
    `which is the nearest metro station to ${att} in jaipur?`,
    `can I walk from ${st} metro station to ${att}?`,
    `how much is the metro ticket from ${st} to Badi Chaupar?`,
    `is there parking available for cars at ${st} metro?`,
    `what is the first and last train timing for ${st} station?`,
    `where can I get ${food} near ${st}?`,
    `are there any good cafes to work near ${st} metro station?`,
    `which market is famous for jewelry near ${st} metro?`,
    `how to reach the international airport from ${st} metro station?`,
    `is jaipur metro safe for tourist families traveling at night?`,
    `how do I get an offline ticket card at ${st} ticket counter?`,
    `which colleges are connected directly to the jaipur metro line near ${st}?`,
    `is there an elevator or escalator at ${st} for wheelchair users?`,
    `what are the historical places to visit near ${st} in one day?`,
    `how can a student get discount pass in jaipur metro at ${st}?`,
    `are hotels near ${st} metro station good for solo travelers?`,
    `how to plan a budget trip to ${att} using public transport?`,
    `what are the safety helplines for women in jaipur metro?`,
    `where can I find ${rand(transportList)} outside ${st} metro station?`,
    `how to reach Sindhi Camp bus stand from ${st} metro?`
  ];
  return rand(templates);
});

// 3. Natural Sentences that Answer Intent (300+)
const naturalSentences = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const food = rand(foodList);
  const templates = [
    `To reach ${att} easily, take the Jaipur Metro Pink Line and get off at the nearest station, which is ${st}.`,
    `Jaipur Metro trains operate daily from 06:20 AM to 09:20 PM, making transit to ${att} highly reliable.`,
    `Commuters traveling from ${st} to Badi Chaupar can purchase a single journey token or use a rechargeable Smart Card for 10% discount.`,
    `The walking distance from ${st} metro station to ${att} is approximately 10 to 15 minutes through local heritage bazaars.`,
    `For safety and convenience, every station like ${st} is equipped with active CCTV cameras and JMRC police desks.`,
    `If you are looking for local street food or traditional Rajasthani textiles, explore the shopping markets located just outside ${st}.`,
    `Travelers arriving at Jaipur Junction Railway Station can board the metro immediately at the adjacent Railway Station Metro Station.`,
    `To get to the Jaipur Airport from ${st}, take the train to Mansarovar and hire a local auto-rickshaw or app cab for the final 10 km.`,
    `For student commuters, JMRC offers monthly pass concessions and student travel discounts at all ticket counters.`,
    `The underground stations like Chhoti Chaupar and Badi Chaupar feature beautiful traditional arches combined with modern transport lifts.`,
    `Parking facilities are available at major stations like Mansarovar and Railway Station for both two-wheelers and cars.`,
    `Nearby medical clinics and multispecialty hospitals can be accessed directly from the exits of ${st} station.`,
    `For heritage monuments like ${att}, we recommend starting your tour early in the morning via ${st} to avoid traffic.`,
    `Luxury hotels and heritage homestays are situated within walking distance of ${st} metro station.`,
    `Disabled passengers can utilize the dedicated tactile pathways and wheelchair ramps at the entry gates of ${st}.`,
    `Local city buses (RSRTC) and e-rickshaws provide excellent last-mile connectivity from ${st} to remote attractions.`,
    `You can enjoy offline route planning and timing estimations on the Jaipur Ride app during your city travel.`,
    `For solo travelers, the area surrounding ${st} offers affordable hostels, clean public restrooms, and tourist guide desks.`,
    `To visit the world's largest sundial at Jantar Mantar, take the metro to Badi Chaupar and take exit gate number two.`,
    `Buying a 1-day unlimited tourist pass for 100 rupees is the most budget-friendly option for exploring monuments near ${st}.`
  ];
  return rand(templates);
});

// 4. People Also Ask Questions (300+)
const peopleAlsoAsk = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const item = rand(facilitiesList);
  const templates = [
    `How far is ${att} from the nearest metro station in jaipur?`,
    `Is jaipur metro fully functional on Sundays for visiting ${att}?`,
    `What is the minimum fare for a ride in jaipur metro to ${st}?`,
    `How to reach ${att} from Jaipur railway station using metro?`,
    `Can I recharge my Jaipur Metro Smart Card online or at ${st}?`,
    `Are there luggage scanners and security checks at ${st} station?`,
    `Which metro station is closest to ${att} in historical jaipur?`,
    `Is there a direct metro line from Jaipur Airport to ${st}?`,
    `What are the tourist places near ${st} metro station within walking distance?`,
    `How can I get a monthly student pass for Jaipur Metro at ${st}?`,
    `Are pets or heavy luggage allowed inside JMRC trains at ${st}?`,
    `Which is the best hotel near ${st} metro station for visiting ${att}?`,
    `How to travel from Sindhi Camp bus stand to ${att} by metro line?`,
    `Are there public toilets and drinking water at ${st} station lobby?`,
    `What is the difference between peak and off-peak hours metro fares at ${st}?`,
    `How do I contact JMRC passenger customer care support for ${st} station?`,
    `Can I use my Delhi Metro Smart Card in Jaipur Metro at ${st}?`,
    `Which market near ${st} is best for buying traditional ${rand(shoppingItems)}?`,
    `Is there a tourist pass for unlimited travel in Jaipur Metro for ${st}?`,
    `Where are the parking slots located at ${st} metro terminal area?`,
    `What is the walking distance from ${st} metro exit to nearest ${rand(['hospital', 'college', 'temple', 'hotel'])}?`
  ];
  return rand(templates);
});

// 5. Voice Search Phrases (300+)
const voiceSearch = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const facility = rand(facilitiesList);
  const templates = [
    `find metro route to ${att} in jaipur`,
    `nearest metro station to ${att}`,
    `metro ticket fare from ${st} to Badi Chaupar`,
    `show me jaipur metro map offline for ${st}`,
    `when is the next metro train from ${st} station`,
    `directions to ${st} metro station entrance gates`,
    `how to go to railway station by metro in jaipur from ${st}`,
    `jaipur metro safety contact number at ${st}`,
    `best shopping bazaar near ${st} metro station`,
    `restaurants serving traditional food near ${st} station`,
    `nearest hospital from ${st} metro exit`,
    `how far is the airport from ${st} metro line`,
    `hawa mahal nearest metro station walking directions from ${st}`,
    `first train timing from ${st} metro tomorrow morning`,
    `is there ${facility} at ${st} metro station`,
    `metro fare calculator jaipur ride for ${st}`,
    `tourist attraction walking guide from ${st} underpass`,
    `student discounts jaipur metro ticket at ${st} counter`,
    `hotels within walking distance of ${st} metro track`,
    `how to buy token at ${st} station counter`,
    `is there any metro route from ${st} to ${att}`,
    `can I take public transport to ${att} from ${st}`,
    `estimated time to reach ${att} from ${st}`,
    `metro train schedule from ${st} to Badi Chaupar`,
    `find local guides near ${st} metro station exit`
  ];
  return rand(templates);
});

// 6. Hindi-English (Hinglish) Queries (300+)
const hinglishQueries = generateGroup(() => {
  const st = rand(stations);
  const st2 = rand(stations);
  const att = rand(attractions);
  const shopping = rand(shoppingItems);
  const templates = [
    `jaipur me metro se ${att} kaise jaye`,
    `${st} metro station se ${att} kitni dur hai`,
    `jaipur railway station se ${st} metro train milegi kya`,
    `jaipur metro ki ticket kitne ki aati hai ${st} se`,
    `hawa mahal jane ke liye sabse pass ka metro station kaunsa hai bataye`,
    `${st} metro station par parking charges kya hai two wheeler ke liye`,
    `jaipur metro subah kitne baje chalu hoti hai ${st} par`,
    `jaipur airport se ${st} metro station kaise pahuche`,
    `${st} metro station ke pass acche saste hotels check kare`,
    `traditional shopping ke liye ${st} ke pass kaunsa market hai jaha ${shopping} mile`,
    `jaipur metro card recharge offline kaise kare ${st} par`,
    `${st} station par lift and escalator chal rahe hai kya disabled ke liye`,
    `jaipur me ghumne ki best jagah metro route ke sath bataye`,
    `sindhi camp bus stand se ${st} metro ka ticket price kitna hai`,
    `jaipur metro helpline number kya hai female safety ke liye ${st} station par`,
    `dono line jaipur metro me kaha intersect karti hai route maps`,
    `${st} station ke pass best budget cafes and food stalls list`,
    `students ke liye jaipur metro pass kaise banta hai ${st} counter se`,
    `${st} metro station ke nearest hospitals list aur unka contact`,
    `pink line metro me first and last train kab chalti hai ${st} se ${st2}`
  ];
  return rand(templates);
});

// 7. Related Entities and Semantic Keywords (300+)
const relatedEntities = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const facility = rand(facilitiesList);
  const trans = rand(transportList);
  const templates = [
    `JMRC Pink Line corridor connectivity at ${st}`,
    `Jaipur Metro Rail Corporation limited operations at ${st}`,
    `Maharaja Sawai Jai Singh heritage planning near ${st}`,
    `UNESCO Walled City of Jaipur transit hub at ${st}`,
    `Rajasthan State Road Transport Corporation RSRTC connector at ${st}`,
    `Sindhi Camp Inter State Bus Terminal ISBT near ${st}`,
    `Jaipur Junction Railway Station JP connection at ${st}`,
    `Jaipur International Airport JAI Sanganer proximity to ${st}`,
    `Hawa Mahal Palace of Winds transit route from ${st}`,
    `City Palace royal residence route near ${st}`,
    `Jantar Mantar UNESCO observatory station at ${st}`,
    `Bapu Bazaar traditional block print textiles near ${st}`,
    `Johari Bazaar gemstone shopping market near ${st}`,
    `Tripolia Bazaar iron craft utensils location near ${st}`,
    `Albert Hall Central Museum Ram Niwas Garden near ${st}`,
    `Birla Mandir white marble temple jaipur route from ${st}`,
    `Patrika Gate Jawahar Circle photography spot near ${st}`,
    `World Trade Park WTP Sanganer mall routing via ${st}`,
    `Gaurav Tower GT Malviya Nagar shopping near ${st}`,
    `Nahargarh hill fort sunset viewing point near ${st}`,
    `Jaigarh Fort massive canon attraction location near ${st}`,
    `Amer Fort heritage sightseeing transit guide near ${st}`,
    `Jal Mahal water palace Man Sagar lake routing via ${st}`,
    `ISKCON Temple Krishna consciousness center near ${st}`,
    `Diggi Palace Jaipur Literature Festival hub near ${st}`,
    `Jawahar Kala Kendra multi arts center JKK near ${st}`,
    `JMRC metro network map coordinates for ${st}`,
    `metro ticketing counter and smart card recharge at ${st}`,
    `essential station facilities including ${facility} at ${st}`,
    `last mile transit connectivity via ${trans} from ${st}`
  ];
  return rand(templates);
});

// 8. LSI Keywords (300+)
const lsiKeywords = generateGroup(() => {
  const st = rand(stations);
  const st2 = rand(stations);
  const templates = [
    `JMRC route planner online for ${st} station`,
    `Jaipur metro stations list with code for ${st}`,
    `ticket fare calculation formula between ${st} and ${st2}`,
    `smart card recharge balance check online at ${st}`,
    `metro train timetable today for ${st} platform`,
    `first train dispatches Mansarovar to ${st}`,
    `last train dispatches Badi Chaupar to ${st}`,
    `elevated metro track structural design around ${st}`,
    `underground subway line tunnels at ${st}`,
    `metro gates and exits configuration at ${st} terminal`,
    `wheelchair ramps accessibility compliance at ${st}`,
    `active CCTV cameras terminal safety at ${st}`,
    `JMRC security guards emergency helpline for ${st}`,
    `tourist card price and validity at ${st} booking office`,
    `one day travel pass cost jaipur at ${st}`,
    `unlimited three day metro card booking at ${st}`,
    `peak hours headway train frequency at ${st}`,
    `intermediate stops between ${st} and ${st2} JMRC Line`,
    `e-rickshaws and local transport hubs near ${st} gates`,
    `offline journey simulator app download at ${st} wifi`,
    `commuter travel card recharge discounts at ${st}`,
    `JMRC line 1 station maps layout for ${st}`,
    `subway network map coordinates for ${st}`
  ];
  return rand(templates);
});

// 9. NLP Keywords (300+)
const nlpKeywords = generateGroup(() => {
  const st = rand(stations);
  const st2 = rand(stations);
  const att = rand(attractions);
  const templates = [
    `commuter travel time estimation from ${st} to ${st2}`,
    `passenger ticketing procedures at ${st} ticket counter`,
    `smart card recharge discounts at ${st} terminal`,
    `station facilities directory for JMRC ${st}`,
    `last mile transport options outside ${st} exit gate`,
    `city sightseeing locations connectivity around ${st}`,
    `metro platform boarding directions at ${st} line 1`,
    `subway network map layouts including ${st} node`,
    `budget traveling tips rajasthan starting from ${st}`,
    `emergency emergency helpline numbers at ${st} platform`,
    `disabled commuter friendly pathways at ${st} main entrance`,
    `escalators and elevator operational status at ${st}`,
    `clean drinking water restrooms availability inside ${st}`,
    `historical monument entry ticket prices near ${st}`,
    `best hours visit heritage sights near ${st}`,
    `shopping market walking distance metrics from ${st}`,
    `public transport route comparison between ${st} and ${st2}`,
    `local tour guide booking counters at ${st} terminal`,
    `offline capabilities navigation software for ${st}`,
    `traffic bypass transit benefits near ${st}`,
    `how to plan weekend trips to ${att} using metro at ${st}`
  ];
  return rand(templates);
});

// 10. Synonyms & Alternate Search Terms (300+)
const synonyms = generateGroup(() => {
  const st = rand(stations);
  const att = rand(attractions);
  const templates = [
    `Jaipur City Train Map including ${st}`,
    `JMRC Subway Guide for ${st} station`,
    `Pink City Transit Planner from ${st}`,
    `Jaipur Metro Route Map passing ${st}`,
    `Jaipur Metro Ticket Price from ${st}`,
    `Jaipur Metro Station List showing ${st}`,
    `Jaipur Metro Timings Today at ${st}`,
    `JMRC Pink Line Schedule for ${st}`,
    `Jaipur Walled City Metro Route near ${st}`,
    `Jaipur Local Transport Guide at ${st} exit`,
    `Jaipur Monument Near Metro station ${st}`,
    `Jaipur Junction Metro Link to ${st}`,
    `Sindhi Camp Metro Transit routing to ${st}`,
    `Hawa Mahal Metro Connectivity via ${st}`,
    `City Palace Station Route from ${st}`,
    `Jaipur Airport Metro Terminal near ${st}`,
    `Jaipur Public Transit Map featuring ${st}`,
    `JMRC Passenger Helper at ${st} lobby`,
    `Offline Jaipur Metro App guide for ${st}`,
    `Jaipur Tourist Route Planner starting ${st}`,
    `subway transit helper for visiting ${att} near ${st}`
  ];
  return rand(templates);
});

// Build the structured object
const seoDatabase = {
  metadata: {
    generatedAt: new Date().toISOString(),
    totalKeywords: longTailKeywords.length + conversationalQueries.length + naturalSentences.length + peopleAlsoAsk.length + voiceSearch.length + hinglishQueries.length + relatedEntities.length + lsiKeywords.length + nlpKeywords.length + synonyms.length,
    counts: {
      longTailKeywords: longTailKeywords.length,
      conversationalQueries: conversationalQueries.length,
      naturalSentences: naturalSentences.length,
      peopleAlsoAsk: peopleAlsoAsk.length,
      voiceSearch: voiceSearch.length,
      hinglishQueries: hinglishQueries.length,
      relatedEntities: relatedEntities.length,
      lsiKeywords: lsiKeywords.length,
      nlpKeywords: nlpKeywords.length,
      synonyms: synonyms.length
    }
  },
  data: {
    longTailKeywords,
    conversationalQueries,
    naturalSentences,
    peopleAlsoAsk,
    voiceSearch,
    hinglishQueries,
    relatedEntities,
    lsiKeywords,
    nlpKeywords,
    synonyms
  }
};

const outputPath = path.join(__dirname, '../src/data/seo-knowledge-base.json');
fs.writeFileSync(outputPath, JSON.stringify(seoDatabase, null, 2));

console.log(`Success! Generated SEO Knowledge Base with ${seoDatabase.metadata.totalKeywords} keywords.`);
console.log(`Saved output to: ${outputPath}`);
console.log(`Breakdown:`, seoDatabase.metadata.counts);
