import {baseUrl} from "data/baseUrl";
import {Role} from "types";
import generateValidJwt from "./generateValidJwt";
import {rest} from "./testServer";

interface GenerateAdminFetchTokenResponseParams {
    userId?: string;
    role?: Role;
    error?: boolean
}

export default function handleTokenFetchRequest({
    userId = "jim",
    role = Role.standard,
    error = false
}: GenerateAdminFetchTokenResponseParams) {
    let status: number;
    let json: any;

    if (error) {
        status = 401;
    } else {
        status = 200;
        json = {accessToken: generateValidJwt(userId, role)};
    }

    return rest.get(`${baseUrl}/token`, function (_req, res, ctx) {
        return res(
            ctx.status(status),
            ctx.json(json)
        );
    });
}
