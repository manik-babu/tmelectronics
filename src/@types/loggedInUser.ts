import { UserRole } from "./userRole";

export interface LoggedInUser {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: UserRole;
}