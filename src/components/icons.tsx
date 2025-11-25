import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      className={cn("h-auto", className)}
    >
      <title>EJA GlobalTrans Logo</title>
      <g>
        <text
          x="0"
          y="35"
          fontFamily="var(--font-headline), Space Grotesk, sans-serif"
          fontSize="36"
          fontWeight="bold"
          fill="hsl(var(--primary))"
          className="dark:fill-hsl(var(--primary-foreground))"
        >
          EJA
        </text>
        <text
          x="75"
          y="35"
          fontFamily="var(--font-headline), Space Grotesk, sans-serif"
          fontSize="36"
          fontWeight="normal"
          fill="hsl(var(--foreground))"
           className="dark:fill-hsl(var(--foreground))"
        >
          GlobalTrans
        </text>
        <path
          d="M 0 45 L 200 45"
          stroke="hsl(var(--accent))"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
