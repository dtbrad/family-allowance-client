import {baseUrl} from "./baseUrl";
import {Transaction} from "types";
import sleep from "helpers/sleep";

export default async function postTransaction(
    userId: string,
    {amount, description, date = new Date().toISOString()}: Transaction,
    accessToken: string
) {
    const url = `${baseUrl}/admin/users/${userId}/transactions`;
    await sleep(500);
    await fetch(url, {
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
}
