import { Request } from "express";
import { ControllerResponse } from "../utils/controller.type";
import { ISuperManagerService } from "../interface/service/ISuperManagerService";

export class SuperManagerController {
    private superManagerService: ISuperManagerService;

    constructor(superManagerService: ISuperManagerService) {
        this.superManagerService = superManagerService;
    }

    getAllEmployees = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const query = httpRequest.query;

            const { employees, totalEmployees } = await this.superManagerService.getEveryEmployees(query);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: {
                    employees,
                    totalEmployees,
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

    getEmployees = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const query = httpRequest.query;

            const { employees, totalEmployees } = await this.superManagerService.getEmployees(query);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: {
                    employees,
                    totalEmployees,
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

    getManagers = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const query = httpRequest.query;

            const { managers, totalManagers } = await this.superManagerService.getManagers(query);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: {
                    managers,
                    totalManagers,
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
    assignManager = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const { userId, managerId } = httpRequest.body;

            const updatedEmployee = await this.superManagerService.assignManagerToEmployee(userId, managerId);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: {
                    message: "Manager assigned successfully.",
                    employee: updatedEmployee,
                },
            };
        } catch (e: any) {
            console.log("Error in assignManager controller:", e.message);

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

    promoteToManager = async (httpRequest: Request): Promise<ControllerResponse> => {
        try {
            const { employeeId } = httpRequest.params;

            const updatedEmployee = await this.superManagerService.promoteToManager(employeeId);

            return {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 200,
                body: {
                    message: "Employee promoted successfully.",
                    employee: updatedEmployee,
                },
            };
        } catch (e: any) {
            console.log("Error in assignManager controller:", e.message);

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