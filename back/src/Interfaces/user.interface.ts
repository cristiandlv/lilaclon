import { Role } from "../entities/User"
export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: Role;
}