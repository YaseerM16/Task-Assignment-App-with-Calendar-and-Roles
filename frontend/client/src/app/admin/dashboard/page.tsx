'use client';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();

    // In a real app, you'd check session/token here
    // if (!isAdmin) router.push('/admin/login');

    const handleLogout = () => {
        // Clear admin session in real implementation
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats Cards */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">24</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Active Tasks</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">156</p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900">Managers</h3>
                        <p className="mt-2 text-3xl font-bold text-indigo-600">5</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            Create Manager
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            View All Users
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                            System Settings
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}