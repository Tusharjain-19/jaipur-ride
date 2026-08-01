import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Timings | First & Last Train Schedule Today",
  description: "Check daily operational timings for Jaipur Metro Pink Line (Mansarovar to Badi Chaupar). First train dispatches at 06:20 AM and last train at 09:20 PM. Peak frequency every 10 minutes.",
  keywords: [
    "jaipur metro timings",
    "jaipur metro first and last train timing",
    "jaipur metro timetable today",
    "mansarovar metro timing",
    "badi chaupar metro timing",
    "jaipur metro sunday train schedule"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/timings",
  },
  openGraph: {
    title: "Jaipur Metro First & Last Train Timings",
    description: "Complete daily train timetable and frequency schedules for Jaipur Metro Pink Line.",
    url: "https://jaipurride.vercel.app/timings",
  },
};

export default function TimingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
