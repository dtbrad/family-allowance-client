
import {createSlice} from "@reduxjs/toolkit";
import sleep from "helpers/sleep";
import {AppThunk} from "store";
import {AsyncStatus} from "types";

export interface AppStatusState {
    isLoggedIn?: boolean;
    initializationStatus?: AsyncStatus;
}

const initialState: AppStatusState = {
    initializationStatus: AsyncStatus.idle,
    isLoggedIn: false
};

export function initializeApp(): AppThunk {
    return async function (dispatch) {
        dispatch(willInitializeApp());
        await sleep(500);
        dispatch(didInitializeApp());
    };
}

export const appStatusSlice = createSlice({
    name: "appStatus",
    initialState,
    reducers: {
        willInitializeApp: function (state) {
            state.initializationStatus = AsyncStatus.pending;
        },
        didInitializeApp: function (state) {
            state.initializationStatus = AsyncStatus.resolved;
            state.isLoggedIn = true;
        }
    }
});

export const {
    willInitializeApp,
    didInitializeApp
} = appStatusSlice.actions;

export default appStatusSlice.reducer;
