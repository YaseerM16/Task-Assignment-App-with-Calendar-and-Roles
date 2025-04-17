'use client';
import { UserCheck } from 'lucide-react';

interface AssignManagerToolProps {
    users: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
    }>;
    assignmentData: {
        employeeId: string;
        managerId: string;
    };
    setAssignmentData: (data: any) => void;
    handleAssignManager: () => void;
}

export default function AssignManagerTool({
    users,
    assignmentData,
    setAssignmentData,
    handleAssignManager
}: AssignManagerToolProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold">Assign Manager</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label>
                    <select
                        value={assignmentData.employeeId}
                        onChange={(e) => setAssignmentData({ ...assignmentData, employeeId: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select employee</option>
                        {users.filter(u => u.role === 'employee').map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Manager</label>
                    <select
                        value={assignmentData.managerId}
                        onChange={(e) => setAssignmentData({ ...assignmentData, managerId: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select manager</option>
                        {users.filter(u => u.role === 'manager').map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleAssignManager}
                    disabled={!assignmentData.employeeId || !assignmentData.managerId}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium disabled:bg-indigo-300"
                >
                    Assign Manager
                </button>
            </div>
        </div>
    );
}