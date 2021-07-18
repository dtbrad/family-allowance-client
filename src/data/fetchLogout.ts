import sleep from "helpers/sleep";
import {baseUrl} from "./baseUrl";

export default async function fetchLogout() {
    await sleep(250);
    const {status} = await fetch(`${baseUrl}/signout`, {credentials: "include"});

    if (status !== 200) {
        throw new Error("failed logout");
    }
}
