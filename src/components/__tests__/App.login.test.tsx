import {screen, Screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {createMemoryHistory, MemoryHistory} from "history";
import {
    handleLoginPostRequest,
    handleTokenFetchRequest,
    handleUsersFetchRequest,
    handleUserDetailFetchRequest,
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
        server.use(handleUserDetailFetchRequest({userId: "daniel"}));
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

    it("should validate", async function () {
        server.use(handleLoginPostRequest({userId: "daniel", role: Role.admin}));
        server.use(handleUsersFetchRequest({}));

        await initializeLoginPage();

        simulateLogin(screen, {userId: "", password: ""});

        expect(screen.getByText("Please enter a user id.")).toBeInTheDocument();
        expect(screen.getByText("Please enter a password.")).toBeInTheDocument();

        userEvent.type(screen.getByLabelText("User ID"), "brutus");
        userEvent.type(screen.getByLabelText("Password"), "Password1");

        expect(screen.queryByText("Please enter a user id.")).toBeNull();
        expect(screen.queryByText("Please enter a password.")).toBeNull();

        userEvent.click(screen.getByTestId("login-button"));

        await waitFor(function () {
            expect(screen.getByText("Logging in...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Logging in...")).toBeNull();
            expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
        });

    });
});
