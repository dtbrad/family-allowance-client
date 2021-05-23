import {fetchUser, postTransaction} from "data";
import {AppThunk} from "store";
import {
    selectAccessToken,
    selectIsAccessTokenValid
} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    willInitializeUser,
    didInitializeUser,
    failedToInitializeUser,
    willAddTransaction,
    didAddTransaction,
    failedToAddTransaction
} from "./userDetailReducer";
import {Transaction} from "types";

export function initializeUserSummary(userId: string): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(willInitializeUser());

        await dispatch(getCurrentAccessToken());

        if (!selectIsAccessTokenValid(getState())) {
            await dispatch(failedToInitializeUser());
        }

        const accessToken = selectAccessToken(getState());

        try {
            const user = await fetchUser(userId, accessToken);

            return await dispatch(didInitializeUser(user));
        } catch (error) {
            await dispatch(failedToInitializeUser());
        }
    };
}

export function addTransaction(userId: string, transaction: Transaction): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(getCurrentAccessToken());

        if (!selectIsAccessTokenValid(getState())) {
            return;
        }

        const accessToken = selectAccessToken(getState());

        await dispatch(willAddTransaction());

        try {
            await postTransaction(userId, transaction, accessToken);
            const user = await fetchUser(userId, accessToken);

            await dispatch(didAddTransaction(user));
        } catch (error) {
            await dispatch(failedToAddTransaction());
        }
    };
}
