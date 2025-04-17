import { User } from "../../utils/user.type"

export interface ISuperManagerService {
    getEmployees(query: any): Promise<{ employees: User[], totalEmployees: number }>
    getEveryEmployees(query: any): Promise<{ employees: User[], totalEmployees: number }>
    getManagers(query: any): Promise<{ managers: User[], totalManagers: number }>
    assignManagerToEmployee(userId: string, managerId: string): Promise<User | null>
    promoteToManager(employeeId: string): Promise<User | null>
}
