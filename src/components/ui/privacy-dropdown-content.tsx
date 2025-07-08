"use client";

import React from "react";
import Link from "next/link";
import { Shield, FileText, Lock, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const PrivacyDropdownContent = () => {
  const privacyLinks = [
    {
      title: "Privacy Policy",
      href: "/onemoney/policies",
      icon: <Shield className="w-5 h-5" />,
      description: "How we collect, use, and protect your data"
    },
    {
      title: "Terms of Use", 
      href: "/onemoney/policies",
      icon: <FileText className="w-5 h-5" />,
      description: "Legal terms governing your use of OneMoney"
    },
    {
      title: "Compliance",
      href: "/onemoney/compliance",
      icon: <Lock className="w-5 h-5" />,
      description: "Our regulatory compliance and governance"
    },
    {
      title: "Data Security",
      href: "/onemoney/policies",
      icon: <UserCheck className="w-5 h-5" />,
      description: "Security measures protecting your information"
    }
  ];

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Privacy & Legal
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Your privacy and data security are our top priorities. Learn about our policies and compliance standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {privacyLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "group flex items-start gap-3 p-4 rounded-lg border border-border/50",
              "bg-background/50 hover:bg-muted/50 transition-all duration-200",
              "hover:border-[#00b140]/30 hover:shadow-sm"
            )}
          >
            <div className="flex-shrink-0 p-2 rounded-md bg-[#00b140]/10 text-[#00b140] group-hover:bg-[#00b140]/20 transition-colors">
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground group-hover:text-[#00b140] transition-colors mb-1">
                {link.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#00b140] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">
              RBI Licensed Account Aggregator
            </h4>
            <p className="text-sm text-muted-foreground">
              OneMoney is fully compliant with RBI regulations and follows the highest standards of data protection and financial security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PrivacyDropdownContent }; 