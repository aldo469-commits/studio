
import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
       <Image
        src="/logo.png"
        alt="EJA GlobalTrans Logo"
        width={120}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
      <div className={cn("flex items-center", className)}>
        <Image
          src="/logo.png"
          alt="EJA GlobalTrans Logo"
          width={180}
          height={60}
          className="h-12 w-auto object-contain"
          priority
        />
      </div>
    );
}
