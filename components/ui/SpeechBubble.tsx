import { cn } from "@/lib/utils";

interface SpeechBubbleProps {
  message: string;
  variant?: "user" | "system";
  className?: string;
}

export function SpeechBubble({ message, variant = "system", className }: SpeechBubbleProps) {
  const isUser = variant === "user";

  return (
    <div
      className={cn(
        "relative max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
        isUser
          ? "bg-primary text-white rounded-tr-sm ml-auto"
          : "bg-white text-slate-700 rounded-tl-sm border border-slate-200",
        className
      )}
    >
      <p>{message}</p>
      
      {/* Optional: Add a subtle timestamp or status icon here later */}
    </div>
  );
}
