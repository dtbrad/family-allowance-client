import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {selectUserId} from "slices/appStatus/appStatusSelectors";
import {selectUser} from "slices/userDetail/userDetailSelectors";
import {initializeUserSummary} from "slices/userDetail/userDetailThunks";
import {TransactionEntriesTable} from "../common";
import "./StandardUserPage.less";
import formatCurrency from "helpers/formatCurrency";

export default function StandardUserPage() {
    const loggedInUserId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    useDidMount(() => dispatch(initializeUserSummary(loggedInUserId)));

    const user = useAppSelector(selectUser);

    if (!user) {
        return null;
    }

    const {balance, transactions} = user;

    return (
        <div className="standard-user-detail-page">
            <h1 className="standard-user-detail-page__balance" >Current Balance: {formatCurrency(balance)}</h1>
            <TransactionEntriesTable transactions={transactions} />
        </div>
    );
}
