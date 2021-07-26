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

const defaultInitialServersResponse = [
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

const defaultUpdatedUsers = [
    ...defaultInitialServersResponse,
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

    async function loadAdminUsersPage({users = defaultInitialServersResponse, updatedUsers = defaultUpdatedUsers}) {
        server.use(handleTokenFetchRequest({userId: "daniel", role: Role.admin}));
        server.use(handleUsersFetchRequest({users}));
        server.use(handlePostUserRequest({users: updatedUsers}));

        renderWithStore({ui: <App />, history});

        await waitFor(function () {
            expect(screen.getByText("Initializing App...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Initializing App...")).toBeNull();
            expect(screen.getByTestId("admin-users-page")).toBeInTheDocument();
        });
    }

    function simulateNewUserInput({
        userId = "brutus",
        password = "Password1",
        dayPreference = "Thursday",
        moneyAllowanceAmount = "15"
    }) {
        userEvent.type(screen.getByLabelText("Name"), userId);
        userEvent.type(screen.getByLabelText("Password"), password);
        userEvent.type(screen.getByLabelText("Allowance Amount"), moneyAllowanceAmount);
        userEvent.click(screen.getByLabelText("Day Preference"));
        userEvent.selectOptions(screen.getByLabelText("Day Preference"), [dayPreference]);
        userEvent.click(screen.getByTestId("admin-users-update-users-submit"));
    }

    beforeEach(function () {
        history = createMemoryHistory();
    });

    describe("Admin Users Page", function () {
        beforeEach(function () {
            history.push("/admin/users");
        });

        it("should render the admin users page", async function () {
            await loadAdminUsersPage({});

            let userRows = screen.getAllByTestId("user-summary-row");

            expect(userRows).toHaveLength(4);

            userRows.forEach(function (userRow, index) {
                expect(userRow).toHaveTextContent(initialIds[index]);
            });

            simulateNewUserInput({});

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

            await loadAdminUsersPage({users: usersServerResponse});

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

        describe("new user form validation", function () {
            it("should require an allowance amount", async function () {
                await loadAdminUsersPage({});

                simulateNewUserInput({moneyAllowanceAmount: ""});

                await waitFor(function () {
                    expect(screen.getByText("Please enter an amount")).toBeInTheDocument();
                });

                userEvent.type(screen.getByLabelText("Allowance Amount"), "14");

                await waitFor(function () {
                    expect(screen.queryByText("Please enter an amount")).toBeNull();
                });

                userEvent.click(screen.getByTestId("admin-users-update-users-submit"));

                await waitFor(function () {
                    expect(screen.queryByText("Uploading User...")).toBeInTheDocument();
                });

                await waitFor(function () {
                    expect(screen.queryByText("Uploading User...")).toBeNull();
                    expect(screen.getByText("User successfully added")).toBeInTheDocument();
                });
            });

            it("should require a day preference", async function () {
                await loadAdminUsersPage({});

                simulateNewUserInput({dayPreference: ""});

                await waitFor(function () {
                    expect(screen.getByText("Please select a day")).toBeInTheDocument();
                });
            });

            describe("user id validation", function () {
                it("should require that new user id be at least 5 characters", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({userId: "nope"});

                    await waitFor(function () {
                        expect(screen.getByText("User Id must be in between 5-20 chars, only lowercase")).toBeInTheDocument();
                    });
                });

                it("should require that new user id be no more than 20 characters", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({userId: "nopenopenopenopenopenopenope"});

                    await waitFor(function () {
                        expect(screen.getByText("User Id must be in between 5-20 chars, only lowercase")).toBeInTheDocument();
                    });
                });

                it("should require that new user id be all lower case", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({userId: "Daniel"});

                    await waitFor(function () {
                        expect(screen.getByText("User Id must be in between 5-20 chars, only lowercase")).toBeInTheDocument();
                    });
                });
            });

            describe("password validation", function () {
                it("should require that password be at least 8 characters", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({password: "Pass1"});

                    await waitFor(function () {
                        expect(screen.getByText("Password must have at least 8 chars, 1 uppercase, 1 lowercase and 1 digit")).toBeInTheDocument();
                    });
                });

                it("should require that password be under 20 characters", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({password: "Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1Pass1"});

                    await waitFor(function () {
                        expect(screen.getByText("Password must have at least 8 chars, 1 uppercase, 1 lowercase and 1 digit")).toBeInTheDocument();
                    });
                });

                it("should require that password contain an uppercase character", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({password: "password1"});

                    await waitFor(function () {
                        expect(screen.getByText("Password must have at least 8 chars, 1 uppercase, 1 lowercase and 1 digit")).toBeInTheDocument();
                    });
                });

                it("should require that password contain a lowercase character", async function () {
                    await loadAdminUsersPage({});

                    simulateNewUserInput({password: "PASSWORD1"});

                    await waitFor(function () {
                        expect(screen.getByText("Password must have at least 8 chars, 1 uppercase, 1 lowercase and 1 digit")).toBeInTheDocument();
                    });
                });
            });
        });
    });
});
