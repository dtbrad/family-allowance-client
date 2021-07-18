import formatCurrency from "helpers/formatCurrency";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {selectUserDetailBalance, selectUserInitializationStatus} from "slices/userDetail/userDetailSelectors";
import {initializeUserDetail} from "slices/userDetail/userDetailThunks";
import {AsyncStatus} from "types";
import {TransactionEntriesTable} from "../TransactionEntriesTable";
import {FullPageLoading} from "../../FullPageLoading";
import "./StandardUserDetailPage.less";

export default function StandardApp() {
    const userDetailnitializationStatus = useAppSelector(selectUserInitializationStatus);
    const dispatch = useAppDispatch();
    const balance = useAppSelector(selectUserDetailBalance);

    useDidMount(() => dispatch(initializeUserDetail()));

    if (userDetailnitializationStatus !== AsyncStatus.resolved) {
        return <FullPageLoading message="Loading User Detail..." />;
    }

    return (
        <div data-testid="standard-user-detail-page" className="standard-app">
            <h1 className="standard-app__balance" >Current Balance: {formatCurrency(balance)}</h1>
            <TransactionEntriesTable />
        </div>
    );
}
