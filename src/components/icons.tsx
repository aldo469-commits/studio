import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Image 
            src="/LOGO" 
            alt="EJA GlobalTrans Logo" 
            width={40} 
            height={40} 
        />
        <span className="font-headline font-bold text-xl text-foreground">
            EJA GlobalTrans
        </span>
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
             <Image 
                src="/LOGO" 
                alt="EJA GlobalTrans Logo" 
                width={40} 
                height={40}
                className="brightness-0 invert" 
            />
            <span className="font-headline font-bold text-xl text-card">
                EJA GlobalTrans
            </span>
        </div>
      );
}