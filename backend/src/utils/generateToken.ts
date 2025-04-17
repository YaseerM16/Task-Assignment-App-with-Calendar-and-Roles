import jwt from "jsonwebtoken";
import { config } from "./constants"
export function generateAccessToken(id: string, role: string): string {
    try {
        const payload = { id, role };
        return jwt.sign(payload, String(config.JWT_SECRET), { expiresIn: "1h" } as jwt.SignOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export function generateRefreshToken(id: string, role: string): string {
    try {
        const payload = { id, role };
        return jwt.sign(payload, String(config.JWT_REFRESH_SECRET), { expiresIn: "1h" } as jwt.SignOptions);
    } catch (error: any) {
        throw new Error(error.message);
    }
}