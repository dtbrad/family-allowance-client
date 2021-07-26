import ValidationFeedback from "components/ValidationFeedback";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {ChangeEvent, SyntheticEvent, useEffect, useReducer} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import CurrencyInput from "react-currency-input-field";
import {selectUsersUpdateStatus} from "slices/users/usersSelectors";
import {updateUsers} from "slices/users/usersThunks";
import {AsyncStatus} from "types";

const updateValue = "UPDATE_VALUE";
const attemptedSubmitWhileInvalid = "ATTEMPTED_SUBMIT_WHILE_INVALID";

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

interface NewUserState {
    userId: string;
    password: string;
    moneyAllowanceAmount: string
    dayPreference: string;
    validation: {
        userId: boolean;
        password: boolean;
        moneyAllowanceAmount: boolean;
        dayPreference: boolean;
    }
    attemptedSubmitWhileInvalid: boolean;
}

const initialState: NewUserState = {
    userId: "",
    password: "",
    moneyAllowanceAmount: "",
    dayPreference: "",
    validation: {
        userId: false,
        password: false,
        moneyAllowanceAmount: false,
        dayPreference: false
    },
    attemptedSubmitWhileInvalid: false
};

function validateUserId(userId: string) {
    const onlyLowerCase = /^[a-z]+$/.test(userId);
    const longEnough = userId.length > 4 && userId.length < 20;

    return longEnough && onlyLowerCase;
}

function validatePassword(password: string) {
    let result = true;
    // length
    if (password.length < 8) {
        result = false;
    }

    if (password.length > 20) {
        result = false;
    }
    // at least one digit
    if (!/\d/.test(password)) {
        result = false;
    }
    // at least one lowercase
    if (!/[a-z]/.test(password)) {
        result = false;
    }
    // at least one uppercase
    if (!/[A-Z]/.test(password)) {
        result = false;
    }

    return result;
}

function reducer(state: NewUserState, action: any) {
    switch (action.type) {
        case updateValue:
            return {
                ...state,
                [action.payload.input]: action.payload.value,
                validation: {
                    ...state.validation,
                    [action.payload.input]: action.payload.isValid
                }
            };
        case attemptedSubmitWhileInvalid:
            return {
                ...state,
                attemptedSubmitWhileInvalid: true
            };
        default:
            return initialState;
    }
}

export default function CreateUserFormFields() {
    const dispatch = useAppDispatch();
    const createUserStatus = useAppSelector(selectUsersUpdateStatus);
    const successfulUserCreation = createUserStatus === AsyncStatus.resolved;
    const [state, localDispatch] = useReducer(reducer, initialState);

    useEffect(function () {
        return localDispatch({type: "default"});
    }, [successfulUserCreation]);

    function handleUserIdChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        localDispatch({type: updateValue, payload: {input: "userId", value, isValid: validateUserId(e.target.value)}});
    }

    function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        localDispatch({type: updateValue, payload: {input: "password", value, isValid: validatePassword(e.target.value)}});
    }

    function handleAllowanceAmountChange(value?: string) {
        localDispatch({type: updateValue, payload: {input: "moneyAllowanceAmount", value: value || "", isValid: value?.length}});
    }

    function handleDaySelection(event: any) {
        localDispatch({type: updateValue, payload: {input: "dayPreference", value: event.target.value, isValid: true}});
    }

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const {password, userId, dayPreference, moneyAllowanceAmount} = state.validation;

        if (!password || !userId || !dayPreference || !moneyAllowanceAmount) {
            return localDispatch({type: attemptedSubmitWhileInvalid});
        }

        const allowanceAmount = parseFloat(state.moneyAllowanceAmount as string);

        await dispatch(updateUsers({
            userId: state.userId,
            password: state.password,
            dayPreference: state.dayPreference,
            allowanceAmount
        }));

    }

    const currencyInputClassName = state.attemptedSubmitWhileInvalid && !state.validation.moneyAllowanceAmount
        ? "form-control is-invalid"
        : "form-control";

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
                            onChange={handleUserIdChange}
                            value={state.userId}
                            isInvalid={state.attemptedSubmitWhileInvalid && !state.validation.userId}
                        />
                        <ValidationFeedback
                            show={state.attemptedSubmitWhileInvalid && !state.validation.userId}
                            message="User Id must be in between 5-20 chars, only lowercase"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password" srOnly>Password</Form.Label>
                        <Form.Control
                            id="password"
                            type="text"
                            onChange={handlePasswordChange}
                            value={state.password}
                            placeholder="enter a password"
                            isInvalid={state.attemptedSubmitWhileInvalid && !state.validation.password}
                        />
                        <ValidationFeedback
                            show={state.attemptedSubmitWhileInvalid && !state.validation.password}
                            message="Password must have at least 8 chars, 1 uppercase, 1 lowercase and 1 digit"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="amount" srOnly>Allowance Amount</Form.Label>
                        <CurrencyInput
                            id="amount"
                            name="input-1"
                            className={currencyInputClassName}
                            value={state.moneyAllowanceAmount}
                            onValueChange={handleAllowanceAmountChange}
                            placeholder="enter an allowance amount"
                            prefix="$"
                            step={1}
                            decimalScale={2}
                            allowNegativeValue={false}
                        />
                        <ValidationFeedback
                            show={state.attemptedSubmitWhileInvalid && !state.validation.moneyAllowanceAmount}
                            message="Please enter an amount"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="day" srOnly>Day Preference</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            aria-label="Select day"
                            id="day"
                            onChange={handleDaySelection}
                            value={state.dayPreference}
                            isInvalid={state.attemptedSubmitWhileInvalid && !state.validation.dayPreference}
                        >
                            <option hidden>Select a day</option>
                            {days.map((day) => (<option key={day}>{day}</option>))}
                        </Form.Control>
                        <ValidationFeedback
                            show={state.attemptedSubmitWhileInvalid && !state.validation.dayPreference}
                            message="Please select a day"
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
