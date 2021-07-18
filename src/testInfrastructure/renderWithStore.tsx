import {configureStore} from "@reduxjs/toolkit";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import appStatusReducer from "slices/appStatus/appStatusReducer";
import {MemoryHistory} from "history";
import {Router} from "react-router-dom";

interface RenderWithStoreParams {
    ui: JSX.Element,
    history: MemoryHistory<unknown>
    preloadedState?: Record<string, any>
}
export default function renderWithStore({ui, history, preloadedState}: RenderWithStoreParams) {
    const store = configureStore({
        reducer: {
            appStatus: appStatusReducer
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
