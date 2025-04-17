
import { AddUserInput, User as UserInstance, AddUserOutput, getUserOutput } from "../utils/user.type"
import { IUserRepository } from "../interface/repository/IUserRepository";
import { User } from "../models/User";

export class UserRepository implements IUserRepository {
    addUser = async (userData: AddUserInput): Promise<AddUserOutput> => {
        try {
            const user = await User.create({
                ...userData,
            });

            return {
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        } catch (error: any) {
            console.error("Error adding user:", error);
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                const value = error.keyValue[field];
                error.message = `${field} '${value}' already exists.`;
            }
            throw new Error(error.message);
        }
    };
    getUserByEmail = async (email: string): Promise<getUserOutput> => {
        try {
            const user = await User.findOne({ email });
            if (!user) throw new Error("User not found");

            return {
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        } catch (error: any) {
            console.error("Error getting user by email:", error);

            throw new Error(error.message);
        }
    };

    // getUsers = async (): Promise<getUserOutput[]> => {
    //     try {
    //         const users = await User.find();

    //         return users.map((user) => ({
    //             _id: user._id as string,
    //             username: user.username,
    //             email: user.email,
    //             phone: user.phone,
    //             role: user.role,
    //             password: user.password,
    //             createdAt: user.createdAt,
    //             updatedAt: user.updatedAt,
    //         }));
    //     } catch (error: any) {
    //         console.error("Error fetching users:", error);
    //         throw new Error(error.message);
    //     }
    // };
    async getUsers(query: any): Promise<{ users: UserInstance[]; totalUsers: number }> {
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

            const totalUsers = await User.find(queryObj).countDocuments();

            const users = await User.find(queryObj)
                .sort({ createdAt: -1 })
                .skip((page - 1) * parseInt(limit, 10))
                .limit(parseInt(limit, 10));

            const formattedUsers: UserInstance[] = users.map((user) => ({
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }));

            return { users: formattedUsers, totalUsers };
        } catch (error: any) {
            console.error("Error fetching users:", error);
            throw new Error(error.message);
        }
    }


}