
export type Employee = {
    _id: string
    username: string;
    email: string;
    phone: string;
    role: string;
    managerId: Manager | null;
};

export type Manager = {
    _id: string
    username: string;
    email: string;
    phone: string;
    role: string;
    managerId: string
    employees?: Employee[] | [];

};
