import {screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    handlePostTransactionRequest,
    handleTokenFetchRequest,
    handleUserDetailFetchRequest,
    server
} from "testInfrastructure/mockServer";
import renderWithStore from "testInfrastructure/renderWithStore";
import {createMemoryHistory} from "history";
import {Role, ServerUserDetailResponse} from "types";
import App from "../App";

const initialBrutusDetail: ServerUserDetailResponse = {
    userId: "brutus",
    balance: 100,
    transactions: {
        entries: [
            {date: "2021-04-25T14:00:10.230Z", amount: 100, description: "transaction one"}
        ]
    }
};

const updatedBrutusDetail = {
    userId: "brutus",
    balance: 250,
    transactions: {
        entries: [
            {date: "2021-04-25T14:00:10.230Z", amount: 100, description: "transaction one"},
            {date: "2021-04-26T14:00:10.230Z", amount: 150, description: "transaction two"}
        ]
    }
};

describe("Admin User Detail Page", function () {
    it("should render the admin user detail apge", async function () {
        server.use(handleTokenFetchRequest({userId: "admin", role: Role.admin}));
        server.use(handleUserDetailFetchRequest({userId: "brutus", userDetail: initialBrutusDetail}));
        server.use(handlePostTransactionRequest({userId: "brutus", userDetail: updatedBrutusDetail}));
        const history = createMemoryHistory();
        history.push("/admin/users/brutus");

        renderWithStore({ui: <App />, history});

        await waitFor(function () {
            expect(screen.getByTestId("admin-user-detail-page")).toBeInTheDocument();
        });

        // TODO: add assertions against content/formatting

        expect(screen.getAllByTestId("transaction-row")).toHaveLength(1);

        // post a transaction for brutus
        const amountInput = screen.getByLabelText("Amount");
        const descriptionInput = screen.getByLabelText("Description");
        const submitButton = screen.getByTestId("admin-user-detail-update-user-submit");
        userEvent.type(amountInput, "150");
        userEvent.type(descriptionInput, "test amount");
        userEvent.click(submitButton);

        await waitFor(function () {
            expect(screen.queryByText("Uploading...")).toBeInTheDocument();
        });

        await waitFor(function () {
            expect(screen.queryByText("Uploading...")).toBeNull();
            expect(screen.getByText("Transaction successfully uploaded")).toBeInTheDocument();
            expect(screen.getByText("brutus's balance: $250.00")).toBeInTheDocument();
            expect(screen.getAllByTestId("transaction-row")).toHaveLength(2);
        });
    });
});
