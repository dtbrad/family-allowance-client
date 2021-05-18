import {baseUrl} from "./baseUrl";
import sleep from "../helpers/sleep";

export default async function fetchLogout() {
    await sleep(500);
    const {status} = await fetch(`${baseUrl}/signout`, {credentials: "include"});

    if (status !== 200) {
        throw new Error("failed logout");
    }
}
