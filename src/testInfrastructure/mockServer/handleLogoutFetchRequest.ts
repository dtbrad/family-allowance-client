
import {baseUrl} from "data/baseUrl";
import {rest} from "./testServer";

export default function handleLogoutFetchRequest(status: number = 200) {
    return rest.get(`${baseUrl}/signout`, function (req, res, ctx) {
        return res(
            ctx.status(status)
        );
    });
}
