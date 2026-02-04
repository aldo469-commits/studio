import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
       <Image
        src="/LOGO.WEBP"
        alt="EJA GlobalTrans Logo"
        width={160}
        height={45}
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
          src="/LOGO.WEBP"
          alt="EJA GlobalTrans Logo"
          width={200}
          height={60}
          className="h-12 w-auto object-contain"
          priority
        />
      </div>
    );
}