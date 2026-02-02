import React from 'react';
import { cn } from '../../lib/utils';

const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-green-100 text-green-800", // Delivered, Online
    warning: "bg-yellow-100 text-yellow-800", // Pending, Warning
    danger: "bg-red-100 text-red-800", // Cancelled, Offline
    info: "bg-blue-100 text-blue-800", // Processing
    primary: "bg-violet-100 text-violet-800",
};

export function Badge({ variant = "default", className, children, ...props }) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
