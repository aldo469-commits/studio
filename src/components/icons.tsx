import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <svg
            width="40"
            height="40"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
        >
            <path d="M80 150C118.66 150 150 118.66 150 80C150 41.3401 118.66 10 80 10C41.3401 10 10 41.3401 10 80C10 118.66 41.3401 150 80 150Z" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M118 104V88C118 85.79 116.21 84 114 84H88.0001C84 84 82.0001 88 82.0001 90V104" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M68 104H48C45.79 104 44 102.21 44 100V66C44 63.79 45.79 62 48 62H92C94.21 62 96 63.79 96 66V74" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M62 84H76" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M68 62V54" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M118 104C122.418 104 126 107.582 126 112C126 116.418 122.418 120 118 120C113.582 120 110 116.418 110 112C110 107.582 113.582 104 118 104Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M68 104C72.4183 104 76 107.582 76 112C76 116.418 72.4183 120 68 120C63.5817 120 60 116.418 60 112C60 107.582 63.5817 104 68 104Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M96 74H114C116.21 74 118 75.79 118 78V88" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M38 84H44" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-headline font-bold text-xl text-foreground">
            EJA GlobalTrans
        </span>
    </div>
  );
}

export function FooterLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <svg
                width="40"
                height="40"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent"
            >
                <path d="M80 150C118.66 150 150 118.66 150 80C150 41.3401 118.66 10 80 10C41.3401 10 10 41.3401 10 80C10 118.66 41.3401 150 80 150Z" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M118 104V88C118 85.79 116.21 84 114 84H88.0001C84 84 82.0001 88 82.0001 90V104" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M68 104H48C45.79 104 44 102.21 44 100V66C44 63.79 45.79 62 48 62H92C94.21 62 96 63.79 96 66V74" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M62 84H76" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M68 62V54" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M118 104C122.418 104 126 107.582 126 112C126 116.418 122.418 120 118 120C113.582 120 110 116.418 110 112C110 107.582 113.582 104 118 104Z" fill="currentColor" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M68 104C72.4183 104 76 107.582 76 112C76 116.418 72.4183 120 68 120C63.5817 120 60 116.418 60 112C60 107.582 63.5817 104 68 104Z" fill="currentColor" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M96 74H114C116.21 74 118 75.79 118 78V88" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M38 84H44" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-headline font-bold text-xl text-card">
                EJA GlobalTrans
            </span>
        </div>
      );
}
