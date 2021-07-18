import {createMemoryHistory, MemoryHistory} from "history";
import {handleTokenFetchRequest, handleLogoutFetchRequest, server} from "testInfrastructure/mockServer";
import renderWithStore from "testInfrastructure/renderWithStore";
import {Role} from "types";
import App from "../App";
import {screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cookie from "universal-cookie";

const cookies = new Cookie();

describe("App Logout", function () {
    let history: MemoryHistory;

    beforeEach(function () {
        history = createMemoryHistory();
    });

    describe("When clicking the logout button", function () {
        beforeEach(function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.standard}));
        });

        it("should handle a successful logout fetch request", async function () {
            server.use(handleLogoutFetchRequest());
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByTestId("standard-user-detail-page")).toBeInTheDocument();
            });

            const logoutButton = screen.getByTestId("logout-button");
            userEvent.click(logoutButton);

            await waitFor(function () {
                expect(screen.queryByText("Log Out")).toBeNull();
                expect(screen.getByText("Logging out...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Logging out...")).toBeNull();
                expect(screen.getByTestId("login-page")).toBeInTheDocument();
                expect(cookies.get("loggedOut")).toBe(undefined);
            });
        });

        it("should set a logout cookie on a failed logout fetch request", async function () {
            server.use(handleLogoutFetchRequest(500));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByTestId("standard-user-detail-page")).toBeInTheDocument();
            });

            const logoutButton = screen.getByTestId("logout-button");
            userEvent.click(logoutButton);

            await waitFor(function () {
                expect(screen.queryByText("Log Out")).toBeNull();
                expect(screen.getByText("Logging out...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Logging out...")).toBeNull();
                expect(screen.getByTestId("login-page")).toBeInTheDocument();
                expect(cookies.get("loggedOut")).toBe("true");
            });
        });
    });

});
