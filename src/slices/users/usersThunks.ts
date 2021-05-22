import {fetchUsers} from "data";
import {AppThunk} from "store";
import {AsyncStatus} from "types";
import {
    selectAccessToken,
    selectIsAccessTokenValid
} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {selectUsersInitializationStatus} from "./usersSelectors";
import {
    willInitializeUsers,
    didInitializedUsers,
    failedToInitializedUsers
} from "./usersReducer";

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
