import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import useDidUnMount from "hooks/useDidUnmount";
import {useParams} from "react-router-dom";
import {didResetUser} from "slices/userDetail/userDetailReducer";
import {selectuserBalance, selectuserTransactions} from "slices/userDetail/userDetailSelectors";
import {initializeUserSummary} from "slices/userDetail/userDetailThunks";
import {TransactionEntriesTable} from "../common";
import AdminUserDetailHeader from "./AdminUserDetailHeader";
import "./AdminUserDetailPage.less";

export default function AdminUserDetailPage() {
    const {userId} = useParams<{userId: string}>();
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUserSummary(userId)));
    useDidUnMount(() => dispatch(didResetUser()));

    const balance = useAppSelector(selectuserBalance);
    const transactions = useAppSelector(selectuserTransactions);

    if (!transactions) {
        return null;
    }

    return (
        <div className="admin-user-detail-page">
            <AdminUserDetailHeader userId={userId} balance={balance} />
            <TransactionEntriesTable transactions={transactions} />
        </div>
    );
}
