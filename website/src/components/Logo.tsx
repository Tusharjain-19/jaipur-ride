"use client";

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300 hover:scale-105`}
    >
      <defs>
        <linearGradient id="logoPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#b4136d" />
        </linearGradient>
        <linearGradient id="logoRailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffb0cd" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      
      {/* Outer Rajput Arch Border Silhouette */}
      <path
        d="M 50 10 C 32 10 18 24 18 42 C 18 57 24 72 50 90 C 76 72 82 57 82 42 C 82 24 68 10 50 10 Z"
        fill="url(#logoPinkGrad)"
        opacity="0.12"
      />
      
      {/* Rajput Arch outline window */}
      <path
        d="M 50 18 C 42 18 34 23 34 36 C 34 47 38 52 50 78 C 62 52 66 47 66 36 C 66 23 58 18 50 18 Z"
        stroke="url(#logoPinkGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Dynamic rail tracks moving out from the arch */}
      <path
        d="M 28 88 L 44 68"
        stroke="url(#logoRailGrad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 72 88 L 56 68"
        stroke="url(#logoRailGrad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 33 80 L 67 80"
        stroke="url(#logoRailGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 40 72 L 60 72"
        stroke="url(#logoRailGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Sleek Bullet Train Body */}
      <rect
        x="42"
        y="50"
        width="16"
        height="18"
        rx="4"
        fill="#ffffff"
        stroke="url(#logoPinkGrad)"
        strokeWidth="2.5"
        className="dark:fill-[#1e293b]"
      />
      
      {/* Train Windshield */}
      <path
        d="M 45 53 H 55 V 59 C 55 60.5 54 61.5 52.5 61.5 H 47.5 C 46 61.5 45 60.5 45 59 V 53 Z"
        fill="#0d1324"
      />
      
      {/* Sleek Train Stripe */}
      <rect x="42" y="64" width="16" height="2.5" fill="url(#logoPinkGrad)" />
      
      {/* Headlights */}
      <circle cx="46" cy="65.5" r="1.2" fill="#fbbf24" />
      <circle cx="54" cy="65.5" r="1.2" fill="#fbbf24" />
    </svg>
  );
}
