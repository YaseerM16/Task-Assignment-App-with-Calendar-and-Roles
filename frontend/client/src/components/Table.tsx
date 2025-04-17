import { Eye } from 'lucide-react';
import { ReactNode } from 'react';

// Update your TableColumn interface in Table.tsx
export interface TableColumn<T> {
    header: ReactNode;
    accessor?: keyof T; // Make this optional
    cell?: (value: any, row: T) => ReactNode;
    actions?: (row: T) => ReactNode; // Add actions support
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    onView?: (item: T) => void;
    emptyState?: ReactNode;
}

export function Table<T>({ data, columns, onView }: TableProps<T>) {
    const hasActions = columns.some(col => col.actions) || onView;

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                        {hasActions && (
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-6 py-4 text-center text-sm text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {column.cell
                                            ? column.cell(item[column.accessor as keyof T], item)
                                            : String(item[column.accessor as keyof T])}
                                    </td>
                                ))}
                                {hasActions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        {columns.find(col => col.actions)?.actions?.(item)}
                                        {onView && (
                                            <button
                                                onClick={() => onView(item)}
                                                className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                                aria-label="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}