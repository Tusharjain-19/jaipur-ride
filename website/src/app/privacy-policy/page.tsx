"use client";

import React from "react";
import { ShieldCheck, Lock, EyeOff, ServerOff, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="font-heading font-extrabold text-4xl text-foreground tracking-tight">
          {isEn ? "Privacy Policy" : "गोपनीयता नीति"}
        </h1>
        <p className="text-sm text-foreground/50">
          {isEn ? "Last updated: July 15, 2026" : "अंतिम अपडेट: 15 जुलाई, 2026"}
        </p>
      </div>

      <div className="prose dark:prose-invert text-sm sm:text-base text-foreground/80 leading-relaxed space-y-6">
        <p>
          {isEn
            ? "At JaipurRide, we are committed to providing a transparent, safe, and private transit experience. This policy explains our local-only processing frameworks, data protection boundaries, and how we handle updates as our applications grow."
            : "जयपुरराइड में, हम एक पारदर्शी, सुरक्षित और निजी यात्रा अनुभव प्रदान करने के लिए प्रतिबद्ध हैं। यह नीति हमारे केवल-स्थानीय (local-only) प्रोसेसिंग फ्रेमवर्क, डेटा सुरक्षा सीमाओं और हमारे ऐप्स के विकास के साथ होने वाले अपडेट को समझाती है।"}
        </p>

        {/* 1. Local-Only Processing */}
        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <Lock className="w-5 h-5 text-brand-pink" />
            <span>
              {isEn ? "1. Local-Only Geolocation Processing" : "1. केवल-स्थानीय जियोलोकेशन प्रोसेसिंग"}
            </span>
          </h2>
          <p className="text-sm">
            {isEn
              ? "Our Android companion app requests geolocation coordinates (ACCESS_FINE_LOCATION) solely to calculate physical distance from upcoming platforms and trigger stop arrival alarms. All coordinate calculations occur in volatile memory locally on your device. We do not store, upload, transmit, or share your live location history with external servers or advertising brokers."
              : "हमारा एंड्रॉइड ऐप केवल आने वाले स्टेशनों से दूरी की गणना करने और स्टॉप आगमन अलार्म को ट्रिगर करने के लिए जियोलोकेशन (ACCESS_FINE_LOCATION) अनुमति का अनुरोध करता है। सभी गणनाएँ आपके डिवाइस पर स्थानीय रूप से होती हैं। हम आपके लाइव स्थान इतिहास को बाहरी सर्वरों या विज्ञापन एजेंटों के साथ संग्रहीत, अपलोड या साझा नहीं करते हैं।"}
          </p>
        </div>

        {/* 2. Future Policy Modifications */}
        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-brand-pink animate-spin-slow" />
            <span>
              {isEn ? "2. Policy Modifications & Future Updates" : "2. नीति में संशोधन और भविष्य के अपडेट"}
            </span>
          </h2>
          <p className="text-sm leading-relaxed">
            {isEn
              ? "We reserve the right to modify, amend, or update this Privacy Policy at any time to reflect updates to our software, new features, third-party library changes, or updated regulatory frameworks. Any changes will become effective immediately upon being published on this page. We encourage users to check this page periodically for updates. Your continued use of the website or companion mobile application following any revisions constitutes your binding acceptance of the amended policy."
              : "हम अपने सॉफ्टवेयर में अपडेट, नई सुविधाओं, तीसरे पक्ष के पुस्तकालय परिवर्तनों या अद्यतन नियमों को दर्शाने के लिए किसी भी समय इस गोपनीयता नीति को संशोधित, संशोधित या अपडेट करने का अधिकार सुरक्षित रखते हैं। कोई भी बदलाव इस पृष्ठ पर प्रकाशित होने के तुरंत बाद प्रभावी हो जाएगा। हम उपयोगकर्ताओं को समय-समय पर इस पृष्ठ की जांच करने के लिए प्रोत्साहित करते हैं। किसी भी संशोधन के बाद वेबसाइट या ऐप का आपका निरंतर उपयोग संशोधित नीति की स्वीकृति माना जाएगा।"}
          </p>
        </div>

        {/* 3. Device Controls */}
        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground flex items-center space-x-2">
            <EyeOff className="w-5 h-5 text-brand-pink" />
            <span>
              {isEn ? "3. Device Control & OS Sandbox Boundaries" : "3. डिवाइस नियंत्रण और ओएस सैंडबॉक्स सीमाएं"}
            </span>
          </h2>
          <p className="text-sm">
            {isEn
              ? "Hardware integrations like Geolocation triggers, Tactile Haptics, and Local Storage preferences are fully isolated within the host Android OS sandbox. You retain absolute control over these integrations and can modify or revoke app permissions at any time via your device system settings."
              : "जियोलोकेशन ट्रिगर, स्पर्शनीय हैप्टिक्स और लोकल स्टोरेज प्राथमिकताएं पूरी तरह से एंड्रॉइड ओएस सैंडबॉक्स के भीतर सुरक्षित हैं। आपके पास इन अनुमतियों पर पूर्ण नियंत्रण है और आप अपने डिवाइस की सेटिंग्स के माध्यम से किसी भी समय ऐप की अनुमतियों को बदल या रद्द कर सकते हैं।"}
          </p>
        </div>

        {/* 4. Local Preferences */}
        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground shrink-0 flex items-center space-x-2">
            <ServerOff className="w-5 h-5 text-brand-pink" />
            <span>
              {isEn ? "4. Local Preferences Storage" : "4. स्थानीय प्राथमिकताएँ संग्रहण"}
            </span>
          </h2>
          <p className="text-sm">
            {isEn
              ? "We utilize browser localStorage variables solely to store your choices (Language: EN/HI, and Theme: Dark/Light). This data contains no personal identifiers and never leaves your device."
              : "हम केवल आपकी प्राथमिकताओं (भाषा: EN/HI, और थीम: डार्क/लाइट) को सहेजने के लिए ब्राउज़र के localStorage चर का उपयोग करते हैं। इस डेटा में कोई व्यक्तिगत पहचानकर्ता शामिल नहीं हैं और यह आपके डिवाइस से बाहर नहीं जाता है।"}
          </p>
        </div>

        {/* 5. Non-Commercial Data Bounds */}
        <div className="p-6 bg-white dark:bg-navy-dark rounded-2xl border border-light-border dark:border-navy-border/40 shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-foreground shrink-0 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-pink" />
            <span>
              {isEn ? "5. Intellectual Property & Non-Commercial Limits" : "5. बौद्धिक संपदा और गैर-व्यावसायिक सीमाएं"}
            </span>
          </h2>
          <p className="text-sm leading-relaxed">
            {isEn
              ? "All station node indexes, route metrics, fare formulas, databases, and branding assets compiled in this workspace are provided strictly for personal, non-commercial travel guide purposes. Any unauthorized scraping, harvesting, commercial distribution, or competitive code replication is strictly prohibited and subject to legal enforcement."
              : "इस ऐप में संकलित सभी स्टेशन नोड इंडेक्स, रूट डेटा, किराए के फार्मूले, डेटाबेस और ब्रांडिंग एसेट्स विशेष रूप से व्यक्तिगत, गैर-व्यावसायिक यात्रा गाइड के उद्देश्यों के लिए प्रदान किए जाते हैं। किसी भी अनधिकृत स्क्रैपिंग, व्यावसायिक वितरण, या प्रतिस्पर्धी कोड प्रतिकृति सख्त वर्जित है और कानूनी प्रवर्तन के अधीन है।"}
          </p>
        </div>

        {/* 6. Contact Information */}
        <div className="space-y-3 pt-4">
          <h2 className="font-heading font-bold text-xl text-foreground">
            {isEn ? "6. Contact Information" : "6. संपर्क जानकारी"}
          </h2>
          <p className="text-sm">
            {isEn
              ? "If you have questions regarding this Privacy Policy or geolocation processing safety boundaries, please contact: "
              : "यदि आपके पास इस गोपनीयता नीति या स्थान प्रसंस्करण सुरक्षा सीमाओं के बारे में कोई प्रश्न हैं, तो कृपया संपर्क करें: "}
            <strong>jaint0910@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
