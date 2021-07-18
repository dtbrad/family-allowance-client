import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {useState, SyntheticEvent} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import {AsyncStatus} from "types";
import {selectUsersUpdateStatus} from "slices/users/usersSelectors";
import {updateUsers} from "slices/users/usersThunks";
import Card from "react-bootstrap/Card";
import {useEffect} from "react";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export default function CreateUserFormFields() {
    const dispatch = useAppDispatch();
    const createUserStatus = useAppSelector(selectUsersUpdateStatus);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [moneyAllowanceAmount, setMoneyAllowanceAmount] = useState("");
    const [day, setDay] = useState("");
    const successfulUserCreation = createUserStatus === AsyncStatus.resolved;

    const dayOptions = days.map((day) => ({value: day, label: day}));

    useEffect(function () {
        setUserId("");
        setPassword("");
        setMoneyAllowanceAmount("");
        setDay("");
    }, [successfulUserCreation]);


    function handleValueChange(value?: string) {
        if (!value) {
            return setMoneyAllowanceAmount("");
        }

        setMoneyAllowanceAmount(value);
    }

    function handleSelect(event: any) {
        setDay(event.value);
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const allowanceAmount = parseFloat(moneyAllowanceAmount);
        dispatch(updateUsers({
            userId,
            password,
            dayPreference: day,
            allowanceAmount
        }));

    }

    return (
        <Card>
            <Card.Header>
            Create a new user
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="name" srOnly>Name</Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            placeholder="enter a name"
                            onChange={(e: any) => setUserId(e.target.value)}
                            value={userId}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password" srOnly>Password</Form.Label>
                        <Form.Control
                            id="password"
                            type="text"
                            onChange={(e: any) => setPassword(e.target.value)}
                            value={password}
                            placeholder="enter a password"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="amount" srOnly>Allowance Amount</Form.Label>
                        <CurrencyInput
                            id="amount"
                            name="input-1"
                            className={"form-control"}
                            value={moneyAllowanceAmount}
                            onValueChange={handleValueChange}
                            placeholder="enter an allowance amount"
                            prefix="$"
                            step={1}
                            decimalScale={2}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="day" srOnly>Day Preference</Form.Label>
                        <Select
                            inputId="day"
                            options={dayOptions}
                            onChange={handleSelect}
                            defaultValue={{value: day}}
                            placeholder="select a day preference"
                            isSearchable={false}
                        />
                    </Form.Group>
                    <Button
                        data-testid="admin-users-update-users-submit"
                        type="submit"
                        disabled={createUserStatus === AsyncStatus.pending}
                        block
                        onClick={handleSubmit}>
                        {createUserStatus === AsyncStatus.pending ? "Uploading User..." : "Create User"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
