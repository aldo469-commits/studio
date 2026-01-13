import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Image 
        src="/logo def.png" 
        alt="EJA GlobalTrans Logo" 
        width={140}
        height={40}
        className={cn("object-contain", className)}
        unoptimized
    />
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <Image 
            src="/logo def.png" 
            alt="EJA GlobalTrans Logo" 
            width={140}
            height={40}
            className={cn("object-contain", className)}
            unoptimized
        />
      );
}
