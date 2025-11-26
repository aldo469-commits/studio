import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
        >
            <path d="M10 28V4H14V16H22V4H26V28H22V20H14V28H10Z" fill="hsl(228 64% 32%)" />
            <path d="M4 4H8V8H4V4Z" fill="hsl(25 95% 53%)" />
        </svg>
        <span className="font-headline font-bold text-xl text-foreground">
            EJA GlobalTrans
        </span>
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
            >
                <path d="M10 28V4H14V16H22V4H26V28H22V20H14V28H10Z" fill="currentColor" />
                <path d="M4 4H8V8H4V4Z" fill="hsl(25 95% 53%)" />
            </svg>
            <span className="font-headline font-bold text-xl text-card">
                EJA GlobalTrans
            </span>
        </div>
      );
}
