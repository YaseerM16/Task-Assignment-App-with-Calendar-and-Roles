
import { AddUserInput, User as UserInstance, AddUserOutput, getUserOutput } from "../utils/user.type"
import { IUserRepository } from "../interface/repository/IUserRepository";
import { User } from "../models/User";
import { ISuperManagerRepository } from "../interface/repository/ISuperManagerRepository";


export class SuperManagerRepository implements ISuperManagerRepository {
    async getAllEmployees(query: any): Promise<{ employees: UserInstance[]; totalEmployees: number; }> {
        try {
            const { page = 1, limit = 6, search } = query;

            const queryObj: any = {
                role: "employee",
                ...(search && {
                    $or: [
                        { username: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } }
                    ]
                })
            };

            const totalEmployees = await User.find(queryObj).countDocuments();

            const employees = await User.find(queryObj)
                .sort({ createdAt: -1 })
                .skip((page - 1) * parseInt(limit, 10))
                .limit(parseInt(limit, 10));

            const formattedEmployees: UserInstance[] = employees.map((employee) => ({
                _id: employee._id,
                username: employee.username,
                email: employee.email,
                phone: employee.phone,
                role: employee.role,
                createdAt: employee.createdAt,
                updatedAt: employee.updatedAt,
            }));

            return { employees: formattedEmployees, totalEmployees };
        } catch (error: any) {
            console.error("Error fetching users:", error);
            throw new Error(error.message);
        }
    }
    async getEmployees(query: any): Promise<{ employees: UserInstance[]; totalEmployees: number; }> {
        try {
            const { page = 1, limit = 6, search } = query;

            const queryObj: any = {
                role: "employee",
                managerId: null,
                ...(search && {
                    $or: [
                        { username: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } }
                    ]
                })
            };

            const totalEmployees = await User.find(queryObj).countDocuments();

            const employees = await User.find(queryObj)
                .sort({ createdAt: -1 })
                .skip((page - 1) * parseInt(limit, 10))
                .limit(parseInt(limit, 10));

            const formattedEmployees: UserInstance[] = employees.map((employee) => ({
                _id: employee._id,
                username: employee.username,
                email: employee.email,
                phone: employee.phone,
                role: employee.role,
                createdAt: employee.createdAt,
                updatedAt: employee.updatedAt,
            }));

            return { employees: formattedEmployees, totalEmployees };
        } catch (error: any) {
            console.error("Error fetching users:", error);
            throw new Error(error.message);
        }
    }

    async getManagers(query: any): Promise<{ managers: UserInstance[]; totalManagers: number; }> {
        try {
            const { page = 1, limit = 6, search } = query;

            const queryObj: any = {
                role: "manager",
                ...(search && {
                    $or: [
                        { username: { $regex: search, $options: "i" } },
                        { email: { $regex: search, $options: "i" } }
                    ]
                })
            };

            const totalManagers = await User.find(queryObj).countDocuments();

            const managers = await User.find(queryObj)
                .sort({ createdAt: -1 })
                .skip((page - 1) * parseInt(limit, 10))
                .limit(parseInt(limit, 10));

            const formattedManagers: UserInstance[] = managers.map((manager) => ({
                _id: manager._id,
                username: manager.username,
                email: manager.email,
                phone: manager.phone,
                role: manager.role,
                createdAt: manager.createdAt,
                updatedAt: manager.updatedAt,
            }));

            return { managers: formattedManagers, totalManagers };
        } catch (error: any) {
            console.error("Error fetching users:", error);
            throw new Error(error.message);
        }
    }

    async assignManager(userId: string, managerId: string): Promise<UserInstance | null> {
        const employee = await User.findById(userId);

        if (!employee) {
            throw new Error('Employee not found.');
        }

        if (employee.role !== 'employee') {
            throw new Error('User is not an employee.');
        }

        if (employee.managerId) {
            throw new Error('Employee already has a manager assigned.');
        }

        const manager = await User.findById(managerId);

        if (!manager || (manager.role !== 'manager' && manager.role !== 'supermanager')) {
            throw new Error('Invalid manager ID or role.');
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { managerId },
            { new: true }
        ).populate('managerId', 'username email role');

        return updatedUser;
    }

    async promoteToManager(employeeId: string): Promise<UserInstance | null> {
        const employee = await User.findById(employeeId);

        if (!employee) {
            throw new Error('User not found.');
        }

        if (employee.role !== 'employee') {
            throw new Error('Only employees can be promoted to managers.');
        }

        const updatedEmployee = await User.findByIdAndUpdate(
            employeeId,
            { role: 'manager' },
            { new: true }
        );

        return updatedEmployee;
    }


}