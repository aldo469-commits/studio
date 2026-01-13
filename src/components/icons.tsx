import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center font-headline text-2xl font-bold text-primary", className)}>
        <span>EJA GlobalTrans</span>
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center font-headline text-2xl font-bold text-white", className)}>
            <span>EJA GlobalTrans</span>
        </div>
      );
}
