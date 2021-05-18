
import {createSelector, createSlice} from "@reduxjs/toolkit";
import sleep from "helpers/sleep";
import {AsyncStatus} from "types";
import {AppThunk, RootState} from "../store";

export interface AppStatusState {
    isLoggedIn?: boolean;
    initializationStatus?: AsyncStatus;
}

const initialState: AppStatusState = {
    initializationStatus: AsyncStatus.idle,
    isLoggedIn: false
};

export const selectAppStatusState = (state: RootState) => state.appStatus;
export const selectInitializationStatus = createSelector(
    selectAppStatusState,
    ({initializationStatus}) => initializationStatus
);
export const selectIsLoggedIn = createSelector(selectAppStatusState, ({isLoggedIn}) => isLoggedIn);

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
