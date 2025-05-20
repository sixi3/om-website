'use client';

import React from 'react';
import {
  Accordion as ShadcnAccordion,
  AccordionContent as ShadcnAccordionContent,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface CustomAccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface CustomAccordionProps {
  items: CustomAccordionItemProps[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const CustomAccordion = ({
  items,
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: CustomAccordionProps) => {
  const commonAccordionProps = {
    className: cn("w-full -space-y-px", className),
  };

  const specificAccordionProps = type === "single"
    ? {
        type: "single" as const,
        collapsible: collapsible,
        defaultValue: typeof defaultValue === 'string' ? defaultValue : undefined,
      }
    : {
        type: "multiple" as const,
        defaultValue: Array.isArray(defaultValue) ? defaultValue : undefined,
      };

  return (
    <ShadcnAccordion {...commonAccordionProps} {...specificAccordionProps}>
      {items.map((item) => (
        <ShadcnAccordionItem
          value={item.id}
          key={item.id}
          className={cn(
            "bg-background/10 backdrop-blur-md has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative border px-4 py-1 outline-none first:rounded-t-md last:rounded-b-md last:border-b has-focus-visible:z-10 has-focus-visible:ring-[3px]",
            itemClassName
          )}
        >
          <ShadcnAccordionTrigger
            className={cn(
              "justify-start gap-3 rounded-md py-2 text-[15px] leading-6 outline-none hover:no-underline focus-visible:ring-0 [&>svg]:-order-1",
              triggerClassName
            )}
          >
            {item.title}
          </ShadcnAccordionTrigger>
          <ShadcnAccordionContent
            className={cn("text-muted-foreground ps-7 pb-2", contentClassName)}
          >
            {item.content}
          </ShadcnAccordionContent>
        </ShadcnAccordionItem>
      ))}
    </ShadcnAccordion>
  );
};