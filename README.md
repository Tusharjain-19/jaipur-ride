<div align="center">

<img src="website/public/logo1.png" alt="JaipurRide Logo" width="120" height="120" style="border-radius:28px; box-shadow: 0 8px 30px rgba(236,72,153,0.3);"/>

# 🚇 Jaipur Ride

### The Ultimate Offline-First Jaipur Metro Companion for Android & Web

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Jaipur_Ride-EC4899?style=for-the-badge&logo=vercel)](https://jaipurride.vercel.app)
[![License](https://img.shields.io/badge/🛡️_License-Non--Commercial-FF7B00?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Tusharjain-19/jaipur-ride?style=for-the-badge&color=gold&logo=github)](https://github.com/Tusharjain-19/jaipur-ride/stargazers)
[![Platform](https://img.shields.io/badge/📱_Platform-Android-3DDC84?style=for-the-badge&logo=android)](https://play.google.com/store/apps/details?id=co.median.android.nmdabkl)

<br/>

<a href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl" target="_blank">
  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" height="75"/>
</a>

</div>

---

## 📱 Project Showcase

<div align="center">
  <img src="website/public/images/real_app_screenshot_1.png" alt="Jaipur Ride Route Screen" width="385" style="border-radius:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin: 8px;"/>
  <img src="website/public/images/real_app_screenshot_2.png" alt="Jaipur Ride Station Details" width="385" style="border-radius:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin: 8px;"/>
</div>

---

## ✨ Overview

**Jaipur Ride** is a premium, open-source, offline-first navigation and travel utility designed to simplify Jaipur Metro Pink Line transits. 

Unlike standard map providers that sell user coordinates and fail inside deep underground tunnels, **Jaipur Ride** stores all database caches and routing graphs locally. Whether you are a tourist exploring historical palaces or a daily commuter planning routes, Jaipur Ride calculates coordinates, fares, and connections 100% on-device.

### 🛡️ Why Download the Official Google Play App?
While developers can build sideload packages directly from source, commuters are highly recommended to use the verified release distributed via the Google Play Store. The official app ensures:
1. **Verified Security Protection**: The package is scanned by Google Play Protect, ensuring zero malware injections or tracking utilities.
2. **Automatic Database Updates**: Ticket pricing formulas, station operating schedules, and tourist information caches are automatically updated in the background without needing a manual build.
3. **Power-Optimized Location Services**: Leverages native Android positioning frameworks to conserve battery while tracking metro train coordinates for proximity alerts.

### 🌟 Key Pillars
* 🔒 **Privacy-First**: No telemetry, no analytical tracking, and local-only GPS calculation.
* 📶 **Offline-First Architecture**: Cached tourist databases, station parameters, and vector maps.
* 🗣️ **Bilingual Support**: Fully localized in English and हिन्दी (Hindi).
* 📦 **Workspaces Monorepo**: Segregated mobile code (`mobile/`) and Next.js website (`website/`).

---

## 🚀 Key Features

* 🗺️ **Interactive Route Pathfinder**: Select origin and destination nodes; get the shortest route path, transfers, and ride duration instantly.
* 🎫 **Ticket Fare Audit**: Live ticket price checks including Cash Tokens, Smart Cards (10% off), Student Cards (15% off), and Senior Citizen Cards (25% off) based on the latest JMRC regulations.
* 🔴 **Real-Time Journey Simulator**: Simulates time-progress points along your path to estimate arrival offsets.
* 🏛️ **Tourism Explore Directory**: Offline list of heritage palaces, bazaars, and monuments mapped to their nearest metro terminal, detailing walks and map links.
* 🕐 **Timings Board**: Comprehensive schedules for first/last train dispatches and peak vs. off-peak frequencies.
* 🛡️ **Safety & Help Desk**: Direct offline hotlines for Jaipur Metro safety, women's helpline, police, and ambulances.

---

## 🗂️ Project Structure

Jaipur Ride is managed as a unified monorepo with npm Workspaces:

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

## 🛠️ Technology Stack & Frameworks

### 📱 Mobile Application Client (`mobile/`)
* **Core Web Stack**: Vanilla HTML5, CSS Grid Layouts, ES Modules.
* **Runtime Bridge**: Capacitor JS Native Bridge.
* **Native Compilers**: Kotlin, Java, Gradle build wrapper.

[![Capacitor](https://img.shields.io/badge/Capacitor-1197F5?style=for-the-badge&logo=capacitor&logoColor=white)](#)
[![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](#)
[![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](#)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](#)
[![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

### 🚇 Marketing Website & Simulator (`website/`)
* **Architecture**: Next.js (React Server Components + TypeScript).
* **Styling & Layout**: Tailwind CSS v4 (responsive utility grids).
* **Asset Pipelines**: Integrated build-time sync engine (`sync-assets.js`).
* **Simulation**: Multi-device responsive iframe simulation wrapper.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](#)

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
cd jaipur-ride

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

Jaipur Ride covers the entire Pink Line routing configuration:

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

Jaipur Ride is distributed under a **Custom Non-Commercial & Official App License**. 

### Key License Restraints:
* **Personal & Educational Scope Only**: The code can be studied, modified, and run for personal exploration.
* **Prohibition of Commercial Use**: You are strictly prohibited from compiling, rebranding, or hosting this codebase or its static metro database structures for commercial services, paid transport applications, wrapper portals, or display-advertising revenue.
* **Official Client Requirement**: The official verified client must be installed via the [Google Play Store](https://play.google.com/store/apps/details?id=co.median.android.nmdabkl). Redistribution of unofficial mirrors, sideloads, or forks under the "JaipurRide" brand name is disallowed.

Please check the complete [LICENSE](LICENSE) file in the root directory for full legal terms.

---

<div align="center">

Made with ❤️ for the **Pink City** 🏰  
*Jaipur Metro Pink Line · 11 Stations · Established 2015*

</div>
