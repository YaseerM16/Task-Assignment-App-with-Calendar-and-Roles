import { AddUserInput, AddUserOutput, getUserOutput, User } from "../../utils/user.type"

export interface IUserRepository {
    addUser(userData: AddUserInput): Promise<AddUserOutput>;
    getUserByEmail(email: string): Promise<getUserOutput>;
    getUsers(query: any): Promise<{ users: User[], totalUsers: number }>
}