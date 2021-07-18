import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncStatus, UserDetail} from "types";
import {didLogOut} from "../appStatus/appStatusReducer";

export interface UserDetailState {
    userDetailInitializationStatus: AsyncStatus;
    userDetailUpdateStatus: AsyncStatus;
    userDetail?: UserDetail;
    loadingMessage?: string;
}

const initialState: UserDetailState = {
    userDetailInitializationStatus: AsyncStatus.idle,
    userDetailUpdateStatus: AsyncStatus.idle,
    userDetail: undefined,
    loadingMessage: undefined
};

export const userDetailSlice = createSlice({
    name: "userDetail",
    initialState,
    reducers: {
        willInitializeUserDetail: function (state) {
            state.userDetailInitializationStatus = AsyncStatus.pending;
            state.loadingMessage = "Initializing User Detail...";
        },
        didInitializeUserDetail: function (state, action: PayloadAction<UserDetail>) {
            state.userDetailInitializationStatus = AsyncStatus.resolved;
            state.userDetail = action.payload;
        },
        failedToInitializeUserDetail: function (state) {
            state.userDetailInitializationStatus = AsyncStatus.rejected;
        },
        willUpdateUserDetail: function (state) {
            state.userDetailUpdateStatus = AsyncStatus.pending;
        },
        didUpdateUserDetail: function (state, action: PayloadAction<UserDetail>) {
            state.userDetailUpdateStatus = AsyncStatus.resolved;
            state.userDetail = action.payload;
        },
        failedToUpdateUserDetail: function (state) {
            state.userDetailUpdateStatus = AsyncStatus.rejected;
        },
        didResetUserDetailUpdateStatus: function (state) {
            state.userDetailUpdateStatus = AsyncStatus.idle;
        }
    },
    extraReducers: (builder) => builder
        .addCase(didLogOut, () => initialState)
});

export const {
    willInitializeUserDetail,
    didInitializeUserDetail,
    failedToInitializeUserDetail,
    willUpdateUserDetail,
    didUpdateUserDetail,
    failedToUpdateUserDetail,
    didResetUserDetailUpdateStatus
} = userDetailSlice.actions;

export default userDetailSlice.reducer;
