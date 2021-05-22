import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import appStatusReducer from "slices/appStatus/appStatusReducer";
import userDetailReducer from "slices/userDetail/userDetailReducer";
import usersReducer from "slices/users/usersReducer";

export const store = configureStore({
    reducer: {
        appStatus: appStatusReducer,
        users: usersReducer,
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
