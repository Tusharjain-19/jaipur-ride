import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/private/", "/admin/"],
      },
    ],
    sitemap: "https://jaipurride.vercel.app/sitemap.xml",
    host: "https://jaipurride.vercel.app",
  };
}

