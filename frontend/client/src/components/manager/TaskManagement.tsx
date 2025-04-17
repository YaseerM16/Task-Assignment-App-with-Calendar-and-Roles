import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Plus, Eye, Calendar as CalendarIcon, X } from 'lucide-react';
// import { Table } from './Table';
import { Task, TaskStatus, TaskPriority } from '@/utils/task.types';
import { Table, TableColumn } from '../Table';

type ValuePiece = Date | null;
type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

export function TaskManagement() {
    const [date, setDate] = useState<CalendarValue>(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTask, setNewTask] = useState<Partial<Task>>({
        title: '',
        description: '',
        dueDate: new Date(),
        priority: 'MEDIUM',
        status: 'PENDING'
    });

    // Filter tasks for selected date
    const filteredTasks = tasks.filter(task => {
        if (!date) return false;
        const taskDate = new Date(task.dueDate);
        const selectedDate = Array.isArray(date) ? date[0] : date;

        return selectedDate &&
            taskDate.getDate() === selectedDate.getDate() &&
            taskDate.getMonth() === selectedDate.getMonth() &&
            taskDate.getFullYear() === selectedDate.getFullYear();
    });

    const handleCreateTask = () => {
        if (!newTask.title) return;

        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            description: newTask.description || '',
            status: newTask.status || 'PENDING',
            priority: newTask.priority || 'MEDIUM',
            dueDate: newTask.dueDate || new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            createdById: 'manager1' // Replace with actual user ID
        };

        setTasks([...tasks, task]);
        setShowCreateModal(false);
        setNewTask({
            title: '',
            description: '',
            dueDate: new Date(),
            priority: 'MEDIUM',
            status: 'PENDING'
        });
    };

    const columns: TableColumn<Task>[] = [
        {
            header: 'Title',
            accessor: 'title'
        },
        {
            header: 'Due Date',
            cell: (_, row) => new Date(row.dueDate).toLocaleDateString()
        },
        {
            header: 'Status',
            cell: (_, row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    row.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                        row.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {row.status.toLowerCase().replace('_', ' ')}
                </span>
            )
        },
        {
            header: 'Priority',
            cell: (_, row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                    row.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {row.priority.toLowerCase()}
                </span>
            )
        },
        {
            header: 'Actions',
            actions: (task) => (
                <button
                    onClick={() => console.log('View task:', task)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    aria-label="View"
                >
                    <Eye className="w-4 h-4" />
                </button>
            )
        }
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Task Management
                </h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="border-none"
                        tileClassName={({ date: tileDate, view }) => {
                            if (view === 'month') {
                                const hasTasks = tasks.some(task => {
                                    const taskDate = new Date(task.dueDate);
                                    return (
                                        taskDate.getDate() === tileDate.getDate() &&
                                        taskDate.getMonth() === tileDate.getMonth() &&
                                        taskDate.getFullYear() === tileDate.getFullYear()
                                    );
                                });
                                return hasTasks ? 'bg-blue-50 text-blue-600' : '';
                            }
                            return '';
                        }}
                    />
                </div>

                {/* Tasks Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Tasks for {date && !Array.isArray(date) ? date.toLocaleDateString() : ''}
                            </h3>
                            <span className="text-sm text-gray-500">
                                {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                            </span>
                        </div>

                        <Table
                            data={filteredTasks}
                            columns={columns}
                            emptyState={
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No tasks for this date</p>
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="mt-2 text-blue-600 hover:underline"
                                    >
                                        Create a new task
                                    </button>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Create Task Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="text-lg font-semibold">Create New Task</h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Task title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Task description"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={newTask.dueDate ? new Date(newTask.dueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={newTask.status}
                                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 p-4 border-t">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateTask}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}