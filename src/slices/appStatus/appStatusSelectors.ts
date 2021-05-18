import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectAppStatusState = (state: RootState) => state.appStatus;
export const selectUserRole = createSelector(selectAppStatusState, ({role}) => role);
export const selectAccessToken = createSelector(selectAppStatusState, ({accessToken}) => accessToken);
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
