import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";
import {isTokenValid} from "helpers/tokenService";

export const selectAppStatusState = (state: RootState) => state.appStatus;

export const selectUserRole = createSelector(selectAppStatusState, ({role}) => role);

export const selectUserId = createSelector(selectAppStatusState, ({userId}) => userId);

export const selectAccessToken = createSelector(selectAppStatusState, ({accessToken}) => accessToken);

export const selectIsAccessTokenValid = createSelector(selectAccessToken, (token) => isTokenValid(token));

export const selectInitializationStatus = createSelector(
    selectAppStatusState,
    ({initializationStatus}) => initializationStatus
);

export const selectIsLoggedIn = createSelector(selectAppStatusState, ({isLoggedIn}) => isLoggedIn);

export const selectLoginLoadingStatus = createSelector(
    selectAppStatusState,
    ({loginLoadingStatus}) => loginLoadingStatus
);

export const selectLogoutLoadingStatus = createSelector(
    selectAppStatusState,
    ({logoutLoadingStatus}) => logoutLoadingStatus
);
