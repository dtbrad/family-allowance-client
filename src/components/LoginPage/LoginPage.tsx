import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import useDidMount from "hooks/useDidMount";
import {SyntheticEvent, useState} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {useHistory} from "react-router";
import {selectLoginLoadingStatus} from "slices/appStatus/appStatusSelectors";
import {loginUser} from "slices/appStatus/appStatusThunks";
import {AsyncStatus} from "types";
import "./LoginPage.less";
import ValidationFeedback from "components/ValidationFeedback";

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [attemptedSubmitWhileInvalid, setAttemptedSubmitWhileInvalid] = useState(false);
    const dispatch = useAppDispatch();
    const loginLoadingStatus = useAppSelector(selectLoginLoadingStatus);
    const history = useHistory();
    useDidMount(() => history.push("/"));

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        if (password && userId) {
            return dispatch(loginUser(userId, password));
        }

        setAttemptedSubmitWhileInvalid(true);
    }

    return (
        <div className="login-page" data-testid="login-page">
            <div>
                <Alert
                    data-testid="login-error-message"
                    show={loginLoadingStatus === AsyncStatus.rejected}
                    variant="danger"
                >
                    There was an error logging in. Please try again.
                </Alert>
            </div>
            <Card className="login-card">
                <Card.Body>
                    <Card.Title className="text-center">Log In</Card.Title>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="User ID"
                                onChange={(e) => setUserId(e.target.value)}
                                value={userId}
                                isInvalid={attemptedSubmitWhileInvalid && !userId}
                            />
                            <ValidationFeedback
                                show={attemptedSubmitWhileInvalid && !userId}
                                message="Please enter a user id."
                            />

                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                isInvalid={attemptedSubmitWhileInvalid && !password}
                            />
                            <ValidationFeedback
                                show={attemptedSubmitWhileInvalid && !password}
                                message="Please enter a password."
                            />
                        </Form.Group>
                        <Button
                            data-testid="login-button"
                            disabled={loginLoadingStatus === AsyncStatus.pending}
                            block
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {loginLoadingStatus === AsyncStatus.pending ? "Logging in..." : "Login"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
