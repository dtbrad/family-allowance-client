import {fetchUserDetail, postTransaction} from "data";
import {isTokenValid} from "helpers/tokenService";
import {AppThunk} from "store";
import {Transaction} from "types";
import {selectAccessToken, selectAuthenticatedUserId} from "../appStatus/appStatusSelectors";
import {getCurrentAccessToken} from "../appStatus/appStatusThunks";
import {
    didInitializeUserDetail,
    failedToInitializeUserDetail,
    willInitializeUserDetail,
    willUpdateUserDetail,
    didUpdateUserDetail,
    failedToUpdateUserDetail
} from "./userDetailReducer";

export function initializeUserDetail(userId?: string): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(willInitializeUserDetail());

        await dispatch(getCurrentAccessToken());

        const accessToken = selectAccessToken(getState());

        if (!isTokenValid(accessToken)) {
            await dispatch(failedToInitializeUserDetail());
        }

        const userIdToDetail = userId
            ? userId
            : selectAuthenticatedUserId(getState()) as string;

        try {
            const user = await fetchUserDetail(userIdToDetail, accessToken as string);

            return dispatch(didInitializeUserDetail(user));
        } catch (error) {
            await dispatch(failedToInitializeUserDetail());
        }
    };
}

export function updateUserDetail(userId: string, transaction: Transaction): AppThunk {
    return async function (dispatch, getState) {
        await dispatch(getCurrentAccessToken());

        const accessToken = selectAccessToken(getState());

        if (!isTokenValid(accessToken)) {
            return;
        }

        await dispatch(willUpdateUserDetail());

        try {
            const user = await postTransaction(userId, transaction, accessToken as string);

            await dispatch(didUpdateUserDetail(user));
        } catch (error) {
            await dispatch(failedToUpdateUserDetail());
        }
    };
}
