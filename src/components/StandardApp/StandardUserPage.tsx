import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {selectUserId} from "slices/appStatus/appStatusSelectors";
import useDidMount from "hooks/useDidMount";
import {initializeUserSummary} from "slices/userDetail/userDetailThunks";
import {TransactionEntriesTable, Balance} from "../common";

export default function StandardUserPage() {
    console.log("inside StandardUserPage");
    const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();
    useDidMount(() => dispatch(initializeUserSummary(userId)));

    return (
        <>
            <h1>The Standard User Page</h1>
            <Balance />
            <TransactionEntriesTable />
        </>
    );
}
