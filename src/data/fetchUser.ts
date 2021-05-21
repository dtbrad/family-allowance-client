import {baseUrl} from "./baseUrl";
import {User} from "types";

export default async function fetchUser(userId: string, token: string): Promise<User> {
    const response = await fetch(
        `${baseUrl}/users/${userId}?limit=500`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    );

    if (response.status >= 400) {
        throw new Error("boom!");
    }

    const {transactions, ...rest} = await response.json();

    return {
        ...rest,
        transactions: transactions.entries
    };
}
