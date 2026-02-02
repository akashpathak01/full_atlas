import React from 'react';
import { cn } from '../../lib/utils';

export function Button({ className, variant = "primary", size = "default", children, ...props }) {
    const variants = {
        primary: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/35 hover:scale-105",
        secondary: "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:scale-105",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
        link: "text-indigo-600 hover:text-indigo-700 underline-offset-4 hover:underline p-0 h-auto font-normal",
    };

    const sizes = {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 text-lg",
        icon: "h-10 w-10 p-2 flex items-center justify-center",
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
