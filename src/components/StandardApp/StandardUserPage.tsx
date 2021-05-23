import formatCurrency from "helpers/formatCurrency";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {selectUserId} from "slices/appStatus/appStatusSelectors";
import {selectUserBalance} from "slices/userDetail/userDetailSelectors";
import {initializeUserSummary} from "slices/userDetail/userDetailThunks";
import {TransactionEntriesTable} from "../common";
import "./StandardUserPage.less";

export default function StandardUserPage() {
    const loggedInUserId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    useDidMount(() => dispatch(initializeUserSummary(loggedInUserId)));

    const balance = useAppSelector(selectUserBalance);

    if (!balance) {
        return null;
    }

    return (
        <div className="standard-user-detail-page">
            <h1 className="standard-user-detail-page__balance" >Current Balance: {formatCurrency(balance)}</h1>
            <TransactionEntriesTable />
        </div>
    );
}
