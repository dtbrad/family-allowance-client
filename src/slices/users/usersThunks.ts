import {fetchUsers, postUser} from "data";
import {AppThunk} from "store";
import {AsyncStatus, User} from "types";
import {selectAccessToken, selectIsAccessTokenValid} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    didInitializedUsers,
    didUpdateUsers,
    failedToInitializedUsers,
    failedToUpdateUsers,
    willInitializeUsers,
    willUpdateUsers
} from "./usersReducer";
import {selectUsersInitializationStatus} from "./usersSelectors";

export function initializeUsers(): AppThunk {
    return async function (dispatch, getState) {
        const pageStatus = selectUsersInitializationStatus(getState());
        if (pageStatus === AsyncStatus.resolved) {
            return;
        }
        await dispatch(willInitializeUsers());
        await dispatch(getCurrentAccessToken());

        if (!selectIsAccessTokenValid(getState())) {
            return await dispatch(failedToInitializedUsers());
        }

        const accessToken = selectAccessToken(getState());

        try {
            const users = await fetchUsers(accessToken);

            await dispatch(didInitializedUsers(users));
        } catch (error) {
            await dispatch(failedToInitializedUsers());
        }
    };
}


export function updateUsers(newUser: User): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(getCurrentAccessToken());

        if (!selectIsAccessTokenValid(getState())) {
            return;
        }

        const accessToken = selectAccessToken(getState());

        await dispatch(willUpdateUsers());

        try {
            await postUser(newUser, accessToken);
            const users = await fetchUsers(accessToken);
            await dispatch(didUpdateUsers(users));
        } catch (error) {
            await dispatch(failedToUpdateUsers());
        }
    };
}
