<div align="center">

<img src="website/public/logo1.png" alt="JaipurRide Logo" width="120" height="120" style="border-radius:24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);"/>

# 🚇 JaipurRide

### The Ultimate Offline-First Jaipur Metro Companion for Android & Web

[![Google Play Store](https://img.shields.io/badge/Google_Play-Download_App-00D2FF?style=for-the-badge&logo=google-play&logoColor=white)](https://play.google.com/store/apps/details?id=co.median.android.nmdabkl)
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-JaipurRide-EC4899?style=for-the-badge)](https://jaipurride.vercel.app)
[![License](https://img.shields.io/badge/License-Non--Commercial-FF7B00?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Tusharjain-19/jaipur-ride?style=for-the-badge&color=gold)](https://github.com/Tusharjain-19/jaipur-ride/stargazers)

</div>

---

## ✨ Overview

**JaipurRide** is a premium, open-source, offline-first navigation utility designed to simplify Jaipur Metro Pink Line transits. 

Unlike standard map providers that sell user coordinates and fail inside deep underground tunnels, JaipurRide stores all database caches and routing graphs locally. Whether you are a tourist exploring historical palaces or a daily commuter planning routes, JaipurRide calculates coordinates, fares, and connections 100% on-device.

### 🛡️ Why Download the Official Google Play App?
While developers can build sideload packages directly from source, commuters are highly recommended to use the verified release distributed via the Google Play Store. The official app ensures:
1. **Verified Security Protection**: The package is scanned by Google Play Protect, ensuring zero malware injections or tracking utilities.
2. **Automatic Database Updates**: Ticket pricing formulas, station operating schedules, and tourist information caches are automatically updated in the background without needing a manual build.
3. **Power-Optimized Location Services**: Leverages native Android positioning frameworks to conserve battery while tracking metro train coordinates for proximity alerts.

### 🌟 Key Pillars
* **Privacy-First**: No telemetry, no analytical trackings, and local-only GPS calculation.
* **Offline-First Architecture**: Cached tourist DBs, station parameters, and vector maps.
* **Bilingual Support**: Fully localized in English and हिन्दी (Hindi).
* **Workspaces Monorepo**: Segregated mobile code (`mobile/`) and Next.js website (`website/`).

---

## 📱 Google Play Store App
The compiled native Android release is available for download on the Google Play Store. It features:
* **Background GPS alerts**: Triggers stop reminders even when your phone is in your pocket.
* **Tactile Haptic Navigation**: Vibrate patterns corresponding to boarding and arrival.
* **Zero Internet Requirements**: A self-contained APK for reliable underground operations.

[📥 **Download JaipurRide on Google Play**](https://play.google.com/store/apps/details?id=co.median.android.nmdabkl)

---

## 📸 App Preview
<div align="center">
  <img src="website/public/images/hawa_mahal.jpg" alt="App Banner - Hawa Mahal" width="550" style="border-radius:18px"/>
</div>

---

## 🚀 Key Features

* 🗺️ **Interactive Route Pathfinder**: Select origin and destination nodes; get the shortest route path, transfers, and ride duration instantly.
* 🎫 **Ticket Fare Audit**: Live ticket price checks including Cash Tokens, Smart Cards (10% off), Student Cards (15% off), and Senior Citizen Cards (25% off) based on the latest JMRC regulations.
* 🔴 **Real-Time Journey Simulator**: Simulates time-progress points along your path to estimate arrival offsets.
* 🏛️ **Tourism Explore Directory**: Offline list of heritage palaces, bazaars, and monuments mapped to their nearest metro terminal, detailing walks and maps links.
* 🕐 **Timings Board**: Comprehensive schedules for first/last train dispatches and peak vs. off-peak frequencies.
* 🛡️ **Safety & Help Desk**: Direct offline hotlines for Jaipur Metro safety, women's helpline, police, and ambulances.

---

## 🗂️ Project Structure

JaipurRide is managed as a unified monorepo with npm Workspaces:

```
jaipur-ride/
├── mobile/                 # 📱 Capacitor Android & Mobile application source
│   ├── index.html          # Mobile app web shell
│   ├── css/                # Mobile app styles (light/dark theme, responsive grids)
│   ├── js/                 # Mobile app logic (modules, offline DBs, bridges)
│   ├── assets/             # Mobile app static assets (images, audio)
│   ├── android/            # Native Gradle Android Studio project
│   └── capacitor.config.ts # Capacitor configuration
├── website/                # 🚇 Next.js marketing site, documentation & simulator
│   ├── src/app/            # App router pages (timings, map, download, explorer)
│   ├── src/components/     # Next.js React components (Navbar, Footer, Mockup)
│   └── public/             # Static public folder (sideload releases, synced assets)
├── scripts/                # 🛠️ Workspace helper scripts
│   └── sync-assets.js      # Synchronizes mobile assets to website public assets
└── package.json            # Monorepo configuration defining workspaces
```

---

## 🛠️ Technology Stack

### Mobile Application (`mobile/`)
* **Core**: Vanilla HTML5, CSS Grid Layouts, ES Modules.
* **Bridge**: Capacitor JS Native Runtime Bridge.
* **Native**: Kotlin, Java, Gradle build automation.

### Marketing Website (`website/`)
* **Framework**: Next.js (React 19 + TypeScript).
* **Styling**: Tailwind CSS v4 (using clean canonical layout classes).
* **Icons**: Lucide React.
* **Simulation**: Embedded iframe wrapper targeting synced mobile builds.

---

## ⚡ Development & Build Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)
* **Android SDK / Android Studio** (for mobile workspace compiles)

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/Tusharjain-19/jaipur-ride.git
cd jaipur-ride-main

# Install dependencies for all workspaces
npm install
```

### 2. Website Workspace (Next.js)
```bash
# Start the local development server (runs asset-sync automatically)
npm run dev:website

# Build the static Next.js production output
npm run build:website
```
> **Note:** The Next.js pipeline uses the `sync-assets.js` script inside `scripts/` during `predev` and `prebuild` phases. It clears and copies all relevant simulator assets from `mobile/` into `website/public/` so that code changes remain single-sourced in `mobile/`.

### 3. Mobile Workspace (Capacitor / Android)
```bash
# Compile and copy web files to mobile distribution (www/)
npm run build:mobile

# Synchronize Capacitor bridge config
cd mobile
npx cap sync android

# Build or assemble Android Debug APK using local Gradle Wrapper
# Uses Java 21 (jdk21) configured in gradle.properties
npm run android:debug --workspace=mobile
```

---

## 🛤️ Pink Line Reference Grid

JaipurRide covers the entire Pink Line routing configuration:

```
[J01] Mansarovar  <-->  [J02] New Aatish Market  <-->  [J03] Vivek Vihar  <-->  [J04] Shyam Nagar
       <-->  [J05] Ram Nagar  <-->  [J06] Civil Lines  <-->  [J07] Railway Station
       <-->  [J08] Sindhi Camp (Interchange)  <-->  [J09] Chandpole
       <-->  [J10] Chhoti Chaupar  <-->  [J11] Badi Chaupar
```

### 🏛️ Sightseeing & Proximity Guide

| Station Node | Nearest Attraction | Proximity Metadata |
| :--- | :--- | :--- |
| **Badi Chaupar (J11)** | Hawa Mahal | 1.1 km (~14 min walk) |
| **Badi Chaupar (J11)** | City Palace | 1.3 km (~16 min walk) |
| **Badi Chaupar (J11)** | Jantar Mantar | 1.4 km (~18 min walk) |
| **Chhoti Chaupar (J10)** | Albert Hall Museum | 1.8 km (~22 min walk) |
| **Chandpole (J09)** | Nahargarh Fort | ~5.8 km drive (last-mile transfer) |
| **Sindhi Camp (J08)** | Raj Mandir Cinema | 1.5 km (~18 min walk) |
| **Civil Lines (J06)** | Central Park | ~2.5 km last-mile drive |
| **Mansarovar (J01)** | Patrika Gate | ~6.5 km last-mile drive |

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License & Distribution Terms

JaipurRide is distributed under a **Custom Non-Commercial & Official App License**. 

### Key License Restraints:
* **Personal & Educational Scope Only**: The code can be studied, modified, and run for personal exploration.
* **Prohibition of Commercial Use**: You are strictly prohibited from compiling, rebranding, or hosting this codebase or its static metro database structures for commercial services, paid transport applications, wrapper portals, or display-advertising revenue.
* **Official Client Requirement**: The official verified client must be installed via the [Google Play Store](https://play.google.com/store/apps/details?id=co.median.android.nmdabkl). Redistribution of unofficial mirrors, sideloads, or forks under the "JaipurRide" brand name is disallowed.

Please check the complete [LICENSE](file:///d:/jaipur-ride/jaipur-ride-main/LICENSE) file in the root directory for full legal terms.

---

<div align="center">

Made with ❤️ for the **Pink City** 🏰  
*Jaipur Metro Pink Line · 11 Stations · Established 2015*

</div>
