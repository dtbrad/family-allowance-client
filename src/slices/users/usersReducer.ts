import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncStatus, UserSummariesById} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";
import {didUpdateUserDetail} from "../userDetail/userDetailReducer";

export interface UsersState {
    usersInitializationStatus: AsyncStatus;
    usersUpdateStatus: AsyncStatus;
    users: {
        userIds: string[];
        usersById: UserSummariesById
    }
}

const initialState: UsersState = {
    usersInitializationStatus: AsyncStatus.idle,
    usersUpdateStatus: AsyncStatus.idle,
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
        },
        willUpdateUsers: function (state) {
            state.usersUpdateStatus = AsyncStatus.pending;
        },
        didUpdateUsers: function (state, {payload}: PayloadAction<UsersPayload>) {
            state.users.usersById = payload.userSummariesById;
            state.users.userIds = payload.userIds;
            state.usersUpdateStatus = AsyncStatus.resolved;
        },
        failedToUpdateUsers: function (state) {
            state.usersUpdateStatus = AsyncStatus.rejected;
        },
        didResetUpdateUsersStatus: function (state) {
            state.usersUpdateStatus = AsyncStatus.idle;
        }
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
        .addCase(didUpdateUserDetail, function (state, {payload}) {
            if (state.users.usersById[payload.userId]) {
                state.users.usersById[payload.userId].balance = payload.balance;
            }
        })
});

export const {
    willInitializeUsers,
    didInitializedUsers,
    failedToInitializedUsers,
    willUpdateUsers,
    didUpdateUsers,
    failedToUpdateUsers,
    didResetUpdateUsersStatus
} = usersSlice.actions;

export default usersSlice.reducer;
