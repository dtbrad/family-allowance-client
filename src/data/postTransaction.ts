import {baseUrl} from "./baseUrl";
import {ServerUserDetailResponse, Transaction, UserDetail} from "types";
import sleep from "helpers/sleep";

export default async function postTransaction(
    userId: string,
    {amount, description, date = new Date().toISOString()}: Transaction,
    accessToken: string
): Promise<UserDetail> {
    const url = `${baseUrl}/admin/users/${userId}/transactions`;
    await sleep(500);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            transactions: [{
                description,
                amount,
                transactionDate: date
            }
            ]})
    });

    const {transactions, ...rest}: ServerUserDetailResponse = await response.json();

    return {
        ...rest,
        transactions: transactions.entries
    };
}
