import Image from "next/image";
import { Hero } from "@/sections/Hero";
import { Stats } from "@/sections/Stats";
import { SecurityCompliance } from "@/sections/SecurityCompliance";
import { Leadership } from "@/sections/Leadership";
// import { TrustedBy } from "@/sections/TrustedBy";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <SecurityCompliance />
      <Leadership />
      {/* <TrustedBy /> */}
      <div className="container py-10">
        <h2>More Sections Coming Soon...</h2>
      </div>
    </>
  );
}
