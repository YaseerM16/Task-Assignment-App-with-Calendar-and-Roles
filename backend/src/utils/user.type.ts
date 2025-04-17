import { Types } from "mongoose";

export type AddUserInput = {
    username: string;
    email: string;
    phone: string;
    password: string;
    role: string;
};

export type UserInstance = {
    readonly _id: string;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly password: string;
}


export type getUserOutput = {
    readonly _id: string;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly password: string;

}

export type AddUserOutput = {
    readonly _id: string;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly role: string;
    readonly password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}



export type User = {
    readonly _id: Types.ObjectId; // ✅ make sure this is Types.ObjectId;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly role: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
