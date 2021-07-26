
import {rest} from "./testServer";
import {baseUrl} from "data/baseUrl";
import {ServerUserDetailResponse} from "types";

const defaultUserDetail = {
    userId: "brutus",
    balance: 300,
    transactions: {
        entries: [
            {date: "2021-04-25T14:00:10.230Z", amount: 8, description: "some description"},
            {date: "2021-04-18T14:00:10.230Z", amount: 8, description: "some other description"}
        ]
    }
};

interface GenerateUserDetailResponseParams {
    status?: number;
    userDetail?: ServerUserDetailResponse;
    userId: string;
}

export default function handlePostTransactionRequest({
    status = 200,
    userDetail = defaultUserDetail,
    userId
}: GenerateUserDetailResponseParams) {
    return rest.post(
        `${baseUrl}/admin/users/${userId}/transactions/`,
        function (req, res, ctx) {
            if (status !== 200) {
                return res(
                    ctx.status(status)
                );
            };

            return res(
                ctx.status(status),
                ctx.json(userDetail)
            );
        }
    );
}
