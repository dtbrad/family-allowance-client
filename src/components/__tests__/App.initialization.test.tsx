import {screen, waitFor} from "@testing-library/react";
import {createMemoryHistory, MemoryHistory} from "history";
import {handleTokenFetchRequest, server} from "testInfrastructure/mockServer";
import renderWithStore from "testInfrastructure/renderWithStore";
import {Role} from "types";
import App from "../App";

describe("App Initialization and Routing", function () {
    let history: MemoryHistory;

    beforeEach(function () {
        history = createMemoryHistory();
    });

    describe("When loading '/' route", function () {
        it("should load the standard user detail page for an authenticated standard user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.standard}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("standard-user-detail-page")).toBeInTheDocument();
            });
        });

        it("should load the admin users page for an authenticated admin user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
            });
        });

        it("should load the login page for an unauthenticated user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin, error: true}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("login-page")).toBeInTheDocument();
            });
        });
    });

    describe("When loading '/summary' route", function () {
        beforeEach(function () {
            history.push("/summary");
        });

        it("should load the standard user detail page for an authenticated standard user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.standard}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("standard-user-detail-page")).toBeInTheDocument();
            });
        });

        it("should load the admin user detail page for an authenticated admin user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("admin-user-detail-page")).toBeInTheDocument();
            });
        });

        it("should load the login page for an unauthenticated user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin, error: true}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("login-page")).toBeInTheDocument();
            });
        });
    });

    describe("When loading '/admin/users' route", function () {
        beforeEach(function () {
            history.push("/admin/users");
        });

        it("should load the admin users page for an authenticated admin user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
            });
        });

        it("should load the unknown route page for an authenticated standard user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.standard}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("unknown-route")).toBeInTheDocument();
            });
        });

        it("should load the login page for an unauthenticated user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin, error: true}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("login-page")).toBeInTheDocument();
            });
        });
    });

    describe("When loading '/admin/users/:userId' route", function () {
        beforeEach(function () {
            history.push("/admin/users/daniel");
        });

        it("should load the admin user detail page for an authenticated admin user", async function () {
            server.use(handleTokenFetchRequest({userId: "john", role: Role.admin}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("admin-user-detail-page")).toBeInTheDocument();
            });
        });

        it("should load the unknown route page for an authenticated standard user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.standard}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("unknown-route")).toBeInTheDocument();
            });
        });

        it("should load the login page for an unauthenticated user", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin, error: true}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("login-page")).toBeInTheDocument();
            });
        });
    });
});
