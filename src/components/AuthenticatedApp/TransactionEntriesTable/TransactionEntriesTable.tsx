import {useAppSelector} from "hooks/reduxHooks";
import {useState} from "react";
import Alert from "react-bootstrap/Alert";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import {
    selectUserDetailId,
    selectUserDetailTransactions
} from "slices/userDetail/userDetailSelectors";
import {Transaction} from "types";
import "./TransactionEntriesTable.less";
import TransactionEntryRow from "./TransactionEntryRow";

interface GetTransactionsForPageParams {
    transactionEntries: Transaction[];
    currentPage: number;
}

function getTransactionsForPage({transactionEntries, currentPage}: GetTransactionsForPageParams) {
    const startIndex = currentPage === 1
        ? 0
        : (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const itemsToDisplay = transactionEntries.slice(startIndex, endIndex);
    return itemsToDisplay;
}

export default function TransactionEntriesTable() {
    const userId = useAppSelector(selectUserDetailId);
    const transactions = useAppSelector(selectUserDetailTransactions);
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ["Date", "Amount", "Description"];

    if (!transactions.length) {
        return (
            <Alert className="user-summary__error-message" variant="warning">
                {`There are no transactions for ${userId}`}
            </Alert>
        );
    }

    const transactionsToDisplay = getTransactionsForPage({transactionEntries: transactions, currentPage});

    const transactionRows = transactionsToDisplay?.map((transaction: Transaction) => (
        <TransactionEntryRow
            key={transaction.date}
            transaction={transaction}
        />
    ));

    function handleNextClick() {
        setCurrentPage(currentPage + 1);
    }

    function handlePrevClick() {
        setCurrentPage(currentPage - 1);
    }

    const pagination = transactions.length >= 10
        ? (
            <Pagination className="transaction-entries-table__pagination">
                <Pagination.Prev
                    disabled={currentPage < 2}
                    onClick={handlePrevClick}
                />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next
                    disabled={currentPage >= (transactions.length / 10)}
                    onClick={handleNextClick}
                />
            </Pagination>
        )
        : null;

    return (
        <>
            <div className="transaction-entries-table">
                <Table
                    size="lg"
                    bordered
                >
                    <thead>
                        <tr>
                            {headers.map((header) => <th key={header}>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {transactionRows}
                    </tbody>
                </Table>
            </div>
            {pagination}
        </>

    );
}
