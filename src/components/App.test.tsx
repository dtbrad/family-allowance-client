import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../store";
import App from "./App";

test("should initialize the page", async function () {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    await waitFor(function () {
        expect(screen.queryByText("Loading...")).toBeInTheDocument();
    });

    await waitFor(function () {
        expect(screen.queryByText("Loading...")).toBeNull();
        expect(screen.getByText("You are logged in.")).toBeInTheDocument();
    });
});
