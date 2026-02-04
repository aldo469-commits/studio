import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
       <Image
        src="/LOGO.WEBP"
        alt="EJA GlobalTrans Logo"
        width={220}
        height={70}
        className="h-20 w-auto object-contain transition-transform hover:scale-105"
        priority
      />
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
      <div className={cn("flex items-center", className)}>
        <Image
          src="/LOGO.WEBP"
          alt="EJA GlobalTrans Logo"
          width={240}
          height={80}
          className="h-16 w-auto object-contain"
          priority
        />
      </div>
    );
}
