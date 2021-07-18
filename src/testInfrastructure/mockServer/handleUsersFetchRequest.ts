import {baseUrl} from "data/baseUrl";
import {UserSummary} from "types";
import {rest} from "./testServer";

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

export default function handleUsersFetchRequest({
    status = 200,
    users = defaultUserSummaries
}: GenerateUserDetailResponseParams) {
    return rest.get(
        `${baseUrl}/admin/users`,
        function (req, res, ctx) {

            if (status !== 200) {
                return res(
                    ctx.status(status)
                );
            };

            return res(
                ctx.status(status),
                ctx.json(users)
            );
        }
    );
}
