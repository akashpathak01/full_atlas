import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-indigo-200/50 p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardContent({ className, children, ...props }) {
    return (
        <div className={cn("p-6", className)} {...props}>
            {children}
        </div>
    );
}
