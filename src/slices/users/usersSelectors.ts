import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectUsersState = (state: RootState) => state.users;

export const selectUsersInitializationStatus = createSelector(
    selectUsersState,
    ({usersInitializationStatus}) => usersInitializationStatus
);

export const selectUsers = createSelector(selectUsersState, (usersState) => usersState?.users);

export const selectUserIds = createSelector(selectUsers, (users) => users.userIds);

export const selectUsersById = createSelector(selectUsers, (users) => users.usersById);

export const selectUsersArray = createSelector(
    selectUserIds,
    selectUsersById,
    (userIds, usersById) => userIds.map((userId) => usersById[userId])
);
