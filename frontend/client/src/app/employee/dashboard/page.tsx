'use client';
import { useState } from 'react';
import { LayoutDashboard, ClipboardList, Bell, Calendar, FileText, Settings, LogOut, Search } from 'lucide-react';

export default function EmployeeDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete project proposal', due: 'Today', priority: 'high', completed: false },
        { id: 2, title: 'Submit timesheet', due: 'Tomorrow', priority: 'medium', completed: false },
        { id: 3, title: 'Attend team meeting', due: 'Fri, 10 AM', priority: 'high', completed: true },
    ]);

    const announcements = [
        { id: 1, title: 'Office closed on Monday', date: '2 hours ago', read: false },
        { id: 2, title: 'New HR policies updated', date: '1 day ago', read: true },
        { id: 3, title: 'Team lunch this Friday', date: '3 days ago', read: true },
    ];

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
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
                                <h3 className="text-lg font-semibold">My Tasks</h3>
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

                        {/* Announcements Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Announcements</h3>
                                <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                            </div>

                            <div className="space-y-4">
                                {announcements.map(announcement => (
                                    <div key={announcement.id} className={`p-3 rounded-lg ${!announcement.read ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                                        <p className={`text-sm font-medium ${!announcement.read ? 'text-indigo-800' : 'text-gray-700'}`}>
                                            {announcement.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                                <FileText className="w-6 h-6 text-indigo-600 mb-2" />
                                <span className="text-sm">Submit Report</span>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                                <ClipboardList className="w-6 h-6 text-indigo-600 mb-2" />
                                <span className="text-sm">Request Leave</span>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                                <Calendar className="w-6 h-6 text-indigo-600 mb-2" />
                                <span className="text-sm">Schedule Meeting</span>
                            </button>
                            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center">
                                <Settings className="w-6 h-6 text-indigo-600 mb-2" />
                                <span className="text-sm">Update Profile</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}