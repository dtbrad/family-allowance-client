import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import appStatusReducer from "slices/appStatus/appStatusReducer";
import userDetailReducer from "slices/userDetail/userDetailReducer";

export const store = configureStore({
    reducer: {
        appStatus: appStatusReducer,
        userDetail: userDetailReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
