import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <Image 
            src="/LOGO.png" 
            alt="EJA GlobalTrans Logo" 
            width={40} 
            height={40} 
            className="object-contain"
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
                src="/LOGO.png" 
                alt="EJA GlobalTrans Logo" 
                width={40} 
                height={40}
                className="brightness-0 invert object-contain" 
            />
            <span className="font-headline font-bold text-xl text-primary-foreground">
                EJA GlobalTrans
            </span>
        </div>
      );
}
