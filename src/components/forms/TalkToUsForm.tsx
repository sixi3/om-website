"use client";
import React, { useState, FormEvent } from "react";
import { Label } from "@/components/ui/label"; // Aceternity Label
import { Input } from "@/components/ui/input"; // Aceternity Input
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Button } from "@/components/ui/button"; // Shadcn Button
import { cn } from "@/lib/utils";

export function TalkToUsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    comments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add actual submission logic here (e.g., API call)
    alert("Form submitted! Check the console for data.");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" placeholder="Rakhesh" type="text" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" placeholder="Sharma" type="text" value={formData.lastName} onChange={handleChange} required />
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="email">Work Email</Label>
        <Input id="email" placeholder="rakhesh@work.in" type="email" value={formData.email} onChange={handleChange} required />
      </div>
       <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" placeholder="+91 90100 98899" type="tel" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="comments">Additional Comments</Label>
        <Textarea
          id="comments"
          placeholder="Let us know how we can help you..."
          value={formData.comments}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#00b140] to-[#002E11] text-white">
        Submit Request
      </Button>
    </form>
  );
}

// Helper component for bottom gradient (optional, can be added later)
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Helper component for label container (optional, can be added later)
const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
}; 