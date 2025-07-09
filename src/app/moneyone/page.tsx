import React from "react";
import { Hero } from "./sections/Hero";
import { WhatIsMoneyOne } from "./sections/WhatIsMoneyOne";
import { Solutions } from "./sections/Solutions";
import { Products } from "./sections/Products";
import { Services } from "./sections/Services";
import { ContactUs } from "./sections/ContactUs";
import { BackgroundGrid } from '@/components/ui/background-grid';

export default function MoneyOnePage() {
  return (
    <>
      <BackgroundGrid zIndex={-1} />
      <Hero />
      <WhatIsMoneyOne />
      <Services />
      <Products />
      <Solutions />
      <ContactUs />
    </>
  );
} 