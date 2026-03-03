"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select a service"),
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

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return; // Spam trap
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
        <h3 className="text-2xl font-bold text-[#E5E7EB] mb-2">
          Message Sent!
        </h3>
        <p className="text-[#9CA3AF] mb-8">
          We'll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="border-[#C084FC]/20 text-[#E5E7EB]"
        >
          Send Another
        </Button>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-[#0A0A0F] border border-[#2D2D44] rounded-lg px-4 py-3 text-[#E5E7EB] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#C084FC]/50 focus:ring-1 focus:ring-[#C084FC]/20 transition-all";
  const labelClasses = "block text-sm font-medium text-[#9CA3AF] mb-1.5";
  const errorClasses = "text-xs text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Name *</label>
          <input
            {...register("name")}
            className={inputClasses}
            placeholder="John Doe"
          />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClasses}>Email *</label>
          <input
            {...register("email")}
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
        <label className={labelClasses}>Company</label>
        <input
          {...register("company")}
          className={inputClasses}
          placeholder="Your company (optional)"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Service Interest *</label>
          <select {...register("serviceInterest")} className={inputClasses}>
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.serviceInterest && (
            <p className={errorClasses}>{errors.serviceInterest.message}</p>
          )}
        </div>
        <div>
          <label className={labelClasses}>Budget Range</label>
          <select {...register("budgetRange")} className={inputClasses}>
            <option value="">Select budget (optional)</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Message *</label>
        <textarea
          {...register("message")}
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

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full h-14 border-none bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] text-white font-bold tracking-wide disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-xs text-center text-[#9CA3AF]/60">
        We reply within 24 hours. Your data is protected per our{" "}
        <a href="/legal/privacy" className="text-[#C084FC] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
