import {createSlice} from "@reduxjs/toolkit";
import {AsyncStatus, User} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";

export interface UsersState {
    usersInitializationState?: AsyncStatus;
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
