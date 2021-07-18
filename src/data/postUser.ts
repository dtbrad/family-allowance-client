import {NewUserArgs, UserSummary} from "types";
import {baseUrl} from "./baseUrl";

export default async function postUser(
    {
        userId,
        password,
        dayPreference,
        allowanceAmount
    }: NewUserArgs,
    token: string
): Promise<UserSummary[]> {
    const url = `${baseUrl}/admin/users`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            userId,
            password,
            dayPreference,
            allowanceAmount
        })
    });

    return await response.json();
}
