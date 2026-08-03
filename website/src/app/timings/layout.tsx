import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur Metro Timings Today | First & Last Train Time Table",
  description: "Check daily operational timings today for Jaipur Metro Pink Line (Mansarovar to Badi Chaupar). First train starts at 05:50 AM from Mansarovar and 06:20 AM from Badi Chaupar. Last train dispatches at 10:50 PM / 11:20 PM. Headway frequency 6 to 10 minutes.",
  keywords: [
    "jaipur metro timing today",
    "jaipur metro timing",
    "jaipur metro time table",
    "metro time table jaipur",
    "jaipur metro starting time",
    "jaipur metro timings",
    "jaipur metro first and last train timing",
    "mansarovar metro timing",
    "badi chaupar metro timing",
    "sindhi camp metro timing",
    "jaipur metro sunday train schedule"
  ],
  alternates: {
    canonical: "https://jaipurride.vercel.app/timings",
  },
  openGraph: {
    title: "Jaipur Metro First & Last Train Timings Today",
    description: "Complete daily train timetable, starting time (05:50 AM), and frequency schedules for Jaipur Metro Pink Line.",
    url: "https://jaipurride.vercel.app/timings",
  },
};

export default function TimingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
