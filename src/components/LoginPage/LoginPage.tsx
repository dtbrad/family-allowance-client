import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {SyntheticEvent, useState} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {selectLoginLoadingStatus} from "slices/appStatus/appStatusSelectors";
import {loginUser} from "slices/appStatus/appStatusThunks";
import {AsyncStatus} from "types";
import "./LoginPage.less";

export default function LoginPage() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const loginLoadingStatus = useAppSelector(selectLoginLoadingStatus);

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        await dispatch(loginUser(userId, password));
    }

    return (
        <div className="login-page">
            <div>
                <Alert
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
                                onChange={(e: any) => setUserId(e.target.value)}
                                value={userId}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                value={password}
                            />
                        </Form.Group>
                        <Button
                            disabled={loginLoadingStatus === AsyncStatus.pending || !userId || !password}
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
