import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const primaryDomain = "https://jaipurride.vercel.app";
  const currentDate = new Date();

  return [
    {
      url: `${primaryDomain}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
