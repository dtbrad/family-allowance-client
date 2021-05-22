import {fetchAccessToken, fetchLogout, postLogin} from "data";
import {getRole, getUserId, isTokenValid} from "helpers/tokenService";
import {AppThunk} from "store";
import Cookie from "universal-cookie";
import {
    didConfirmHasAccess,
    didFailToGetCurrentAccessToken,
    didFailToGetCurrentAccessTokenWhileLoggedIn,
    didGetAccessTokenFromServer,
    didInitializeApp,
    didLogin,
    didLogOut,
    failedToLogin,
    failedToLogOut,
    willInitializeApp,
    willLogin,
    willLogOut
} from "./appStatusReducer";
import {selectAccessToken, selectIsLoggedIn} from "./appStatusSelectors";

const cookies = new Cookie();

export function initializeApp(): AppThunk {
    return async function (dispatch) {
        dispatch(willInitializeApp());
        await dispatch(getCurrentAccessToken());
        dispatch(didInitializeApp());
    };
}

export function getCurrentAccessToken(): AppThunk {
    return async function (dispatch, getState) {
        let accessToken = selectAccessToken(getState());

        if (isTokenValid(accessToken)) {
            return dispatch(didConfirmHasAccess());
        }

        try {
            const accessToken = await fetchAccessToken();
            const role = getRole(accessToken);
            const userId = getUserId(accessToken);

            return dispatch(didGetAccessTokenFromServer({
                accessToken,
                role,
                userId
            }));
        } catch (error) {
            return selectIsLoggedIn(getState())
                ? dispatch(didFailToGetCurrentAccessTokenWhileLoggedIn())
                : dispatch(didFailToGetCurrentAccessToken());
        }
    };
}

export function loginUser(userId: string, password: string): AppThunk {
    return async function (dispatch) {
        await dispatch(willLogin());

        try {
            const accessToken = await postLogin(userId, password);
            const role = getRole(accessToken);
            cookies.remove("loggedOut");

            return dispatch(didLogin({accessToken, userId, role}));
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

            return await dispatch(failedToLogOut());
        }
    };
}
