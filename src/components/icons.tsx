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
        >
            <path d="M2 10H18V24H26V14H28V24H30V26H2C26 24 2 24 2 10Z" fill="hsl(228 64% 32%)"/>
            <path d="M20 18H14V22H20V18Z" fill="white"/>
            <path d="M4 14H10V22H4V14Z" fill="white"/>
            <path d="M22 6H28V10H22V6Z" fill="hsl(25 95% 53%)"/>
            <circle cx="6" cy="26" r="3" fill="hsl(228 64% 32%)"/>
            <circle cx="22" cy="26" r="3" fill="hsl(228 64% 32%)"/>
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
                <path d="M2 10H18V24H26V14H28V24H30V26H2C26 24 2 24 2 10Z" fill="currentColor"/>
                <path d="M20 18H14V22H20V18Z" fill="hsl(222 47% 11%)"/>
                <path d="M4 14H10V22H4V14Z" fill="hsl(222 47% 11%)"/>
                <path d="M22 6H28V10H22V6Z" fill="hsl(25 95% 53%)"/>
                <circle cx="6" cy="26" r="3" fill="currentColor"/>
                <circle cx="22" cy="26" r="3" fill="currentColor"/>
            </svg>
            <span className="font-headline font-bold text-xl text-card">
                EJA GlobalTrans
            </span>
        </div>
      );
}
