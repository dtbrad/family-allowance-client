import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "store";

export const selectUsersState = (state: RootState) => state.users;

export const selectUsersInitializationStatus = createSelector(
    selectUsersState,
    ({usersInitializationState}) => usersInitializationState
);

export const selectUpdateUsersStatus = createSelector(
    selectUsersState,
    ({updateUsersStatus}) => updateUsersStatus
);

export const selectUsers = createSelector(selectUsersState, ({users}) => users);
