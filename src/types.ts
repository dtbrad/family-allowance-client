export enum AsyncStatus {
    idle = "idle",
    pending = "pending",
    resolved = "resolved",
    rejected = "rejected"
}

export enum Role {
    admin = "admin",
    standard = "standard"
}

export interface Transaction {
    date?: string;
    amount: number;
    description: string;
}

export interface User {
    userId: string;
    role: Role;
    balance: number;
    allowanceAmount: number;
    transactions?: Transaction[];
    dayPreference: string;
    password: string
    accessToken: string;
}

export type AuthenticatedUser = Pick<User, "userId" | "role" | "accessToken">;

export type UserSummary = Pick<User, "userId" | "balance" | "allowanceAmount" | "dayPreference">;

export type UserSummariesById = {[id: string]: UserSummary};

export type UserDetail = Pick<User, "userId" | "balance" | "transactions">

export type NewUserArgs = Pick<User, "userId" | "allowanceAmount" | "dayPreference" | "password">

export interface ServerTransactions {
    entries: Transaction[]
}

export interface ServerUserDetailResponse {
    userId: string;
    balance: number;
    transactions: ServerTransactions;
}
