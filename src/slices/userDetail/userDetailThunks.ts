import fetchUserSummary from "data/fetchUser";
import {AppThunk} from "store";
import {
    selectAccessToken,
    selectIsAccessTokenValid
} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    willInitializeUser,
    didInitializeUser,
    failedToInitializeUser
} from "./userDetailReducer";

export function initializeUserSummary(userId: string): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(willInitializeUser());

        await dispatch(getCurrentAccessToken());

        if (!selectIsAccessTokenValid(getState())) {
            await dispatch(failedToInitializeUser());
        }

        const accessToken = selectAccessToken(getState());

        try {
            const user = await fetchUserSummary(userId, accessToken);

            return await dispatch(didInitializeUser(user));
        } catch (error) {
            await dispatch(failedToInitializeUser());
        }
    };
}
