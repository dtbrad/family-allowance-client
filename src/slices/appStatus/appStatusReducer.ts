import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncStatus, AuthenticatedUser} from "types";

export interface AppStatusState {
    appInitializationStatus: AsyncStatus;
    tokenLoadingStatus?: AsyncStatus;
    loginLoadingStatus?: AsyncStatus;
    logoutLoadingStatus?: AsyncStatus;
    authenticatedUser?: AuthenticatedUser
}

const initialState: AppStatusState = {
    appInitializationStatus: AsyncStatus.idle,
    tokenLoadingStatus: AsyncStatus.idle,
    loginLoadingStatus: AsyncStatus.idle,
    logoutLoadingStatus: AsyncStatus.idle,
    authenticatedUser: undefined
};

const appStatusSlice = createSlice({
    name: "appStatus",
    initialState,
    reducers: {
        willInitializeApp: function (state) {
            state.appInitializationStatus = AsyncStatus.pending;
        },
        didInitializeApp: function (state) {
            state.appInitializationStatus = AsyncStatus.resolved;
        },
        didConfirmHasAccess: (state) => state,
        willGetAccessTokenFromServer: function (state) {
            state.tokenLoadingStatus = AsyncStatus.pending;
        },
        didGetAccessTokenFromServer: function (state, action: PayloadAction<AuthenticatedUser>) {
            state.authenticatedUser = action.payload;
            state.tokenLoadingStatus = AsyncStatus.resolved;
        },
        didFailToGetCurrentAccessToken: function (state) {
            state.authenticatedUser = undefined;
            state.tokenLoadingStatus = AsyncStatus.rejected;
        },
        willLogin: function (state) {
            state.loginLoadingStatus = AsyncStatus.pending;
        },
        didLogin: function (state, action: PayloadAction<AuthenticatedUser>) {
            state.authenticatedUser = action.payload;
            state.loginLoadingStatus = AsyncStatus.resolved;
        },
        failedToLogin: function (state) {
            state.authenticatedUser = undefined;
            state.loginLoadingStatus = AsyncStatus.rejected;
        },
        willLogOut: function (state) {
            state.logoutLoadingStatus = AsyncStatus.pending;
        },
        didLogOut: function (state) {
            state.logoutLoadingStatus = AsyncStatus.resolved;
            state.authenticatedUser = undefined;
        },
        logoutFetchFailed: function (state) {
            state.authenticatedUser = undefined;
            state.logoutLoadingStatus = AsyncStatus.rejected;
        }
    }
});

export const {
    willInitializeApp,
    didInitializeApp,
    didConfirmHasAccess,
    willGetAccessTokenFromServer,
    didGetAccessTokenFromServer,
    didFailToGetCurrentAccessToken,
    willLogin,
    didLogin,
    failedToLogin,
    willLogOut,
    didLogOut,
    logoutFetchFailed
} = appStatusSlice.actions;

export default appStatusSlice.reducer;
