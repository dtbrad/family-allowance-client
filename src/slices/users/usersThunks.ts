import {fetchUsers} from "data";
import {AppThunk} from "store";
import {AsyncStatus, UserSummary, UserSummariesById} from "types";
import {selectAccessToken} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    didInitializedUsers,
    failedToInitializedUsers,
    willInitializeUsers
} from "./usersReducer";
import {selectUsersInitializationStatus} from "./usersSelectors";
import {isTokenValid} from "helpers/tokenService";

export function initializeUsers(): AppThunk {
    return async function (dispatch, getState) {
        const pageStatus = selectUsersInitializationStatus(getState());

        if (pageStatus === AsyncStatus.resolved) {
            return;
        }

        await dispatch(getCurrentAccessToken());

        const accessToken = selectAccessToken(getState());

        if (!isTokenValid(accessToken)) {
            return await dispatch(failedToInitializedUsers());
        }

        await dispatch(willInitializeUsers());

        try {
            const users = await fetchUsers(accessToken as string);

            const userSummariesById = users.reduce(
                function (target: UserSummariesById, userSummary: UserSummary) {
                    target[userSummary.userId] = userSummary;
                    return target;
                }, {}
            );

            const userIds = users.map(({userId}) => userId);


            await dispatch(didInitializedUsers({userSummariesById, userIds}));
        } catch (error) {
            await dispatch(failedToInitializedUsers());
        }
    };
}
