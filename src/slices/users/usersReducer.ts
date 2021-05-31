import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncStatus, User} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";

export interface UsersState {
    usersInitializationState?: AsyncStatus;
    updateUsersStatus?: AsyncStatus;
    users?: User[]
}

const initialState: UsersState = {};

export const usersSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        willInitializeUsers: function (state) {
            state.usersInitializationState = AsyncStatus.pending;
        },
        didInitializedUsers: function (state, action: PayloadAction<User[]>) {
            state.usersInitializationState = AsyncStatus.resolved;
            state.users = action.payload;
        },
        failedToInitializedUsers: function (state) {
            state.usersInitializationState = AsyncStatus.rejected;
        },
        willUpdateUsers: function (state) {
            state.updateUsersStatus = AsyncStatus.pending;
        },
        didUpdateUsers: function (state, action: PayloadAction<User[]>) {
            state.users = action.payload;
            state.updateUsersStatus = AsyncStatus.resolved;
        },
        failedToUpdateUsers: function (state) {
            state.updateUsersStatus = AsyncStatus.rejected;
        },
        didResetUpdateUsersStatus: function (state) {
            state.updateUsersStatus = AsyncStatus.idle;
        }
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
});

export const {
    willInitializeUsers,
    didInitializedUsers,
    failedToInitializedUsers,
    didResetUpdateUsersStatus,
    willUpdateUsers,
    didUpdateUsers,
    failedToUpdateUsers
} = usersSlice.actions;

export default usersSlice.reducer;
