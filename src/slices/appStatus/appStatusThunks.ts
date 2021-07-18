import {getRole, getUserId, isTokenValid} from "helpers/tokenService";
import {AppThunk} from "store";
import Cookie from "universal-cookie";
import {fetchAccessToken, fetchLogout, postLogin} from "../../data";
import {
    didConfirmHasAccess,
    didFailToGetCurrentAccessToken,
    didGetAccessTokenFromServer,
    didInitializeApp,
    didLogin,
    didLogOut,
    failedToLogin,
    logoutFetchFailed,
    willGetAccessTokenFromServer,
    willInitializeApp,
    willLogin,
    willLogOut
} from "./appStatusReducer";
import {selectAccessToken} from "./appStatusSelectors";

const cookies = new Cookie();

export function getCurrentAccessToken(): AppThunk {
    return async function (dispatch, getState) {
        let accessToken = selectAccessToken(getState());

        if (isTokenValid(accessToken)) {
            return dispatch(didConfirmHasAccess());
        }

        dispatch(willGetAccessTokenFromServer());

        try {
            const accessToken = await fetchAccessToken();

            const role = getRole(accessToken);
            const userId = getUserId(accessToken);

            return dispatch(didGetAccessTokenFromServer({
                role,
                userId,
                accessToken
            }));
        } catch (error) {
            return dispatch(didFailToGetCurrentAccessToken());
        }
    };
}

export function initializeApp(): AppThunk {
    return async function (dispatch) {
        dispatch(willInitializeApp());
        await dispatch(getCurrentAccessToken());
        dispatch(didInitializeApp());
    };
}

export function loginUser(userId: string, password: string): AppThunk {
    return async function (dispatch) {
        await dispatch(willLogin());

        try {
            const accessToken = await postLogin(userId, password);
            const role = getRole(accessToken);
            cookies.remove("loggedOut");

            return dispatch(didLogin({userId, role, accessToken}));
        } catch (error) {
            return dispatch(failedToLogin());
        }
    };
}

export function logOutUser(): AppThunk {
    return async function (dispatch) {
        await dispatch(willLogOut());
        try {
            await fetchLogout();

            return await dispatch(didLogOut());
        } catch (error) {
            const date = new Date();
            date.setDate(date.getDate() + 9000);
            cookies.set("loggedOut", true, {expires: date});

            return await dispatch(logoutFetchFailed());
        }
    };
}
