import { Eye } from 'lucide-react';
import { ReactNode } from 'react';

export interface TableColumn<T> {
    header: ReactNode;
    accessor: keyof T;
    cell?: (value: any, row: T) => ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    onView?: (item: T) => void;
    emptyState?: ReactNode;
}

export function Table<T>({ data, columns, onView }: TableProps<T>) {
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
                        {onView && (
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
                            <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-sm text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {column.cell
                                            ? column.cell(item[column.accessor], item)
                                            : String(item[column.accessor])}
                                    </td>
                                ))}
                                {onView && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="relative inline-block group">
                                            <button
                                                onClick={() => onView(item)}
                                                className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                                aria-label="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <span className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded whitespace-nowrap">
                                                View
                                            </span>
                                        </div>
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
