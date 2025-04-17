import { User } from "../../utils/user.type"

export interface ISuperManagerRepository {
    getEmployees(query: any): Promise<{ employees: User[], totalEmployees: number }>
    getManagers(query: any): Promise<{ managers: User[], totalManagers: number }>
}
