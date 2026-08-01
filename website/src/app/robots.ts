import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/private/", "/admin/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot-Extended",
          "CCBot",
          "Bytespider"
        ],
        allow: "/",
      },
    ],
    sitemap: [
      "https://jaipurride.vercel.app/sitemap.xml",
      "https://jaipurmetro.xyz/sitemap.xml"
    ],
    host: "https://jaipurride.vercel.app",
  };
}
