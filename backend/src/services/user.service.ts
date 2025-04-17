import { AddUserInput, UserInstance, User } from "../utils/user.type"

import { comparePassword, encryptPassword } from "../utils/encrypt"
import { AppError } from "../utils/errors"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken"

import { IUserService } from "../interface/service/IUserService";
import { IUserRepository } from "../interface/repository/IUserRepository";

export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    userSignup = async (userData: AddUserInput): Promise<UserInstance> => {
        try {
            const encryptedPassword = encryptPassword(userData.password);

            const user = await this.userRepository.addUser({
                ...userData,
                password: encryptedPassword,
            });

            const accessToken = generateAccessToken(user._id, user.role);
            const refreshToken = generateRefreshToken(user._id, user.role);

            return { ...user, accessToken, refreshToken };
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    userLogin = async (
        email: string,
        password: string
    ): Promise<UserInstance> => {
        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user.password) throw new AppError("Password not found", 400);
            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) throw new AppError("Invalid Credentials", 401);

            const accessToken = generateAccessToken(user._id, user.role);
            const refreshToken = generateRefreshToken(user._id, user.role);

            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                password: user.password,
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            console.log("Error in user service", error.message);
            throw new Error(error.message);
        }
    };

    getUsers = async (query: any): Promise<{ users: User[]; totalUsers: number }> => {
        try {
            const { users, totalUsers } = await this.userRepository.getUsers(query);
            return { users, totalUsers };
        } catch (error: any) {
            console.log("Error in getUsers service:", error.message);
            throw new Error(error.message);
        }
    };

}