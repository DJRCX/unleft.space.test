"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { HoverButton } from "@/components/ui/hover-button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// Full schema including optional custom-quote fields
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  "Web Development",
  "Game Development",
  "Custom Software",
  "AI / Machine Learning",
  "Mobile Application",
];
const budgets = [
  "< $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure",
];

interface ContactFormProps {
  /** When true, shows service interest and budget range fields */
  showCustomFields?: boolean;
}

export default function ContactForm({ showCustomFields: showCustomFieldsProp }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // Also detect ?mode=custom from URL
  const [showCustomFields, setShowCustomFields] = useState(showCustomFieldsProp ?? false);

  useEffect(() => {
    if (showCustomFieldsProp !== undefined) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "custom") {
      setShowCustomFields(true);
    }
  }, [showCustomFieldsProp]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-6" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-muted-foreground mb-8">
          We'll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="border-ring/20 text-foreground"
        >
          Send Another
        </Button>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-ring/50 focus:ring-1 focus:ring-ring/20 transition-all";
  const labelClasses = "block text-sm font-medium text-muted-foreground mb-1.5";
  const errorClasses = "text-xs text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>Name *</label>
          <input
            {...register("name")}
            id="name"
            className={inputClasses}
            placeholder="John Doe"
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email *</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className={inputClasses}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className={errorClasses}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClasses}>Company</label>
        <input
          {...register("company")}
          id="company"
          className={inputClasses}
          placeholder="Your company (optional)"
        />
      </div>

      {/* Conditional custom-quote fields */}
      {showCustomFields && (
        <div className="grid sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <label htmlFor="serviceInterest" className={labelClasses}>Service Interest</label>
            <select {...register("serviceInterest")} id="serviceInterest" className={inputClasses}>
              <option value="">Select a service...</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budgetRange" className={labelClasses}>Budget Range</label>
            <select {...register("budgetRange")} id="budgetRange" className={inputClasses}>
              <option value="">Select budget (optional)</option>
              {budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className={labelClasses}>Message *</label>
        <textarea
          {...register("message")}
          id="message"
          className={`${inputClasses} h-32 resize-none`}
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className={errorClasses}>{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <HoverButton
        type="submit"
        disabled={status === "submitting"}
        className="w-full h-14 border-none [--circle-start:var(--color-accent-glow)] [--circle-end:var(--color-accent-secondary)] bg-primary/10 text-white border border-ring/30 hover:bg-primary/20 shadow-[0_0_20px_var(--color-accent-primary)] font-bold tracking-wide disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </HoverButton>

      <p className="text-xs text-center text-muted-foreground">
        We reply within 24 hours. Your data is protected per our{" "}
        <a href="/legal/privacy" className="text-primary underline hover:text-white transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
