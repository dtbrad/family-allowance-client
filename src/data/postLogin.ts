import {baseUrl} from "./baseUrl";

export default async function postLogin(userId: string, password: string): Promise<string> {
    const url = `${baseUrl}/signin`;

    const response = await fetch(url, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({userId, password})
    });

    if (response.status === 401) {
        throw new Error("forbidden");
    }

    const data = await response.json();

    return data.accessToken;
}
