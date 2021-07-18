import {baseUrl} from "data/baseUrl";
import {Role} from "types";
import generateValidJwt from "./generateValidJwt";
import {rest} from "./testServer";

interface GenerateLoginResponseParams {
    userId?: string;
    role?: Role;
    error?: boolean
}

export default function handleLoginPostRequest({
    userId = "bill",
    role = Role.admin,
    error
}: GenerateLoginResponseParams) {
    let status: number;
    let json: any;

    if (error) {
        status = 401;
    } else {
        status = 200;
        json = {accessToken: generateValidJwt(userId, role)};
    }

    return rest.post(
        `${baseUrl}/signin`,
        function (req, res, ctx) {
            return res(
                ctx.status(status),
                ctx.json(json)
            );
        }
    );
}
