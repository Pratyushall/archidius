"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContactForm } from "@/app/actions/contact";
import { useFormStatus } from "react-dom";
import { Loader2, CheckCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/90"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSuccess(true);
      // Reset form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
          <CheckCircle className="w-5 h-5" />
          <p className="text-sm font-medium">
            Thank you! We'll get back to you soon.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" required placeholder="Your Name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 9887 654 234"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="Your Company" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project_type">Project Type</Label>
        <Select name="project_type">
          <SelectTrigger>
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential Design</SelectItem>
            <SelectItem value="commercial">Commercial Project</SelectItem>
            <SelectItem value="urban">Urban Planning</SelectItem>
            <SelectItem value="consulting">
              Sustainability Consulting
            </SelectItem>
            <SelectItem value="miniature">Miniature Models</SelectItem>
            <SelectItem value="research">Research Partnership</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your project..."
          rows={6}
          className="resize-none"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
