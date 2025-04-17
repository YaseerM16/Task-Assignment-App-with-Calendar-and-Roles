'use client';
import { useState } from 'react';
import { LayoutDashboard, Users, ClipboardList, Bell, UserCog, Settings, LogOut, Search, UserPlus, UserCheck, BarChart2, RefreshCw } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssignManagerTool from './AssignManagerTool';
import PromoteUserTool from './PromoteUserTool';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import EmployeeManagement from './EmployeeManagement';

export default function SuperManagerDashboard() {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'employee', manager: null },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'employee', manager: 'Manager A' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'manager', manager: null },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'supermanager', manager: null },
    ]);
    const [activePage, setActivePage] = useState("dashboard");

    // Dashboard stats
    const stats = {
        totalUsers: users.length,
        managers: users.filter(u => u.role === 'manager').length,
        employees: users.filter(u => u.role === 'employee').length,
        supermanagers: users.filter(u => u.role === 'supermanager').length,
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Enhanced Sidebar */}
            <div className="w-64 bg-indigo-700 text-white flex flex-col">
                <div className="p-6 border-b border-indigo-600">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <UserCog className="w-6 h-6" />
                        Admin Portal
                    </h1>
                    <p className="text-indigo-200 text-sm mt-1">Super Manager Dashboard</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Button
                        // variant="ghost"
                        className="w-full justify-start text-white hover:bg-indigo-600 hover:text-white"
                        onClick={() => setActivePage("dashboard")}
                    >
                        <LayoutDashboard className="w-4 h-4 mr-3" />
                        Dashboard
                    </Button>
                    <Button
                        // variant="ghost"
                        className="w-full justify-start text-white hover:bg-indigo-600 hover:text-white"
                        onClick={() => setActivePage("employee")}

                    >
                        <Users className="w-4 h-4 mr-3" />
                        Employee Management
                    </Button>
                    <Button
                        // variant="ghost"
                        className="w-full justify-start text-white hover:bg-indigo-600 hover:text-white"
                        onClick={() => setActivePage("manager")}

                    >
                        <UserCheck className="w-4 h-4 mr-3" />
                        Manager assignment
                    </Button>

                </nav>

                <div className="p-4 border-t border-indigo-600">

                    <Button
                        // variant="ghost"
                        className="w-full justify-start text-white hover:bg-indigo-600">
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {activePage === "dashboard" && (
                    <>
                        {/* Header */}
                        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                            <div className="relative w-96">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search users, reports..."
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
                                        SM
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Super Manager</p>
                                        <p className="text-xs text-gray-500">Admin Privileges</p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Dashboard Content */}
                        <main className="flex-1 overflow-y-auto p-6">
                            {/* Dashboard Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <DashboardCard
                                    title="Total Users"
                                    value={stats.totalUsers}
                                    icon={<Users className="w-6 h-6" />}
                                    color="bg-blue-100 text-blue-600"
                                />
                                <DashboardCard
                                    title="Managers"
                                    value={stats.managers}
                                    icon={<UserCheck className="w-6 h-6" />}
                                    color="bg-green-100 text-green-600"
                                />
                                <DashboardCard
                                    title="Employees"
                                    value={stats.employees}
                                    icon={<Users className="w-6 h-6" />}
                                    color="bg-purple-100 text-purple-600"
                                />
                                <DashboardCard
                                    title="Super Managers"
                                    value={stats.supermanagers}
                                    icon={<UserCog className="w-6 h-6" />}
                                    color="bg-amber-100 text-amber-600"
                                />
                            </div>

                            {/* Quick Actions */}
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <ActionButton
                                        icon={<UserPlus className="w-5 h-5" />}
                                        title="Add New User"
                                        description="Create a new employee account"
                                        onClick={() => { }}
                                    />
                                </div>
                            </div>

                            {/* Main Tools Section */}
                            <Tabs defaultValue="users">
                                <TabsList className="grid w-full grid-cols-2 max-w-xs">
                                    <TabsTrigger value="users">Employee Management</TabsTrigger>
                                    <TabsTrigger value="roles">Manager assignment</TabsTrigger>
                                </TabsList>

                                <TabsContent>
                                    {/* User list table would go here */}
                                    <div className="bg-white rounded-lg border p-6">
                                        <h3 className="text-lg font-semibold mb-4">All Users</h3>
                                        {/* User table component */}
                                    </div>
                                </TabsContent>

                                <TabsContent >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <PromoteUserTool
                                            users={users} promotionData={{
                                                userId: '',
                                                newRole: ''
                                            }} setPromotionData={function (data: any): void {
                                                throw new Error('Function not implemented.');
                                            }} handlePromoteUser={function (): void {
                                                throw new Error('Function not implemented.');
                                            }}                                // ... pass necessary props
                                        />
                                        <AssignManagerTool
                                            users={users} assignmentData={{
                                                employeeId: '',
                                                managerId: ''
                                            }} setAssignmentData={function (data: any): void {
                                                throw new Error('Function not implemented.');
                                            }} handleAssignManager={function (): void {
                                                throw new Error('Function not implemented.');
                                            }}                                // ... pass necessary props
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </main>
                    </>
                )}
                {activePage === "employee" && <EmployeeManagement />}

                {activePage === "manager" && (
                    <h2 className="text-xl font-semibold">Manager Assignment Coming Soon</h2>
                )}
            </div>
        </div>
    );
}

// Reusable Dashboard Card Component
function DashboardCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
                <div className={`p-2 rounded-full ${color}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-gray-500 mt-1">Last updated: Just now</p>
            </CardContent>
        </Card>
    );
}

// Reusable Action Button Component
function ActionButton({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-white border rounded-lg p-4 text-left hover:bg-gray-50 transition-colors flex items-start gap-3"
        >
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                {icon}
            </div>
            <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </button>
    );
}