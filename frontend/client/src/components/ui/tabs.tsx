'use client';
import React from 'react';
import { ReactNode, useState } from 'react';

export function Tabs({ defaultValue, children }: { defaultValue: string, children: ReactNode }) {
    const [value, setValue] = useState(defaultValue);

    return (
        <div data-current-tab={value}>
            {React.Children.map(children, (child: any) =>
                child.type.name === 'TabsList' ? React.cloneElement(child, { value, setValue }) :
                    child.type.name === 'TabsContent' ? (child.props.value === value ? child : null) :
                        child
            )}
        </div>
    );
}

export function TabsList({ children, value, setValue }: any) {
    return (
        <div className="flex gap-2 mb-2">
            {React.Children.map(children, (child: any) =>
                React.cloneElement(child, { value, setValue })
            )}
        </div>
    );
}

export function TabsTrigger({ value: triggerValue, children, value, setValue }: any) {
    const isActive = value === triggerValue;
    return (
        <button
            onClick={() => setValue(triggerValue)}
            className={`px-4 py-2 rounded ${isActive ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
            {children}
        </button>
    );
}

export function TabsContent({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
