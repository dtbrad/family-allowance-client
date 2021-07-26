import Form from "react-bootstrap/Form";

interface ValidationFeedbackProps {
    show: boolean,
    message: string
}

export default function ValidationFeedback({show, message}: ValidationFeedbackProps) {
    if (!show) {
        return null;
    }

    return (
        <Form.Control.Feedback type="invalid">
            {message}
        </Form.Control.Feedback>
    );
}
