import {decode} from "jsonwebtoken";
import {Role} from "types";

interface DecodedToken {
    role: Role;
    userId: string;
    exp: number;
    iat: number;
};

export function getPayload(token?: string): DecodedToken {
    try {
        return decode(token) as DecodedToken;
    } catch {
        throw new Error("There was a problem decoding the token");
    }
}

export function getRole(token?: string): Role {
    const payload = getPayload(token);
    if (payload) {
        return payload.role;
    }
}

export function getUserId(token?: string) {
    const payload = getPayload(token);
    if (payload) {
        return payload?.userId;
    }
}

export function isTokenValid(token?: string) {
    if (!token) {
        return false;
    }

    try {
        const payload = getPayload(token);

        if (!payload) {
            return false;
        }

        return Date.now() < payload.exp * 1000;
    } catch (error) {
        return false;
    }
}
