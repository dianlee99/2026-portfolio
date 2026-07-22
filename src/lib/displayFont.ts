import { Bricolage_Grotesque } from "next/font/google";

/**
 * Shared display face — the bold, expressive grotesque used for the homepage
 * greeting and the case-study display headings. Body copy stays Manrope.
 */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});
