import moment from "moment";
import {Transaction} from "types";
import "./TransactionEntryRow.less";

interface TransactionRowProps {
    transaction: Transaction;
}

const formatNum = (num: number) => num?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
});

function TransactionEntryRow({
    transaction: {date, amount, description}
}: TransactionRowProps) {
    const rowClass = amount < 0
        ? "withdrawal-row"
        : "deposit-row";

    return (
        <tr className={rowClass}>
            <td>{moment(date).format("MM-DD-YYYY")}</td>
            <td>{formatNum(amount)}</td>
            <td className="description">{description}</td>
        </tr>
    );
}

export default TransactionEntryRow;
