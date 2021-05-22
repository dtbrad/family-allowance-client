import {baseUrl} from "./baseUrl";
import {User} from "types";

export default async function fetchUsers(token: string): Promise<User[]> {
    const response = await fetch(
        `${baseUrl}/admin/users`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    );

    if (response.status >= 400) {
        return undefined;
    }

    return await response.json();
}
