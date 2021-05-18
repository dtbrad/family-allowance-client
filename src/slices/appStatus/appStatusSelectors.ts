
import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectAppStatusState = (state: RootState) => state.appStatus;
export const selectInitializationStatus = createSelector(
    selectAppStatusState,
    ({initializationStatus}) => initializationStatus
);
export const selectIsLoggedIn = createSelector(selectAppStatusState, ({isLoggedIn}) => isLoggedIn);
