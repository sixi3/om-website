import { Hero } from "@/sections/Hero";
import { WhatIsOneMoney } from "@/sections/WhatIsOneMoney";
import { UIFeatures } from "@/sections/UIFeatures";
import { Stats } from "@/sections/Stats";
import { Solutions } from "@/sections/Solutions";
import { SecurityCompliance } from "@/sections/SecurityCompliance";
import { ContactUs } from "@/sections/ContactUs";
import { Leadership } from "@/sections/Leadership";
// import { TrustedBy } from "@/sections/TrustedBy";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsOneMoney />
      <UIFeatures />
      <Stats />
      <Solutions />
      <SecurityCompliance />
      <Leadership />
      <ContactUs />
    </>
  );
}
