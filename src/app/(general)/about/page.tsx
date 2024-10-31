import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next App About",
  description: "Icesi Example Next App Layout General",
  keywords: ["Next.js", "TypeScript", "Tailwind CSS"],
};

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
    </div>
  );
}