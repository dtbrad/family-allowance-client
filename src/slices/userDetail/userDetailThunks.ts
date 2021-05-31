import {fetchUser, postTransaction} from "data";
import {isTokenValid} from "helpers/tokenService";
import {AppThunk} from "store";
import {Transaction} from "types";
import {selectAccessToken} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    didAddTransaction,
    didInitializeUser,
    failedToAddTransaction,
    failedToInitializeUser,
    willAddTransaction, willInitializeUser
} from "./userDetailReducer";

export function initializeUserSummary(userId: string): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(willInitializeUser());

        await dispatch(getCurrentAccessToken());

        const accessToken = selectAccessToken(getState());

        if (!isTokenValid(accessToken)) {
            await dispatch(failedToInitializeUser());
        }

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

        const accessToken = selectAccessToken(getState());

        if (!isTokenValid(accessToken)) {
            return;
        }

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
