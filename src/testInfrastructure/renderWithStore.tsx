import {configureStore} from "@reduxjs/toolkit";
import {render} from "@testing-library/react";
import {MemoryHistory} from "history";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import appStatusReducer from "slices/appStatus/appStatusReducer";
import userDetailReducer from "slices/userDetail/userDetailReducer";
import usersReducer from "slices/users/usersReducer";

interface RenderWithStoreParams {
    ui: JSX.Element,
    history: MemoryHistory<unknown>
    preloadedState?: Record<string, any>
}

export default function renderWithStore({ui, history, preloadedState}: RenderWithStoreParams) {
    const store = configureStore({
        reducer: {
            appStatus: appStatusReducer,
            userDetail: userDetailReducer,
            users: usersReducer
        },
        preloadedState
    });

    return render(
        <Provider store={store}>
            <Router history={history}>
                {ui}
            </Router>
        </Provider>
    );
}
