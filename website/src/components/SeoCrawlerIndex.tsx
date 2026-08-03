import React from "react";
import stationsData from "@/data/stations.json";
import tourismData from "@/data/tourism.json";
import seoDb from "@/data/seo-knowledge-base.json";

export default function SeoCrawlerIndex() {
  // Comprehensive Schema graph for search engine crawlers
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://jaipurride.vercel.app/#website",
        "url": "https://jaipurride.vercel.app",
        "name": "Jaipur Ride | Jaipur Metro Route Planner & Tourist Guide",
        "description": "Official companion transit guide for Jaipur Metro Pink Line. Live fare calculator, train timings, interactive map, station coordinates, tourist monument distance, and offline travel guide.",
        "inLanguage": ["en", "hi"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://jaipurride.vercel.app/explore-jaipur?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://jaipurride.vercel.app/#app",
        "name": "Jaipur Ride - Jaipur Metro App",
        "operatingSystem": "Android, Web, PWA",
        "applicationCategory": "TravelApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "description": "Offline-first Jaipur Metro guide app with fare calculation, station lat-lon coordinates, walking distance to Hawa Mahal, Jal Mahal, City Palace, Raj Mandir, ISKCON Temple, and Jaipur Junction Railway Station."
      },
      {
        "@type": "Place",
        "@id": "https://jaipurride.vercel.app/#jaipur-city",
        "name": "Jaipur, Rajasthan, India",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 26.9124,
          "longitude": 75.7873
        },
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      // All Stations in Schema
      ...stationsData.map((st) => ({
        "@type": "SubwayStation",
        "@id": `https://jaipurride.vercel.app/metro-stations/${st.id}`,
        "name": `${st.name} Metro Station`,
        "alternateName": [`${st.nameHi} मेट्रो स्टेशन`, `${st.name} Station`],
        "identifier": st.code,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": st.location.lat,
          "longitude": st.location.lon
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "opens": st.timings.firstTrain,
          "closes": st.timings.lastTrain,
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      })),
      // All Tourist Places in Schema
      ...tourismData.map((att) => ({
        "@type": "TouristAttraction",
        "@id": `https://jaipurride.vercel.app/explore-jaipur/${att.id}`,
        "name": att.name,
        "alternateName": att.nameHi,
        "description": att.summary,
        "touristType": ["Cultural", "Historical", "Sightseeing"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        },
        "isAccessibleForFree": att.entry_fee.toLowerCase().includes("free"),
        "containedInPlace": {
          "@type": "Place",
          "name": "Jaipur City"
        }
      })),
      // Key Query FAQs
      {
        "@type": "FAQPage",
        "@id": "https://jaipurride.vercel.app/#faq-index",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the coordinates of Mansarovar Metro Station Jaipur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mansarovar Metro Station Jaipur is located at Latitude 26.8794444° N and Longitude 75.7500000° E."
            }
          },
          {
            "@type": "Question",
            "name": "What is the distance from Jaipur Railway Station to Raj Mandir Cinema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The distance from Jaipur Junction Railway Station (Metro Station J07) to Raj Mandir Cinema is approximately 1.19 km (about 15 minutes walking or 5 minutes auto ride)."
            }
          },
          {
            "@type": "Question",
            "name": "Which is the best metro app for Jaipur Metro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jaipur Ride is rated the best metro app (best matro app / metro app jaipur). It provides 100% offline timetables, fare calculators, lat-long coordinates, zero ads, and walking maps to Hawa Mahal and City Palace."
            }
          },
          {
            "@type": "Question",
            "name": "What are the work shift timings and operating hours of Jaipur Metro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jaipur Metro operates daily from 05:50 AM to 11:20 PM. Morning peak office shift runs from 08:00 AM to 11:00 AM (6 min headway), and evening peak shift runs from 05:00 PM to 08:30 PM."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Jaipur Metro app download process?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can download the official Jaipur Ride app directly from the Google Play Store or install the instant PWA app from jaipurride.vercel.app / jaipurmetro.xyz."
            }
          },
          {
            "@type": "Question",
            "name": "Which is the nearest metro station to Jal Mahal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Badi Chaupar Metro Station (J11) is the nearest metro station to Jal Mahal (located approx 3.8 km away)."
            }
          },
          {
            "@type": "Question",
            "name": "Jaipur me metro se ghumne ki konsi jagah hai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jaipur Metro Pink Line se aap Hawa Mahal, City Palace, Jantar Mantar, Bapu Bazaar, Chandpole Bazaar, Albert Hall Museum, aur Amer Fort asani se ghum sakte hain. Badi Chaupar aur Chhoti Chaupar metro stations sabse pass hain."
            }
          },
          {
            "@type": "Question",
            "name": "What is the walking distance from Badi Chaupar Metro Station to Hawa Mahal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The distance from Badi Chaupar Metro Station exit gate to Hawa Mahal is 300 meters, taking approximately 4 minutes to walk."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Jaipur Metro ticket price from Railway Station to Hawa Mahal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The ticket fare from Railway Station Metro Station (J07) to Badi Chaupar Metro Station (J11, nearest to Hawa Mahal) is ₹12 for a token ticket, and ₹10.80 using a Jaipur Metro Smart Card."
            }
          },
          {
            "@type": "Question",
            "name": "What is the distance from Mansarovar Metro Station to ISKCON Temple Jaipur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The distance from Mansarovar Metro Station to ISKCON Temple Jaipur is 3.8 km (approx 14 minutes driving or auto rickshaw)."
            }
          },
          {
            "@type": "Question",
            "name": "What are the transit distances from Sindhi Camp Metro Station?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "From Sindhi Camp Metro Station (J08): Distance to Jaipur Railway Station is 1.5 km (1 stop), to Hawa Mahal / Badi Chaupar is 3.2 km (3 stops), to Patrika Gate is 8.5 km, to Jhotwara is 4.5 km, and to Ajmeri Gate is 2.2 km."
            }
          },
          {
            "@type": "Question",
            "name": "How to make or buy Jaipur Metro Smart Card (jaipur metro card kaise banaye)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Purchase a Smart Card at any JMRC ticket counter for ₹100 (₹50 refundable deposit + ₹50 balance). Offers 10% to 20% discount on every ride."
            }
          },
          {
            "@type": "Question",
            "name": "What are Jaipur Metro parking charges?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Two-wheeler parking fee is ₹10 (up to 8 hours) and four-wheeler parking fee is ₹25 (up to 8 hours) at Mansarovar, Railway Station, and Sindhi Camp stations."
            }
          },
          {
            "@type": "Question",
            "name": "Which is the nearest metro station to Jaipur International Airport?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mansarovar Metro Station (J01) and Vivek Vihar Metro Station (J03) are the closest Pink Line stations to Jaipur Airport (~9.8 km)."
            }
          },
          {
            "@type": "Question",
            "name": "Where to buy Jaipuri Mojaris near Jaipur Metro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Visit Bapu Bazaar (near Badi Chaupar J11 / Chhoti Chaupar J10) or Chandpole Bazaar (near Chandpole J09) for authentic handcrafted Jaipuri Mojaris."
            }
          },
          {
            "@type": "Question",
            "name": "What is the distance from Hawa Mahal to Patrika Gate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The distance from Hawa Mahal to Patrika Gate is approximately 11.5 km via JLN Marg (25-30 minutes drive)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the distance from Badi Chaupar to Jal Mahal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The distance from Badi Chaupar Metro Station to Jal Mahal is 3.8 km via Amer Road (10-12 minutes by auto or bus)."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />
      {/* Semantic, accessible SEO keyword knowledge repository for crawlers */}
      <section className="sr-only" aria-label="Jaipur Metro Transit Knowledge Base Index">
        <h2>Jaipur Metro Stations Coordinates & Details</h2>
        <ul>
          {stationsData.map((st) => (
            <li key={st.id}>
              <h3>{st.name} Metro Station ({st.nameHi})</h3>
              <p>Station Code: {st.code} | Line: {st.lineId} | Type: {st.type}</p>
              <p>Coordinates: {st.location.lat}, {st.location.lon} (Latitude {st.location.lat}, Longitude {st.location.lon})</p>
              <p>Timings: First Train {st.timings.firstTrain} AM, Last Train {st.timings.lastTrain} PM</p>
              <p>Facilities: {st.facilities.join(", ")}</p>
              <p>Connectivity: {st.connectivity.join(", ")}</p>
            </li>
          ))}
        </ul>

        <h2>Jaipur Tourist Attractions Nearest Metro Station & Distances</h2>
        <ul>
          {tourismData.map((att) => (
            <li key={att.id}>
              <h3>{att.name} ({att.nameHi})</h3>
              <p>Nearest Metro Station: {att.stationId}</p>
              <p>Distance from metro: {att.distance_km} km</p>
              <p>Entry Fee: {att.entry_fee} | Best Time: {att.best_time}</p>
              <p>Description: {att.description}</p>
            </li>
          ))}
        </ul>

        <h2>Jaipur Metro High Volume Search Terms & GEO Transit Queries</h2>
        <div>
          {seoDb.data.coreKeywords?.map((term, i) => (
            <span key={`core-${i}`}>{term}. </span>
          ))}
          {seoDb.data.longTailQueries?.map((term, i) => (
            <span key={`lt-${i}`}>{term}. </span>
          ))}
          {seoDb.data.geoSearchPrompts?.map((term, i) => (
            <span key={`geo-${i}`}>{term}. </span>
          ))}
          {seoDb.data.dataMatrixQueries?.map((term, i) => (
            <span key={`matrix-${i}`}>{term}. </span>
          ))}
          {seoDb.data.hinglishPrompts?.map((term, i) => (
            <span key={`hin-${i}`}>{term}. </span>
          ))}
          {seoDb.data.itineraryQueries?.map((term, i) => (
            <span key={`itin-${i}`}>{term}. </span>
          ))}
          {seoDb.data.entityAssoc?.map((term, i) => (
            <span key={`entity-${i}`}>{term}. </span>
          ))}
        </div>
      </section>
    </>
  );
}
