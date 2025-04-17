'use client';
import { useEffect, useState } from 'react';
import { LayoutDashboard, ClipboardList, Bell, Calendar, FileText, Settings, LogOut, Search, User } from 'lucide-react';
import MyTasks from '../my-tasks/page';
import { useAppSelector } from '@/store/hooks';
import { Employee } from '@/utils/roles.types';

export default function EmployeeDashboard() {
    type TabType = 'dashboard' | 'tasks' | 'calendar' | 'documents';
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete project proposal', due: 'Today', priority: 'high', completed: false },
        { id: 2, title: 'Submit timesheet', due: 'Tomorrow', priority: 'medium', completed: false },
        { id: 3, title: 'Attend team meeting', due: 'Fri, 10 AM', priority: 'high', completed: true },
    ]);
    const [employee, setEmployee] = useState<Employee | null>();
    const user = useAppSelector(state => state.users.user)
    useEffect(() => {
        setEmployee(user as Employee);
    }, [user]);
    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <>
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar - always visible */}
                <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-indigo-600">TaskFlow</h1>
                        <p className="text-sm text-gray-500">Employee Dashboard</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <LayoutDashboard className="w-5 h-5 mr-3" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'tasks' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <ClipboardList className="w-5 h-5 mr-3" />
                            My Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab('calendar')}
                            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'calendar' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Calendar className="w-5 h-5 mr-3" />
                            Calendar
                        </button>
                        <button
                            onClick={() => setActiveTab('documents')}
                            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'documents' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <FileText className="w-5 h-5 mr-3" />
                            Documents
                        </button>
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <button className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100">
                            <Settings className="w-5 h-5 mr-3" />
                            Settings
                        </button>
                        <button className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100">
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {activeTab === 'dashboard' && (
                        <>
                            {/* Header */}
                            <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button className="relative p-2 text-gray-500 hover:text-gray-700">
                                        <Bell className="w-6 h-6" />
                                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                                            JD
                                        </div>
                                        <span className="text-sm font-medium">John Doe</span>
                                    </div>
                                </div>
                            </header>

                            {/* Dashboard Content */}
                            <main className="flex-1 overflow-y-auto p-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Welcome back, John!</h2>
                                    <p className="text-gray-600">Here's what's happening today</p>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Tasks</h3>
                                        <p className="text-2xl font-bold text-indigo-600">5</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Completed Today</h3>
                                        <p className="text-2xl font-bold text-green-600">2</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Upcoming Deadlines</h3>
                                        <p className="text-2xl font-bold text-amber-600">3</p>
                                    </div>
                                </div>

                                {/* Tasks Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">My Tasks</h3>
                                            <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                                        </div>

                                        <div className="space-y-4">
                                            {tasks.map(task => (
                                                <div key={task.id} className="flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => toggleTaskCompletion(task.id)}
                                                        className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                                    />
                                                    <div className="ml-3 flex-1">
                                                        <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                            {task.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">Due: {task.due}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                        task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* New Manager Details Section */}
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">My Manager</h3>
                                            <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                                Contact
                                            </button>
                                        </div>

                                        {employee?.managerId ? (
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                                                    {employee.managerId._id}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{employee.managerId.username}</h4>
                                                    <p className="text-sm text-gray-500">Department Head</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        <div className="text-indigo-600 hover:underline">
                                                            Contact via email {employee.managerId.email}
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-6 text-center border-2 border-dashed border-gray-200 rounded-lg">
                                                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <h4 className="font-medium text-gray-500">No manager assigned</h4>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    Please contact HR if you need assistance
                                                </p>
                                            </div>
                                        )}

                                        {/* Additional manager-related content */}
                                        {employee?.managerId && (
                                            <div className="mt-6 space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Next 1:1 Meeting</span>
                                                    <span className="font-medium">Fri, May 12 at 2:00 PM</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-500">Last Feedback</span>
                                                    <span className="font-medium">2 weeks ago</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </main>
                        </>
                    )}
                    {activeTab === 'tasks' && <MyTasks />}
                </div>
            </div>
        </>
    );
}