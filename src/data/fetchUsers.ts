import {baseUrl} from "./baseUrl";
import {UserSummary} from "types";

export default async function fetchUsers(token: string): Promise<UserSummary[]> {
    const response = await fetch(
        `${baseUrl}/admin/users`,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    );

    return await response.json();
}
