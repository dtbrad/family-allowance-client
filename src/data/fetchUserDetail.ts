import {baseUrl} from "./baseUrl";
import {UserDetail, ServerUserDetailResponse} from "types";
import sleep from "helpers/sleep";

export default async function fetchUserDetail(userId: string, token: string): Promise<UserDetail> {
    await sleep(250);
    const response = await fetch(
        `${baseUrl}/users/${userId}?limit=500`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    );

    if (response.status >= 400) {
        throw new Error("boom!");
    }

    const {transactions, ...rest}: ServerUserDetailResponse = await response.json();

    return {
        ...rest,
        transactions: transactions.entries
    };
}
