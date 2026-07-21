import type { Metadata } from "next";
import { DockHome } from "./b/DockHome";

export const metadata: Metadata = {
  title: "Dian Lee · Senior Product Designer",
  description:
    "Senior product designer working across fintech, data, and AI. A dock of selected work.",
};

export default function Home() {
  return <DockHome />;
}
