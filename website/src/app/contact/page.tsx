"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, HelpCircle, CheckCircle, MessageSquare, AlertTriangle, Lightbulb, Globe } from "lucide-react";
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
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);
    try {
      const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeOctJoiOgVLzt18pNkMihlSjO1BxUKsq40Nqxsr6zc-QOvlg/formResponse";
      const formData = new URLSearchParams();
      
      // Google Form Entry IDs extracted from forms.gle/yRXyMuhEdd8G8KVH8
      formData.append("entry.1365438817", data.name);
      formData.append("entry.2038720898", data.email);
      
      let mappedType = "Inquiry";
      if (data.feedbackType === "bug") mappedType = "Bug Report";
      if (data.feedbackType === "feature") mappedType = "Feature Request";
      formData.append("entry.1323163345", mappedType);
      
      formData.append("entry.278843534", data.message);

      // no-cors is used because Google Form formResponse does not support CORS requests.
      // Opaque response status 0 is expected and handled as a success.
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error("Form submission failed:", err);
      setSubmitError("Failed to submit feedback. Please check your connection and try again.");
    }
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
          {/* Website Contact */}
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">Contact Website</p>
              <a href="https://tusharjain.in/contact" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-brand-pink transition-colors">
                tusharjain.in/contact
              </a>
            </div>
          </div>

          {/* Email Inquiry */}
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-navy-dark border border-light-border dark:border-navy-border/40 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center text-brand-pink shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">Email Inquiry</p>
              <a href="mailto:jaint0910@gmail.com" className="text-sm font-semibold text-foreground hover:text-brand-pink transition-colors">
                jaint0910@gmail.com
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

                {submitError && (
                  <p className="text-xs text-red-500 font-bold text-center">{submitError}</p>
                )}

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
