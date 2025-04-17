import { User } from "../utils/user.type"
import { ISuperManagerService } from "../interface/service/ISuperManagerService";
import { ISuperManagerRepository } from "../interface/repository/ISuperManagerRepository";

export class SuperManagerService implements ISuperManagerService {
    private superManagerRepository: ISuperManagerRepository;

    constructor(superManagerRepository: ISuperManagerRepository) {
        this.superManagerRepository = superManagerRepository;
    }

    async getEveryEmployees(query: any): Promise<{ employees: User[]; totalEmployees: number; }> {
        try {
            const { employees, totalEmployees } = await this.superManagerRepository.getAllEmployees(query);
            return { employees, totalEmployees };
        } catch (error: any) {
            console.log("Error in getUsers service:", error.message);
            throw new Error(error.message);
        }
    }

    async getEmployees(query: any): Promise<{ employees: User[]; totalEmployees: number; }> {
        try {
            const { employees, totalEmployees } = await this.superManagerRepository.getEmployees(query);
            return { employees, totalEmployees };
        } catch (error: any) {
            console.log("Error in getUsers service:", error.message);
            throw new Error(error.message);
        }
    }
    async getManagers(query: any): Promise<{ managers: User[]; totalManagers: number; }> {
        try {
            const { managers, totalManagers } = await this.superManagerRepository.getManagers(query);
            return { managers, totalManagers };
        } catch (error: any) {
            console.log("Error in getUsers service:", error.message);
            throw new Error(error.message);
        }
    }
    async assignManagerToEmployee(userId: string, managerId: string): Promise<User | null> {
        try {
            const updatedEmployee = await this.superManagerRepository.assignManager(userId, managerId);
            return updatedEmployee;
        } catch (error: any) {
            console.error('Error in assignManagerToEmployee service:', error.message);
            throw new Error(error.message);
        }
    }

    async promoteToManager(employeeId: string): Promise<User | null> {
        try {
            const updatedEmployee = await this.superManagerRepository.promoteToManager(employeeId);
            return updatedEmployee;
        } catch (error: any) {
            console.error('Error in assignManagerToEmployee service:', error.message);
            throw new Error(error.message);
        }
    }

}