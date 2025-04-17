export type RegisterUser = {
    username: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    confirmPassword?: string;
};

export type LoginUser = {
    email: string;
    password: string;
};

export type User = {
    _id: string
    username: string;
    email: string;
    phone: string;
    role: string;
};

export type userState = {
    user?: User | null;
};