import bcrypt from "bcryptjs";
import { config } from "./constants"

export function encryptPassword(password: string): string {
    try {
        const saltRounds = parseInt(config.BCRYPT_SALT || "10", 10);
        return bcrypt.hashSync(password, saltRounds);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export function comparePassword(
    inputPassword: string,
    passwordFromDb: string
): boolean {
    try {
        return bcrypt.compareSync(inputPassword, passwordFromDb);
    } catch (error: any) {
        throw new Error(error.message);
    }
}