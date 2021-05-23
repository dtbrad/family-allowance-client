import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectUserState = (state: RootState) => state.userDetail;

export const selectUserInitializationStatus = createSelector(
    selectUserState,
    ({userDetailInitializationState}) => userDetailInitializationState
);

export const selectUpdateUserStatus = createSelector(
    selectUserState,
    ({updateUserDetailStatus}) => updateUserDetailStatus
);

export const selectUser = createSelector(selectUserState, ({user}) => user);

export const selectUserId = createSelector(selectUser, (user) => user?.userId);

export const selectUserIdForSelectedUser = createSelector(selectUser, (user) => user?.userId);

export const selectUserTransactions = createSelector(selectUser, (user) => user?.transactions);

export const selectUserBalance = createSelector(selectUser, (user) => user?.balance);
