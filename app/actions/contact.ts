"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const project_type = formData.get("project_type") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const supabase = await getSupabaseServerClient();

    const { error } = await supabase.from("contact_inquiries").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      project_type: project_type || null,
      message,
    });

    if (error) {
      console.error("[v0] Contact form error:", error);
      return {
        success: false,
        error: "Failed to submit form. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[v0] Contact form exception:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function subscribeNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string;

    if (!email) {
      return { success: false, error: "Please enter your email address." };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    const supabase = await getSupabaseServerClient();

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
    });

    if (error) {
      // Check if email already exists
      if (error.code === "23505") {
        return { success: false, error: "This email is already subscribed." };
      }
      console.error("[v0] Newsletter subscription error:", error);
      return {
        success: false,
        error: "Failed to subscribe. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[v0] Newsletter subscription exception:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
