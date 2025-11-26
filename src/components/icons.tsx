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
            <path d="M4 26H28" stroke="hsl(228 64% 32%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 12H19C18.4477 12 18 12.4477 18 13V22C18 22.5523 18.4477 23 19 23H25C25.5523 23 26 22.5523 26 22V13C26 12.4477 25.5523 12 25 12Z" fill="hsl(228 64% 32%)"/>
            <path d="M18 13V23H7C6.44772 23 6 22.5523 6 22V10C6 9.44772 6.44772 9 7 9H12C12.5523 9 13 9.44772 13 10V12" stroke="hsl(228 64% 32%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 6H15C15.5523 6 16 6.44772 16 7V9H13" stroke="hsl(25 95% 53%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="10" cy="26" r="3" fill="hsl(228 64% 32%)" stroke="hsl(210 25% 98%)" strokeWidth="2"/>
            <circle cx="22" cy="26" r="3" fill="hsl(228 64% 32%)" stroke="hsl(210 25% 98%)" strokeWidth="2"/>
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
                <path d="M4 26H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 12H19C18.4477 12 18 12.4477 18 13V22C18 22.5523 18.4477 23 19 23H25C25.5523 23 26 22.5523 26 22V13C26 12.4477 25.5523 12 25 12Z" fill="currentColor"/>
                <path d="M18 13V23H7C6.44772 23 6 22.5523 6 22V10C6 9.44772 6.44772 9 7 9H12C12.5523 9 13 9.44772 13 10V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 6H15C15.5523 6 16 6.44772 16 7V9H13" stroke="hsl(25 95% 53%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="26" r="3" fill="currentColor" stroke="hsl(222 47% 11%)" strokeWidth="2"/>
                <circle cx="22" cy="26" r="3" fill="currentColor" stroke="hsl(222 47% 11%)" strokeWidth="2"/>
            </svg>
            <span className="font-headline font-bold text-xl text-card">
                EJA GlobalTrans
            </span>
        </div>
      );
}
