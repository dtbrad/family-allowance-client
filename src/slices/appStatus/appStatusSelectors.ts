import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";
import {AsyncStatus} from "types";

export const selectAppStatusState = (state: RootState) => state.appStatus;

export const selectAppInitializationStatus = createSelector(
    selectAppStatusState,
    ({appInitializationStatus}) => appInitializationStatus
);

export const selectAuthenticatedUser = createSelector(
    selectAppStatusState,
    ({authenticatedUser}) => authenticatedUser
);

export const selectAuthenticatedUserId = createSelector(
    selectAuthenticatedUser,
    (authenticatedUser) => authenticatedUser?.userId
);

export const selectAuthenticatedUserRole = createSelector(
    selectAuthenticatedUser,
    (authenticatedUser) => authenticatedUser?.role
);

export const selectAccessToken = createSelector(
    selectAuthenticatedUser,
    (authenticatedUser) => authenticatedUser?.accessToken
);

export const selectLoginLoadingStatus = createSelector(
    selectAppStatusState,
    ({loginLoadingStatus}) => loginLoadingStatus
);

export const selectLogoutLoadingStatus = createSelector(
    selectAppStatusState,
    ({logoutLoadingStatus}) => logoutLoadingStatus
);

export const selectAppIsLoading = createSelector(
    selectAppInitializationStatus,
    selectLoginLoadingStatus,
    (appInitializationStatus, loginLoadingStatus) => (
        appInitializationStatus === AsyncStatus.pending ||
        loginLoadingStatus === AsyncStatus.pending
    )
);
