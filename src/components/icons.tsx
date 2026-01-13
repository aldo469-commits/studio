import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div style={{ width: '140px', height: '40px', position: 'relative' }}>
        <Image 
            src="/LOGO.png" 
            alt="EJA GlobalTrans Logo" 
            fill
            className={cn("object-contain", className)}
            unoptimized
        />
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div style={{ width: '140px', height: '40px', position: 'relative' }}>
            <Image 
                src="/LOGO.png" 
                alt="EJA GlobalTrans Logo" 
                fill
                className={cn("object-contain", className)}
                unoptimized
            />
        </div>
      );
}
