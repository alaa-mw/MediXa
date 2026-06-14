import type { Role } from "../../../app/routes/roles";

export type User = {
    userId: number;
    fullName: string;
    email: string;
    phone: string;
    accountType: Role;
    status: "ACTIVE" | "INACTIVE";
} 