import {createSlice} from "@reduxjs/toolkit";
import {AsyncStatus, Role} from "types";

export interface AppStatusState {
    isLoggedIn?: boolean;
    initializationStatus?: AsyncStatus;
    accessToken?: string;
    role?: Role;
    userId?: string;
    tokenLoadingStatus?: AsyncStatus;
    forcedToLogOut?: boolean;
    loginLoadingStatus?: AsyncStatus;
    logoutLoadingStatus?: AsyncStatus;
}

const initialState: AppStatusState = {
    initializationStatus: AsyncStatus.idle,
    isLoggedIn: false
};

const appStatusSlice = createSlice({
    name: "appStatus",
    initialState,
    reducers: {
        willInitializeApp: function (state) {
            state.initializationStatus = AsyncStatus.pending;
        },
        didInitializeApp: function (state) {
            state.initializationStatus = AsyncStatus.resolved;
        },
        didConfirmHasAccess: (state) => state,
        didGetAccessTokenFromServer: function (state, {payload}) {
            const {accessToken, role, userId} = payload;
            state.accessToken = accessToken;
            state.role = role;
            state.userId = userId;
            state.isLoggedIn = true;
            state.tokenLoadingStatus = AsyncStatus.resolved;
        },
        didFailToGetCurrentAccessToken: function (state) {
            state.isLoggedIn = false;
            state.tokenLoadingStatus = AsyncStatus.rejected;
        },
        didFailToGetCurrentAccessTokenWhileLoggedIn: function (state) {
            state.isLoggedIn = false;
            state.tokenLoadingStatus = AsyncStatus.rejected;
            state.forcedToLogOut = true;
        },
        willLogin: function (state) {
            state.loginLoadingStatus = AsyncStatus.pending;
        },
        didLogin: function (state, {payload}) {
            const {accessToken, role, userId} = payload;

            state.isLoggedIn = true;
            state.loginLoadingStatus = AsyncStatus.resolved;
            state.tokenLoadingStatus = AsyncStatus.idle;
            state.accessToken = accessToken;
            state.role = role;
            state.userId = userId;
        },
        failedToLogin: function (state) {
            state.isLoggedIn = false;
            state.loginLoadingStatus = AsyncStatus.rejected;
        },
        willLogOut: function (state) {
            state.logoutLoadingStatus = AsyncStatus.pending;
        },
        didLogOut: function (state) {
            state.logoutLoadingStatus = AsyncStatus.resolved;
            state.isLoggedIn = false;
        },
        failedToLogOut: function (state) {
            state.isLoggedIn = false;
            state.logoutLoadingStatus = AsyncStatus.rejected;
        }
    }
});

export const {
    willInitializeApp,
    didInitializeApp,
    didConfirmHasAccess,
    didGetAccessTokenFromServer,
    didFailToGetCurrentAccessToken,
    didFailToGetCurrentAccessTokenWhileLoggedIn,
    willLogin,
    didLogin,
    failedToLogin,
    willLogOut,
    didLogOut,
    failedToLogOut
} = appStatusSlice.actions;

export default appStatusSlice.reducer;
