"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, HelpCircle, CheckCircle, MessageSquare, AlertTriangle, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const feedbackSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters long"),
  email: zod.string().email("Please enter a valid email address"),
  feedbackType: zod.enum(["bug", "feature", "inquiry"]),
  message: zod.string().min(10, "Message must be at least 10 characters long"),
});

type FeedbackFormValues = zod.infer<typeof feedbackSchema>;

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackType: "inquiry",
      message: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Feedback data submitted successfully:", data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* 1. TEXT INFO COL */}
      <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
        <div className="space-y-6">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight leading-tight">
            {t("contactTitle")}
          </h1>
          <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
            {t("contactSubtitle")}
          </p>
        </div>

        {/* Contact list channels */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">Email Inquiry</p>
              <a href="mailto:support@jaipurride.com" className="text-sm font-semibold text-foreground hover:text-brand-pink transition-colors">
                support@jaipurride.com
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">GitHub Project</p>
              <a
                href="https://github.com/Tusharjain-19/jaipur-ride"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:text-brand-pink transition-colors"
              >
                Tusharjain-19/jaipur-ride
              </a>
            </div>
          </div>
        </div>

        <div className="text-xs text-foreground/50">
          Our development team reviews feedback tickets within 48 business hours. Senders will receive email status alerts when tickets update.
        </div>
      </div>

      {/* 2. FORM INTERACTIVE COL */}
      <div className="lg:col-span-7">
        <div className="bg-white dark:bg-navy-dark rounded-3xl p-6 lg:p-8 border border-light-border dark:border-navy-border/40 shadow-xl shadow-slate-200/50 dark:shadow-none relative min-h-[450px]">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/60">{t("formName")}</label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 bg-light-accent dark:bg-navy-card border rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground ${
                      errors.name ? "border-red-500" : "border-light-border dark:border-navy-border/40"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/60">{t("formEmail")}</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 bg-light-accent dark:bg-navy-card border rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground ${
                      errors.email ? "border-red-500" : "border-light-border dark:border-navy-border/40"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>
                  )}
                </div>

                {/* Feedback Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/60">{t("formType")}</label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value="inquiry"
                        {...register("feedbackType")}
                        className="peer sr-only"
                      />
                      <span className="flex flex-col items-center justify-center p-3 rounded-xl border border-light-border dark:border-navy-border/40 bg-light-accent dark:bg-navy-card peer-checked:border-brand-pink peer-checked:bg-brand-pink/15 peer-checked:text-brand-pink transition-all text-xs font-semibold">
                        <MessageSquare className="w-4 h-4 mb-1" />
                        <span>Inquiry</span>
                      </span>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value="bug"
                        {...register("feedbackType")}
                        className="peer sr-only"
                      />
                      <span className="flex flex-col items-center justify-center p-3 rounded-xl border border-light-border dark:border-navy-border/40 bg-light-accent dark:bg-navy-card peer-checked:border-brand-pink peer-checked:bg-brand-pink/15 peer-checked:text-brand-pink transition-all text-xs font-semibold">
                        <AlertTriangle className="w-4 h-4 mb-1" />
                        <span>Bug Report</span>
                      </span>
                    </label>

                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value="feature"
                        {...register("feedbackType")}
                        className="peer sr-only"
                      />
                      <span className="flex flex-col items-center justify-center p-3 rounded-xl border border-light-border dark:border-navy-border/40 bg-light-accent dark:bg-navy-card peer-checked:border-brand-pink peer-checked:bg-brand-pink/15 peer-checked:text-brand-pink transition-all text-xs font-semibold">
                        <Lightbulb className="w-4 h-4 mb-1" />
                        <span>Feature Request</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground/60">{t("formMessage")}</label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Provide detailed description of your ticket..."
                    className={`w-full px-4 py-3 bg-light-accent dark:bg-navy-card border rounded-xl text-sm focus:outline-none focus:border-brand-pink transition-colors text-foreground ${
                      errors.message ? "border-red-500" : "border-light-border dark:border-navy-border/40"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 font-bold">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-xl text-sm font-bold shadow-md shadow-brand-pink/20 hover:scale-[1.02] disabled:opacity-75 disabled:pointer-events-none transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                  ) : (
                    <span>{t("btnSubmit")}</span>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">
                    {t("formSubmitSuccess")}
                  </h3>
                  <p className="text-sm text-foreground/60 max-w-sm">
                    We have successfully queued your ticket. A confirmation email has been dispatched to your address.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-light-accent hover:bg-light-border dark:bg-navy-accent/40 dark:hover:bg-navy-accent text-foreground rounded-xl text-xs font-bold transition-all border border-light-border dark:border-navy-border/40"
                >
                  Submit Another Feedback Ticket
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
