import Table from "react-bootstrap/Table";
import TransactionEntryRow from "./TransactionEntryRow";
import {useAppSelector} from "hooks/reduxHooks";
import {selectuserTransactions} from "slices/userDetail/userDetailSelectors";
import React, {useState} from "react";
import {Transaction} from "types";
import Pagination from "react-bootstrap/Pagination";
import Alert from "react-bootstrap/Alert";

interface GetTransactionsForPageParams {
    transactionEntries: Transaction[];
    currentPage: number;
}

function getTransactionsForPage({transactionEntries, currentPage}: GetTransactionsForPageParams) {
    const startIndex = currentPage === 1
        ? 0
        : (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const itemsToDisplay = !!(transactionEntries?.length) && transactionEntries.slice(startIndex, endIndex);
    return itemsToDisplay;
}


function TransactionEntriessTable() {
    const transactions = useAppSelector(selectuserTransactions);
    const [currentPage, setCurrentPage] = useState(1);
    const headers = ["Date", "Amount", "Description"];

    if (!transactions || !transactions.length) {
        return (
            <Alert className="user-summary__error-message" data-testid="no-transactions" variant="warning">
                There is no data for this user
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
            <Pagination className="user-summary__pagination" data-testid="user-summary-pagination">
                <Pagination.Prev
                    disabled={currentPage < 2}
                    onClick={handlePrevClick}
                />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next
                    disabled={currentPage > (transactions.length / 10)}
                    onClick={handleNextClick}
                />
            </Pagination>
        )
        : null;

    return (
        <>
            <div className="user-summary__table" data-testid="user-summary-table">
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

export default TransactionEntriessTable;
