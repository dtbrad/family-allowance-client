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
    date: string;
    amount: number;
    description: string;
}

export interface User {
    userId: string;
    balance: number;
    allowanceAmount: number;
    role: string;
    transactions: Transaction[];
    dayPreference: string;
}
