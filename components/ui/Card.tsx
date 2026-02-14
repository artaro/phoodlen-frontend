import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-active",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
