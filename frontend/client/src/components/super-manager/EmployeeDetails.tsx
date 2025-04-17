// components/EmployeeDetailModal.tsx
'use client';
import {
    X,
    Mail,
    Phone,
    User,
    Shield,
    UserCheck,
    ArrowUpDown,
    Calendar,
    ChevronUp,
    Users
} from 'lucide-react';

type Employee = {
    _id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    department?: string;
    joinDate?: string;
};

export default function EmployeeDetailModal({
    employee,
    onClose,
    onPromote,
    onAssignManager,
}: {
    employee: Employee;
    onClose: () => void;
    onPromote: () => void;
    onAssignManager: () => void;
}) {
    const getRoleBadge = () => {
        let badgeClass = "";
        let icon = <User className="w-3 h-3 mr-1" />;

        switch (employee.role) {
            case 'manager':
                badgeClass = "bg-blue-100 text-blue-800";
                icon = <Shield className="w-3 h-3 mr-1" />;
                break;
            case 'supermanager':
                badgeClass = "bg-purple-100 text-purple-800";
                icon = <Users className="w-3 h-3 mr-1" />;
                break;
            default:
                badgeClass = "bg-green-100 text-green-800";
        }

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
                {icon}
                {employee.role === 'supermanager' ? 'Super Manager' : employee.role}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
                {/* Header */}
                <div className="flex justify-between items-start p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{employee.username}</h2>
                            <div className="mt-1">{getRoleBadge()}</div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Mail className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{employee.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Phone className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{employee.phone || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>

                    {employee.department && (
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <ArrowUpDown className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Department</p>
                                <p className="font-medium">{employee.department}</p>
                            </div>
                        </div>
                    )}

                    {employee.joinDate && (
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Join Date</p>
                                <p className="font-medium">
                                    {new Date(employee.joinDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Footer Actions */}
                <div className="p-4 flex flex-wrap justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onAssignManager}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <UserCheck className="w-4 h-4" />
                        Assign Manager
                    </button>
                    {employee.role !== 'supermanager' && (
                        <button
                            onClick={onPromote}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        >
                            <ChevronUp className="w-4 h-4" />
                            {employee.role === 'employee' ? 'Promote to Manager' : 'Promote to Super Manager'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}