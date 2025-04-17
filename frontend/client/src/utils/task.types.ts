// types/task.ts
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    assignedToId?: string; // Only present if assigned to someone
    createdById: string; // The manager who created the task
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'OVERDUE'
// export enum TaskPriority {
//     LOW = 'LOW',
//     MEDIUM = 'MEDIUM',
//     HIGH = 'HIGH'
// }

export type TaskFormData = {
    title: string;
    description?: string;
    dueDate: Date;
    priority: TaskPriority;
    status: TaskStatus;
};

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

// For the task stats
export interface TaskStats {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    pendingTasks: number;
    overdueTasks: number;
    cancelledTasks: number;
}