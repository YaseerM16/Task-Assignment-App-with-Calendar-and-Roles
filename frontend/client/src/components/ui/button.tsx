import { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`px-4 py-2 rounded text-sm font-medium border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 ${className}`}
            {...props}
        />
    );
}
