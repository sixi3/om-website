"use client";

import React from "react";
import { Button } from "@/app/onemoney/components/ui/button";
import { Input } from "@/app/onemoney/components/ui/input";
import { Textarea } from "@/app/onemoney/components/ui/textarea";
import { Label } from "@/app/onemoney/components/ui/label";

export function TalkToUsForm() {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">Contact MoneyOne</h3>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your.email@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="How can we help you?" rows={3} />
        </div>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </div>
  );
} 