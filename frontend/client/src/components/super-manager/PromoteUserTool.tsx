'use client';
import { Shield } from 'lucide-react';

interface PromoteUserToolProps {
    users: Array<{
        id: number;
        name: string;
        email: string;
        role: string;
    }>;
    promotionData: {
        userId: string;
        newRole: string;
    };
    setPromotionData: (data: any) => void;
    handlePromoteUser: () => void;
}

export default function PromoteUserTool({
    users,
    promotionData,
    setPromotionData,
    handlePromoteUser
}: PromoteUserToolProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-semibold">Promote to Manager</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label>
                    <select
                        value={promotionData.userId}
                        onChange={(e) => setPromotionData({ ...promotionData, userId: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select user</option>
                        {users.filter(u => u.role === 'employee').map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Role</label>
                    <select
                        value={promotionData.newRole}
                        onChange={(e) => setPromotionData({ ...promotionData, newRole: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="manager">Manager</option>
                        <option value="admin">System Admin</option>
                    </select>
                </div>

                <button
                    onClick={handlePromoteUser}
                    disabled={!promotionData.userId}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium disabled:bg-indigo-300"
                >
                    Promote User
                </button>
            </div>
        </div>
    );
}