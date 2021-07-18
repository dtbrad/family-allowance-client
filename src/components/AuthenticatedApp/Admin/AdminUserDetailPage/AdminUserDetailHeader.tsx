import formatCurrency from "helpers/formatCurrency";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {SyntheticEvent, useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import {selectUserDetailUpdateStatus, selectUserDetailBalance, selectUserDetailId} from "slices/userDetail/userDetailSelectors";
import {updateUserDetail} from "slices/userDetail/userDetailThunks";
import {AsyncStatus} from "types";
import "./AdminUserDetailHeader.less";

export default function AdminUserDetailHeader() {
    const dispatch = useAppDispatch();
    const userUpdateStatus = useAppSelector(selectUserDetailUpdateStatus);
    const userDetailId = useAppSelector(selectUserDetailId) as string;
    const balance = useAppSelector(selectUserDetailBalance);
    const [moneyAmount, setMoneyAmount] = useState("");
    const [description, setDescription] = useState("");
    const successfulTransaction = userUpdateStatus === AsyncStatus.resolved;

    useEffect(function () {
        setMoneyAmount("");
        setDescription("");
    }, [successfulTransaction]);

    function handleValueChange(value?: string) {
        if (!value) {
            return setMoneyAmount("");
        }

        setMoneyAmount(value);
    }

    function handleSubmit(event: SyntheticEvent) {
        const amount = parseFloat(moneyAmount);
        event.preventDefault();
        dispatch(updateUserDetail(
            userDetailId,
            {amount, description}
        ));
    }

    return (
        <div className="admin-user-detail-header">
            <h1 className="admin-user-detail-header__info">{userDetailId}'s balance: {formatCurrency(balance)}</h1>
            <Form className="admin-user-detail-header__form">
                <Form.Group className="admin-user-detail-header__form-group">
                    <Form.Label htmlFor="amount" srOnly >Amount</Form.Label>
                    <CurrencyInput
                        id="amount"
                        className={"form-control"}
                        value={moneyAmount}
                        onValueChange={handleValueChange}
                        placeholder="amount"
                        prefix="$"
                        step={1}
                        decimalScale={2}
                    />
                </Form.Group>
                <Form.Group className="admin-user-detail-header__form-group">
                    <Form.Label htmlFor="description" srOnly>Description</Form.Label>
                    <Form.Control
                        id="description"
                        type="text"
                        onChange={(e: any) => setDescription(e.target.value)}
                        value={description}
                        placeholder="description"
                    />
                </Form.Group>
                <Form.Group className="admin-user-detail-header__form-group">
                    <Button
                        data-testid="admin-user-detail-update-user-submit"
                        className="submit"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={userUpdateStatus ===
                            AsyncStatus.pending || !description || !moneyAmount
                        }
                    >
                        {
                            userUpdateStatus === AsyncStatus.pending
                                ? "Uploading..."
                                : "Add Transaction"
                        }
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
