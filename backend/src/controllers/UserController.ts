import { Request } from "express";
import { IUserService } from "../interface/service/IUserService";
import { ControllerResponse } from "../utils/controller.type";

export class UserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    userSignup = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const { username, email, phone, password, role } =
                httpRequest.body;

            const user = await this.userService.userSignup({
                username,
                email,
                phone,
                password,
                role
            });
            const { accessToken, refreshToken, password: _, ...userDets } = user;

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 201,
                body: userDets,
                accessToken,
                refreshToken,
            };
        } catch (e: any) {
            console.log(e);
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: e.statusCode || 500,
                body: {
                    error: e.message,
                },
            };
        }
    };

    userLogin = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const { email, password } = httpRequest.body;

            const user = await this.userService.userLogin(email, password);
            const { accessToken, refreshToken, ...userDet } = user;

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: userDet,
                accessToken,
                refreshToken,
            };
        } catch (e: any) {
            console.log(e);
            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: e.statusCode || 500,
                body: {
                    error: e.message,
                },
            };
        }
    };

    getUsers = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const query = httpRequest.query;

            const { users, totalUsers } = await this.userService.getUsers(query);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: {
                    users,
                    totalUsers,
                },
            };
        } catch (e: any) {
            console.log("Error in getUsers controller:", e.message);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: e.statusCode || 500,
                body: {
                    error: e.message,
                },
            };
        }
    };

}