import {screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {createMemoryHistory, MemoryHistory} from "history";
import {
    handlePostUserRequest,
    handleTokenFetchRequest,
    handleUserDetailFetchRequest,
    handleUsersFetchRequest,
    server
} from "testInfrastructure/mockServer";
import renderWithStore from "testInfrastructure/renderWithStore";
import {Role} from "types";
import App from "../App";
import selectEvent from "react-select-event";

const initialServersResponse = [
    {
        userId: "chris",
        balance: 200,
        allowanceAmount: 5,
        dayPreference: "Sunday"
    },
    {
        userId: "ben",
        balance: 39,
        allowanceAmount: 10,
        dayPreference: "Monday"
    },
    {
        userId: "daniel",
        balance: 400,
        allowanceAmount: 11,
        dayPreference: "Tuesday"
    },
    {
        userId: "adam",
        balance: 30,
        allowanceAmount: 10,
        dayPreference: "Wednesday"
    }
];

const initialIds = ["adam", "ben", "chris", "daniel"];

const updatedUsers = [
    ...initialServersResponse,
    {
        userId: "timothy",
        balance: 0,
        allowanceAmount: 15,
        dayPreference: "Thursday"
    }
];

const updatedIds = [...initialIds, "timothy"];

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
            server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
            server.use(handleUsersFetchRequest({users: initialServersResponse}));
            server.use(handlePostUserRequest({users: updatedUsers}));


            renderWithStore({ui: <App />, history});

            await waitFor(function () {
                expect(screen.getByText("Initializing App...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Initializing App...")).toBeNull();
                expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
            });

            let userRows = screen.getAllByTestId("user-summary-row");

            expect(userRows).toHaveLength(4);

            userRows.forEach(function (userRow, index) {
                expect(userRow).toHaveTextContent(initialIds[index]);
            });

            userEvent.click(screen.getByLabelText("Day Preference"));
            const userIdInput = screen.getByLabelText("Name");
            const passwordInput = screen.getByLabelText("Password");
            const allowanceAmountInput = screen.getByLabelText("Allowance Amount");
            const submitNewUserButton = screen.getByTestId("admin-users-update-users-submit");
            userEvent.type(userIdInput, "brutus");
            userEvent.type(passwordInput, "testpassword");
            userEvent.type(allowanceAmountInput, "15");
            await selectEvent.select(screen.getByText("Thursday"), "Thursday");
            userEvent.click(submitNewUserButton);

            await waitFor(function () {
                expect(screen.queryByText("Uploading User...")).toBeInTheDocument();
            });

            await waitFor(function () {
                expect(screen.queryByText("Uploading User...")).toBeNull();
                expect(screen.getByText("User successfully added")).toBeInTheDocument();
            });

            userRows = screen.getAllByTestId("user-summary-row");

            expect(userRows).toHaveLength(5);

            userRows.forEach(function (userRow, index) {
                expect(userRow).toHaveTextContent(updatedIds[index]);
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

            server.use(handleUserDetailFetchRequest({userId: "adam"}));

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
