import {createSlice} from "@reduxjs/toolkit";
import {AsyncStatus, User} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";

export interface UserState {
    userDetailInitializationState?: AsyncStatus;
    updateUserDetailStatus?: AsyncStatus
    user?: User;
}

const initialState: UserState = {};

export const userSummarySlice = createSlice({
    name: "userSummary",
    initialState,
    reducers: {
        willInitializeUser: function (state) {
            state.userDetailInitializationState = AsyncStatus.pending;
        },
        didInitializeUser: function (state, {payload}) {
            state.userDetailInitializationState = AsyncStatus.resolved;
            state.updateUserDetailStatus = AsyncStatus.idle;
            state.user = payload;
        },
        failedToInitializeUser: function (state) {
            state.userDetailInitializationState = AsyncStatus.rejected;
        },
        willAddTransaction: function (state) {
            state.updateUserDetailStatus = AsyncStatus.pending;
        },
        didAddTransaction: function (state, {payload}) {
            state.updateUserDetailStatus = AsyncStatus.resolved;
            state.user = payload;
        },
        failedToAddTransaction: function (state) {
            state.updateUserDetailStatus = AsyncStatus.rejected;
        },
        didResetUserUpdate: function (state) {
            state.updateUserDetailStatus = AsyncStatus.idle;
        }
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
});

export const {
    willInitializeUser,
    didInitializeUser,
    failedToInitializeUser,
    didResetUserUpdate,
    willAddTransaction,
    didAddTransaction,
    failedToAddTransaction
} = userSummarySlice.actions;

export default userSummarySlice.reducer;