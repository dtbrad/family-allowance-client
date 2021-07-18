import {fetchUsers, postUser} from "data";
import {AppThunk} from "store";
import {AsyncStatus, NewUserArgs, UserSummary, UserSummariesById} from "types";
import {selectAccessToken} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    didInitializedUsers,
    didUpdateUsers,
    failedToInitializedUsers,
    failedToUpdateUsers,
    willInitializeUsers,
    willUpdateUsers,
    UsersPayload
} from "./usersReducer";
import {selectUsersInitializationStatus} from "./usersSelectors";
import {isTokenValid} from "helpers/tokenService";

function normalizeUsersData(userSummaries: UserSummary[]): UsersPayload {
    const userSummariesById = userSummaries.reduce(
        function (target: UserSummariesById, userSummary: UserSummary) {
            target[userSummary.userId] = userSummary;
            return target;
        }, {}
    );

    const userIds = userSummaries
        .map(({userId}) => userId)
        .sort((a, b) => a.localeCompare(b));

    return {userSummariesById, userIds};
}

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

            const {userIds, userSummariesById} = normalizeUsersData(users);

            await dispatch(didInitializedUsers({userSummariesById, userIds}));
        } catch (error) {
            await dispatch(failedToInitializedUsers());
        }
    };
}

export function updateUsers(newUserArgs: NewUserArgs): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(getCurrentAccessToken());

        const accessToken = selectAccessToken(getState()) as string;

        if (!isTokenValid(accessToken)) {
            return;
        }

        await dispatch(willUpdateUsers());

        try {
            const users = await postUser(newUserArgs, accessToken);

            const {userIds, userSummariesById} = normalizeUsersData(users);

            await dispatch(didUpdateUsers({userSummariesById, userIds}));
        } catch (error) {
            await dispatch(failedToUpdateUsers());
        }
    };
}
