import React from "react";
import { Metadata } from "next";
import JourneyPlannerClient from "./JourneyPlannerClient";

export const metadata: Metadata = {
  title: "Jaipur Metro Route Planner & Journey Tracker",
  description: "Plan your trip on the Jaipur Metro Pink Line. Calculate travel times, ticket pricing, platform directions, and track stations from Mansarovar to Badi Chaupar online.",
  keywords: [
    "jaipur metro route planner",
    "jaipur metro journey planner",
    "jaipur metro route tracker",
    "jaipur metro track train",
    "jaipur metro map route"
  ]
};

export default function JourneyPlannerPage() {
  return <JourneyPlannerClient />;
}
