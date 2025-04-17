'use client';
import { useState } from 'react';
import { Check, Flag, MoreVertical, Clock } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Task = {
    id: number;
    title: string;
    due: Date;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
};

export default function MyTasks() {
    const [date, setDate] = useState<Date>(new Date());
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Complete project proposal',
            due: new Date(),
            priority: 'high',
            completed: false
        },
        {
            id: 2,
            title: 'Submit timesheet',
            due: new Date(new Date().setDate(new Date().getDate() + 1)),
            priority: 'medium',
            completed: false
        },
        {
            id: 3,
            title: 'Team meeting',
            due: new Date(new Date().setDate(new Date().getDate() + 2)),
            priority: 'high',
            completed: true
        },
    ]);

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const getTasksForDate = (date: Date) => {
        return tasks.filter(task =>
            task.due.toDateString() === date.toDateString()
        );
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const tasksCount = tasks.filter(
                task => task.due.toDateString() === date.toDateString()
            ).length;

            return tasksCount > 0 ? (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full block mx-auto"></span>
                </div>
            ) : null;
        }
    };

    return (
        <div className="flex h-full bg-gray-50">
            {/* Calendar Section - Left Side */}
            <div className="w-1/3 p-6">
                <div className="bg-white rounded-xl shadow-sm p-5 h-full border border-gray-100">
                    <Calendar
                        onChange={(value) => value && setDate(value as Date)}
                        value={date}
                        tileContent={tileContent}
                        className="border-0 font-medium text-gray-800"
                        locale="en-US"
                        next2Label={null}
                        prev2Label={null}
                        minDetail="month"
                        tileClassName={({ date, view }) =>
                            view === 'month' && date.toDateString() === new Date().toDateString()
                                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                : ''
                        }
                        navigationLabel={({ date }) => (
                            <span className="text-gray-800 font-semibold">
                                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </span>
                        )}
                    />
                </div>
            </div>

            {/* Tasks Section - Right Side */}
            <div className="w-2/3 p-6 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-sm p-5 h-full border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Tasks for {date.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </h2>
                        <span className="text-sm text-gray-600">
                            {getTasksForDate(date).length} {getTasksForDate(date).length === 1 ? 'task' : 'tasks'}
                        </span>
                    </div>

                    {getTasksForDate(date).length > 0 ? (
                        <div className="space-y-3">
                            {getTasksForDate(date).map(task => (
                                <div
                                    key={task.id}
                                    className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleTaskCompletion(task.id)}
                                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${task.completed
                                                    ? 'bg-green-100 border-green-300 text-green-600'
                                                    : 'border-gray-300 hover:border-indigo-300'
                                                    }`}
                                            >
                                                {task.completed && <Check className="w-3 h-3" />}
                                            </button>
                                            <span className={`text-gray-800 ${task.completed ? 'line-through text-gray-500' : 'font-medium'
                                                }`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === 'high'
                                                ? 'bg-red-100 text-red-800'
                                                : task.priority === 'medium'
                                                    ? 'bg-amber-100 text-amber-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {task.priority}
                                            </span>
                                            <button className="text-gray-500 hover:text-gray-700 transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        <span>Due {task.due.toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <Flag className="w-12 h-12 text-gray-400 mb-3" />
                            <h3 className="text-lg font-medium text-gray-700">No tasks scheduled</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {date.toDateString() === new Date().toDateString()
                                    ? "Add tasks for today"
                                    : "No tasks for this day"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}