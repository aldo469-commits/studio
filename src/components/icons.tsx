import { cn } from "@/lib/utils";
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
       <Image
        src="/Gemini_Generated_Image_vhgd4svhgd4svhgd.png"
        alt="EJA GlobalTrans Logo"
        width={140}
        height={40}
        priority
      />
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
      <div className={cn("flex items-center", className)}>
        <Image
          src="/Gemini_Generated_Image_vhgd4svhgd4svhgd.png"
          alt="EJA GlobalTrans Logo"
          width={140}
          height={40}
          priority
        />
      </div>
    );
}
