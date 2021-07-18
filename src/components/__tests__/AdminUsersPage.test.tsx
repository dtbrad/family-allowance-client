import {screen, waitFor} from "@testing-library/react";
import {createMemoryHistory, MemoryHistory} from "history";
import {handleTokenFetchRequest, handleUsersFetchRequest, server} from "testInfrastructure/mockServer";
import renderWithStore from "testInfrastructure/renderWithStore";
import {Role} from "types";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("App Initialization and Routing", function () {
    let history: MemoryHistory;

    beforeEach(function () {
        history = createMemoryHistory();
    });

    describe("Admin Users Page", function () {
        beforeEach(function () {
            history.push("/admin/users");
        });

        it("should render the admin users page", async function () {
            const usersServerResponse = [
                {
                    userId: "adam",
                    balance: 0,
                    allowanceAmount: 10,
                    dayPreference: "Monday"
                },
                {
                    userId: "ben",
                    balance: 0,
                    allowanceAmount: 10,
                    dayPreference: "Monday"
                },
                {
                    userId: "chris",
                    balance: 0,
                    allowanceAmount: 10,
                    dayPreference: "Monday"
                },
                {
                    userId: "daniel",
                    balance: 0,
                    allowanceAmount: 10,
                    dayPreference: "Monday"
                }
            ];

            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            server.use(handleUsersFetchRequest({users: usersServerResponse}));

            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
            });

            const userRows = screen.getAllByTestId("user-summary-row");

            expect(userRows).toHaveLength(4);

            // ensure that normalization didn't mess with order...
            userRows.forEach(function (userRow, index) {
                expect(userRow).toHaveTextContent(usersServerResponse[index].userId);
            });
        });

        it("should navigate from a userId cell to its admin user detail page ", async function () {
            const usersServerResponse = [
                {
                    userId: "adam",
                    balance: 0,
                    allowanceAmount: 10,
                    dayPreference: "Monday"
                }
            ];
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            server.use(handleUsersFetchRequest({users: usersServerResponse}));

            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
            });

            const userLink = screen.getByText("adam");
            userEvent.click(userLink);

            await waitFor(function () {
                expect(screen.getByTestId("admin-user-detail-page")).toBeInTheDocument();
                expect(history.location.pathname).toBe("/admin/users/adam");
            });

        });

        it("should handle a failed fetch users request", async function () {
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            server.use(handleUsersFetchRequest({status: 500}));
            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByText(
                    "There was a problem fetching users. Please try reloading the page."
                )).toBeInTheDocument();
            });
        });
    });
});
