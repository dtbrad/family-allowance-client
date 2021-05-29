import {User} from "types";
import {baseUrl} from "./baseUrl";

export default async function postUser(
    {
        userId,
        password,
        dayPreference,
        allowanceAmount
    }: User,
    token: string
) {

    const url = `${baseUrl}/admin/users`;

    await fetch(url, {
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
}
