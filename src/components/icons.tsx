import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 w-40", className)}>
      <Image
        src="/logo.png"
        alt="EJA GlobalTrans Logo"
        fill
        sizes="160px"
        className="object-contain"
        priority
      />
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 w-40", className)} style={{ filter: 'brightness(0) invert(1)' }}>
      <Image
        src="/logo.png"
        alt="EJA GlobalTrans Logo"
        fill
        sizes="160px"
        className="object-contain"
        priority
      />
    </div>
  );
}