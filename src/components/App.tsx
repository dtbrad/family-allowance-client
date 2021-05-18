import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import React from "react";
import {initializeApp} from "slices/appStatus/appStatusThunks";
import {selectInitializationStatus, selectIsLoggedIn} from "slices/appStatus/appStatusSelectors";
import {AsyncStatus} from "types";
import "./App.less";

export default function App() {
    const dispatch = useAppDispatch();
    const initializationStatus = useAppSelector(selectInitializationStatus);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useDidMount(() => dispatch(initializeApp()));

    const loginMessage = isLoggedIn
        ? "You are logged in."
        : "You are not logged in.";

    if (initializationStatus !== AsyncStatus.resolved) {
        return <p>Loading...</p>;
    }

    return (
        <div className="app">
            <h1 className="app__title">React-Redux App</h1>
            <hr />
            <p className="app__login-message">{loginMessage}</p>
        </div>
    );
}
