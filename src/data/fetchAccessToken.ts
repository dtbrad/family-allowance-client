import queryString from "query-string";
import Cookie from "universal-cookie";
import {baseUrl} from "./baseUrl";

const cookies = new Cookie();

export default async function fetchAccessToken(): Promise<string> {
    const url = `${baseUrl}/token`;
    const logout = cookies.get("loggedOut");
    const query = {flo: logout};
    const urlWithQuery = queryString.stringifyUrl({url, query});

    const response = await fetch(urlWithQuery, {
        credentials: "include"
    });

    if (response.status >= 400) {
        throw new Error("forbidden");
    }

    const data = await response.json();
    return data.accessToken;
}
