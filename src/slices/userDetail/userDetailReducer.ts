import {createSlice} from "@reduxjs/toolkit";
import {AsyncStatus, User} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";

export interface UserState {
    userDetailInitializationState?: AsyncStatus;
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
            console.log("^^^^^^^^^^^^^^^");
            console.log("UPDATING THE SELECTED USER");
            state.userDetailInitializationState = AsyncStatus.resolved;
            state.user = payload;
        },
        failedToInitializeUser: function (state) {
            state.userDetailInitializationState = AsyncStatus.rejected;
        },
        didResetUser: () => initialState
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
});

export const {
    willInitializeUser,
    didInitializeUser,
    failedToInitializeUser,
    didResetUser
} = userSummarySlice.actions;

export default userSummarySlice.reducer;
