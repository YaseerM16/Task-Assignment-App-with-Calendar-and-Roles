import { AddUserInput, getUserOutput, User, UserInstance } from "../../utils/user.type"

export interface IUserService {
    userSignup(userData: AddUserInput): Promise<UserInstance>;
    userLogin(email: string, password: string): Promise<UserInstance>;
    getUsers(query: any): Promise<{ users: User[], totalUsers: number }>
}