import {screen, Screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {createMemoryHistory, MemoryHistory} from "history";
import {
    handleLoginPostRequest,
    handleTokenFetchRequest,
    handleUsersFetchRequest,
    server
} from "testInfrastructure/mockServer";
import renderWithStore from "testInfrastructure/renderWithStore";
import {Role} from "types";
import App from "../App";

describe("App Login", function () {
    let history: MemoryHistory;

    async function initializeLoginPage() {
        server.use(handleTokenFetchRequest({error: true}));
        renderWithStore({ui: <App />, history});

        await waitFor(function () {
            expect(screen.getByText("Initializing App...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Initializing App...")).toBeNull();
            expect(screen.getByTestId("login-page")).toBeInTheDocument();
        });
    }

    function simulateLogin(screen: Screen, {userId, password}: {userId: string, password: string}) {
        const nameInput = screen.getByLabelText("User ID");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByTestId("login-button");
        userEvent.type(nameInput, userId);
        userEvent.type(passwordInput, password);
        userEvent.click(submitButton);
    }

    beforeEach(function () {
        history = createMemoryHistory();
    });

    it("should handle login for a standard user", async function () {
        server.use(handleLoginPostRequest({userId: "daniel", role: Role.standard}));
        await initializeLoginPage();

        simulateLogin(screen, {userId: "Daniel", password: "password"});

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeNull();
            expect(screen.getByTestId("standard-user-detail-page")).toBeInTheDocument();
        });
    });

    it("should handle login for an admin user", async function () {
        server.use(handleLoginPostRequest({userId: "daniel", role: Role.admin}));
        server.use(handleUsersFetchRequest({}));

        await initializeLoginPage();

        simulateLogin(screen, {userId: "Theodore", password: "password"});

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeNull();
            expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
        });
    });

    it("should handle a failed login fetch request", async function () {
        server.use(handleLoginPostRequest({error: true}));
        await initializeLoginPage();

        simulateLogin(screen, {userId: "Theodore", password: "password"});

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeNull();
            expect(screen.getByTestId("login-error-message")).toBeInTheDocument();
        });
    });
});
