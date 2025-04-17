import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
    return <div className="bg-white shadow rounded-lg">{children}</div>;
}

export function CardHeader({ children, className }: { children: ReactNode, className?: string }) {
    return <div className={`p-4 border-b ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
    return <div className="p-4">{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode, className?: string }) {
    return <h3 className={`font-bold text-lg ${className}`}>{children}</h3>;
}
