'use client';
import {
    ClipboardList,
    CheckCircle2,
    AlertCircle,
    Clock,
    TrendingUp,
    LayoutDashboard,
    Users,
    Settings
} from 'lucide-react';
import { Task, TaskStats } from '@/utils/task.types';
import { useState } from 'react';
import { TaskManagement } from '@/components/manager/TaskManagement';
// const TaskStatus = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'OVERDUE']


export default function ManagerDashboard() {
    // Sample data - replace with your actual data fetching
    const tasks: Task[] = [
        {
            id: '1',
            title: 'Complete project proposal',
            status: 'OVERDUE',
            priority: 'HIGH',
            dueDate: new Date('2023-12-15'),
            createdAt: new Date(),
            updatedAt: new Date(),
            createdById: 'manager1'
        },
        {
            id: '2',
            title: 'Review team performance',
            status: 'COMPLETED',
            priority: 'MEDIUM',
            dueDate: new Date('2023-12-10'),
            createdAt: new Date(),
            updatedAt: new Date(),
            createdById: 'manager1'
        },
        // Add more sample tasks as needed
    ];

    const stats: TaskStats = {
        totalTasks: 24,
        completedTasks: 10,
        inProgressTasks: 8,
        overdueTasks: 3,
        pendingTasks: 3,
        cancelledTasks: 0
    };

    type TabType = 'dashboard' | 'employee-management' | 'task-management';
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800">Task Manager</h1>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => setActiveTab('dashboard')} className="flex items-center p-3 rounded-lg bg-blue-50 text-blue-600">
                                <LayoutDashboard className="w-5 h-5 mr-3" />
                                <span className="font-medium">Dashboard</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('task-management')} className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                                <ClipboardList className="w-5 h-5 mr-3" />
                                <span className="font-medium">Task Management</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('employee-management')} className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                                <Users className="w-5 h-5 mr-3" />
                                <span className="font-medium">Employees</span>
                            </button>
                        </li>

                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {activeTab === 'dashboard' && (
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Manager Dashboard</h1>

                        <div className="grid gap-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-lg shadow p-6 flex items-center border border-gray-100">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <ClipboardList className="text-blue-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Total Tasks</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats.totalTasks}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6 flex items-center border border-gray-100">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <CheckCircle2 className="text-green-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Completed</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats.completedTasks}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6 flex items-center border border-gray-100">
                                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                                        <Clock className="text-yellow-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">In Progress</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats.inProgressTasks}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-6 flex items-center border border-gray-100">
                                    <div className="bg-red-100 p-3 rounded-full mr-4">
                                        <AlertCircle className="text-red-600 w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Overdue</p>
                                        <p className="text-2xl font-bold text-gray-800">{stats.overdueTasks}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Task Status Overview */}
                            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <TrendingUp className="w-5 h-5 mr-2 text-gray-700" />
                                    <h2 className="text-xl font-semibold text-gray-800">Task Status Overview</h2>
                                </div>
                                {/* <div className="space-y-3">
                                {TaskStatus.map((value) => {
                                    const count = tasks.filter(t => t.status === value).length;
                                    const percentage = stats.totalTasks > 0
                                        ? Math.round((count / stats.totalTasks) * 100)
                                        : 0;

                                    return (
                                        <div key={value} className="mb-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="capitalize text-gray-700">{value.toLowerCase()}</span>
                                                <span className="text-gray-600">{count} ({percentage}%)</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${value === 'COMPLETED' ? 'bg-green-500' :
                                                        value === 'IN_PROGRESS' ? 'bg-blue-500' :
                                                            value === 'PENDING' ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                        }`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div> */}
                            </div>

                            {/* Recent Tasks */}
                            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <ClipboardList className="w-5 h-5 mr-2 text-gray-700" />
                                        <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
                                    </div>
                                    <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tasks.slice(0, 5).map((task) => (
                                                <tr key={task.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {task.dueDate.toLocaleDateString('en-GB')} // ensures consistent format

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                            task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                                                task.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                            }`}>
                                                            {task.status.toLowerCase().replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                                                            task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-green-100 text-green-800'
                                                            }`}>
                                                            {task.priority.toLowerCase()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'task-management' && <TaskManagement />}

            </div>
        </div>
    );
}