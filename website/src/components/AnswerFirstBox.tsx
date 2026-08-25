import React from "react";
import { Info } from "lucide-react";

interface AnswerFirstBoxProps {
  title?: string;
  content: string;
  highlightText?: string;
}

export default function AnswerFirstBox({
  title = "Quick Answer",
  content,
  highlightText,
}: AnswerFirstBoxProps) {
  return (
    <div className="bg-brand-pink/5 dark:bg-navy-card border border-brand-pink/20 rounded-2xl p-4 sm:p-5 my-6 relative overflow-hidden">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-brand-pink text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm font-sans leading-relaxed text-foreground">
          <p className="font-heading font-extrabold text-brand-pink text-xs uppercase tracking-wider">
            {title}
          </p>
          <p className="text-foreground/90">
            {content}{" "}
            {highlightText && (
              <span className="font-semibold text-brand-pink">{highlightText}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
