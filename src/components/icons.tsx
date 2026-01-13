import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
        <Image 
            src="/LOGO.png" 
            alt="EJA GlobalTrans Logo" 
            width={140} 
            height={40} 
            className="object-contain"
        />
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center", className)}>
             <Image 
                src="/LOGO.png" 
                alt="EJA GlobalTrans Logo" 
                width={140} 
                height={40}
                className="object-contain"
            />
        </div>
      );
}
