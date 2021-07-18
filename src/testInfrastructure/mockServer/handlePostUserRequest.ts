import {rest} from "./testServer";
import {baseUrl} from "data/baseUrl";
import {UserSummary} from "types";

const defaultUserSummaries: UserSummary[] = [
    {
        userId: "daniel",
        balance: 0,
        allowanceAmount: 10,
        dayPreference: "Monday"
    },
    {
        userId: "john",
        balance: 200,
        allowanceAmount: 15,
        dayPreference: "Tuesday"
    }
];

interface GenerateUserDetailResponseParams {
    status?: number;
    users?: UserSummary[];
}

export default function handlePostUserRequest({
    status = 200,
    users = defaultUserSummaries
}: GenerateUserDetailResponseParams) {
    return rest.post(
        `${baseUrl}/admin/users`,
        function (req, res, ctx) {
            return res(
                ctx.status(status),
                ctx.json(users)
            );
        }
    );
}
