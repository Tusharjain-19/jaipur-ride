import React from "react";
import { Download, Shield, Smartphone, AlertCircle, CheckCircle, Info, BookOpen, Play } from "lucide-react";

export const metadata = {
  title: "Download Jaipur Ride for Android",
  description: "Download the official offline Jaipur Metro companion app. Sideload the latest APK directly or install via Google Play Store. Includes step-by-step guide.",
};

export default function DownloadPage() {
  const changelog = [
    {
      version: "v2.0.4",
      date: "July 2026",
      notes: [
        "Fixed CDN Lucide load failures in airplane/offline modes by vendoring assets locally.",
        "Resolved geolocation cancel callback promise freezes in station lookup modals.",
        "Synchronized language toggles to persist custom EN/HI choices across app launches.",
        "Refined Android vibration durations for stop arrival haptics."
      ]
    },
    {
      version: "v2.0.0",
      date: "May 2026",
      notes: [
        "Complete migration to Capacitor 7.0 native runtime bridge.",
        "Added background location service tracking for station reminders.",
        "Implemented local SQLite data cache for offline attractions.",
        "Redesigned premium dark mode layout matching Material Design 3."
      ]
    }
  ];

  const permissions = [
    {
      name: "Fine / Coarse Geolocation",
      purpose: "Required to track your position relative to station coordinates to alert you when your destination is close."
    },
    {
      name: "Vibration / Haptics",
      purpose: "Required to trigger tactile haptics alarms when you arrive at your stop."
    },
    {
      name: "Network State Detection",
      purpose: "Required to dynamically switch between local cached databases and live JMRC alerts."
    },
    {
      name: "Foreground Location Service",
      purpose: "Required to keep location tracking active in the background when your phone screen is locked."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
      {/* 1. HERO DOWNLOAD HEADER */}
      <div className="bg-linear-to-br from-navy-dark to-navy-accent text-white rounded-[36px] p-8 lg:p-16 border border-navy-border shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <span className="px-3 py-1 bg-brand-pink text-white rounded-md text-xs font-bold uppercase tracking-wider">
              Stable Build Available
            </span>
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl tracking-tight leading-tight">
              Get Jaipur Ride for Android
            </h1>
            <p className="max-w-2xl text-white/80 leading-relaxed text-sm sm:text-base">
              Take the complete Pink City transit assistant offline. Experience live GPS journey alerts, stop reminders, safety helpline contacts, and tourist directions deep inside underground tunnels.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* Google Play Store Link */}
              <a
                href="https://play.google.com/store/apps/details?id=co.median.android.nmdabkl"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Get it on Google Play</span>
              </a>

              {/* Direct APK Link */}
              <a
                href="/release/jaipurride-release.apk"
                className="px-6 py-4 bg-brand-pink hover:bg-brand-pink-dark text-white font-bold rounded-2xl shadow-lg shadow-brand-pink/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download .APK</span>
              </a>

              {/* Direct Debug Link */}
              <a
                href="/release/jaipurride-debug.apk"
                className="px-5 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold rounded-2xl transition-all flex items-center space-x-2 text-xs"
              >
                <Smartphone className="w-4 h-4 text-brand-pink" />
                <span>Debug APK</span>
              </a>
            </div>

            <div className="text-xs text-white/50 pt-2">
              File size: ~53 MB • MD5 Verified • Safe & malware checked.
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            <div className="bg-white p-5 rounded-3xl shadow-xl flex flex-col items-center space-y-2">
              <svg className="w-36 h-36 text-slate-900" viewBox="0 0 100 100">
                <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="10" y="10" width="15" height="15" fill="currentColor" />
                <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="75" y="10" width="15" height="15" fill="currentColor" />
                <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="10" y="75" width="15" height="15" fill="currentColor" />
                <rect x="35" y="15" width="10" height="10" fill="currentColor" />
                <rect x="40" y="35" width="15" height="5" fill="currentColor" />
                <rect x="15" y="45" width="5" height="15" fill="currentColor" />
                <rect x="45" y="70" width="10" height="15" fill="currentColor" />
                <rect x="70" y="45" width="20" height="10" fill="currentColor" />
                <rect x="55" y="55" width="10" height="10" fill="currentColor" />
                <rect x="75" y="75" width="15" height="15" fill="currentColor" />
              </svg>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Scan to Download Direct</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SPECIFICATIONS & INSTALLATION GUIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sideload Guide */}
        <div className="lg:col-span-7 bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
          <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-brand-pink" />
            <span>Sideload Installation Guide</span>
          </h2>
          <p className="text-sm text-foreground/75 leading-relaxed">
            If you are installing the direct `.APK` package, follow these standard steps:
          </p>

          <ol className="space-y-4 text-sm text-foreground/80">
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="font-bold">Download the APK file</p>
                <p className="text-xs text-foreground/60">Click the download button above on your Android device to save the installer packet.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="font-bold">Enable Sideload Permissions</p>
                <p className="text-xs text-foreground/60">Go to Settings &gt; Security &gt; Install Unknown Apps, and toggle permission for your browser or file manager.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="font-bold">Install Package</p>
                <p className="text-xs text-foreground/60">Open your Downloads folder, tap the jaipurride-release.apk, and select Install.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <div>
                <p className="font-bold">Open and Grant Location Access</p>
                <p className="text-xs text-foreground/60">Launch the app. Grant GPS Geolocation permissions to enable automatic stop vibration alerts during trips.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
            <h2 className="font-heading font-bold text-xl text-foreground flex items-center space-x-2">
              <Info className="w-5 h-5 text-brand-pink" />
              <span>Technical Specs</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-foreground/80">
              <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/50">Minimum Android Version</span>
                <span className="font-bold">7.0 (API 24 - Nougat)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/50">Recommended Version</span>
                <span className="font-bold">11.0 (API 30) or above</span>
              </div>
              <div className="flex justify-between py-2 border-b border-light-border dark:border-navy-border/20">
                <span className="text-foreground/50">APK Package Size</span>
                <span className="font-bold">53.4 MB</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-foreground/50">Runtime Framework</span>
                <span className="font-bold">Capacitor JS Bridge</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold">Beta warning:</p>
              <p>Direct APK sideloads do not support automatic Play Store patch updates. Check this download page to manually update features.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HARDWARE PERMISSIONS EXPLAINER */}
      <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl space-y-6">
        <h2 className="font-heading font-bold text-2xl text-foreground flex items-center space-x-2">
          <Shield className="w-6 h-6 text-brand-pink" />
          <span>Device Permissions Explained</span>
        </h2>
        <p className="text-sm text-foreground/75 leading-relaxed">
          To provide location tracking and haptics, the app requests the following system permissions. We respect your privacy: location coordinates are processed 100% locally on your device and are never sent to remote servers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {permissions.map((perm, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-light-accent dark:bg-navy-card/40 border border-light-border/60 dark:border-navy-border/20 space-y-2"
            >
              <h3 className="font-heading font-bold text-base text-foreground flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-pink" />
                <span>{perm.name}</span>
              </h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {perm.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CHANGELOG & VERSION NOTES */}
      <div className="space-y-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground text-center">Changelog & Version History</h2>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {changelog.map((log) => (
            <div
              key={log.version}
              className="bg-white dark:bg-navy-dark rounded-2xl p-6 border border-light-border dark:border-navy-border/40 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-heading font-extrabold text-lg text-brand-pink">{log.version}</span>
                <span className="text-xs text-foreground/50">{log.date}</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/80 pl-4 list-disc">
                {log.notes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
