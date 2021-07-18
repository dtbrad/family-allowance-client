import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncStatus, UserSummariesById} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";

export interface UsersState {
    usersInitializationStatus: AsyncStatus;
    users: {
        userIds: string[];
        usersById: UserSummariesById
    }
}

const initialState: UsersState = {
    usersInitializationStatus: AsyncStatus.idle,
    users: {
        userIds: [],
        usersById: {}
    }
};

export interface UsersPayload {
    userIds: string[];
    userSummariesById: UserSummariesById;
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        willInitializeUsers: function (state) {
            state.usersInitializationStatus = AsyncStatus.pending;
        },
        didInitializedUsers: function (state, {payload}: PayloadAction<UsersPayload>) {
            state.usersInitializationStatus = AsyncStatus.resolved;
            state.users.userIds = payload.userIds;
            state.users.usersById = payload.userSummariesById;
        },
        failedToInitializedUsers: function (state) {
            state.usersInitializationStatus = AsyncStatus.rejected;
        }
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
});

export const {
    willInitializeUsers,
    didInitializedUsers,
    failedToInitializedUsers
} = usersSlice.actions;

export default usersSlice.reducer;
