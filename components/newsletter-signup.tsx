"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/app/actions/contact";
import { useFormStatus } from "react-dom";
import { Loader2, CheckCircle, Mail } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-primary/90"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
    </Button>
  );
}

export function NewsletterSignup() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);

    const result = await subscribeNewsletter(formData);

    if (result.success) {
      setSuccess(true);
      const form = document.getElementById(
        "newsletter-form"
      ) as HTMLFormElement;
      form?.reset();
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold">Stay Updated</h3>
          <p className="text-slate-300 text-sm">
            Get the latest insights on sustainable architecture
          </p>
        </div>
      </div>

      {success ? (
        <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <p className="text-sm font-medium">Successfully subscribed!</p>
        </div>
      ) : (
        <form id="newsletter-form" action={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
            <SubmitButton />
          </div>

          <p className="text-xs text-slate-400">
            By subscribing, you agree to receive updates from ArchiDius.
            Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}
