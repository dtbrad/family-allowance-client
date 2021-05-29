import {createSlice} from "@reduxjs/toolkit";
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
        didInitializedUsers: function (state, {payload}) {
            state.usersInitializationState = AsyncStatus.resolved;
            state.users = payload;
        },
        failedToInitializedUsers: function (state) {
            state.usersInitializationState = AsyncStatus.rejected;
        },
        willUpdateUsers: function (state) {
            state.updateUsersStatus = AsyncStatus.pending;
        },
        didUpdateUsers: function (state, {payload}) {
            state.users = payload;
            state.updateUsersStatus = AsyncStatus.resolved;
        },
        failedToUpdateUsers: function (state) {
            state.updateUsersStatus = AsyncStatus.rejected;
        }
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
});

export const {
    willInitializeUsers,
    didInitializedUsers,
    failedToInitializedUsers,
    willUpdateUsers,
    didUpdateUsers,
    failedToUpdateUsers
} = usersSlice.actions;

export default usersSlice.reducer;
