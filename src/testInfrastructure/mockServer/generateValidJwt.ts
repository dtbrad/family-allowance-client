import jwt from "jsonwebtoken";
import {Role} from "types";

export default function generateValidJWT(userId: string, role: Role) {
    return jwt.sign(
        {
            userId,
            role,
            exp: Math.floor(Date.now() / 1000) + 300
        },
        "some-secret"
    );
}
