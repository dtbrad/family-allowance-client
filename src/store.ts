import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userDetailReducer from "slices/userDetail/userDetailReducer";
import usersReducer from "slices/users/usersReducer";
import appStatusReducer from "./slices/appStatus/appStatusReducer";

export const store = configureStore({
    reducer: {
        appStatus: appStatusReducer,
        userDetail: userDetailReducer,
        users: usersReducer
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
