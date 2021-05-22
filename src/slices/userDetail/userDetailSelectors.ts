import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectUserState = (state: RootState) => state.userDetail;

export const selectUserInitializationStatus = createSelector(
    selectUserState,
    ({userDetailInitializationState}) => userDetailInitializationState
);

export const selectUser = createSelector(selectUserState, ({user}) => user);

export const selectUserId = createSelector(selectUser, (user) => user?.userId);

export const selectUserIdForSelectedUser = createSelector(selectUser, (user) => user?.userId);

export const selectuserTransactions = createSelector(selectUser, (user) => user?.transactions);

export const selectuserBalance = createSelector(selectUser, (user) => user?.balance);
