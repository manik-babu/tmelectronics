export interface LoggedInUser {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: string;
}