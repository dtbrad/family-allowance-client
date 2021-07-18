
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
    userId?: string;
}

export default function handleUserDetailFetchRequest({
    status = 200,
    userDetail = defaultUserDetail,
    userId = "Daniel"
}: GenerateUserDetailResponseParams) {
    return rest.get(
        `${baseUrl}/users/${userId}`,
        function (req, res, ctx) {
            return res(
                ctx.status(status),
                ctx.json(userDetail)
            );
        }
    );
}
