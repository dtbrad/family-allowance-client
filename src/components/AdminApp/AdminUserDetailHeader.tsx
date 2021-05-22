import {Button, Form, FormControl} from "react-bootstrap";
import "./AdminUserDetailHeader.less";
import formatCurrency from "helpers/formatCurrency";

interface AdminUserDetailHeaderProps {
    userId: string;
    balance: number;
}

export default function AdminUserDetailHeader({userId, balance}: AdminUserDetailHeaderProps) {


    return (
        <div className="admin-user-detail-header">
            <p className="admin-user-detail-header__info">{userId}'s balance: {formatCurrency(balance)}</p>
            <Form className="admin-user-detail-header__form">
                <Form.Group className="admin-user-detail-header__form-group">
                    <Form.Label htmlFor="amount" srOnly >Amount</Form.Label>
                    <FormControl id="amount" type="text" placeholder="Amount" />
                </Form.Group>
                <Form.Group className="admin-user-detail-header__form-group">
                    <Form.Label htmlFor="description" srOnly>Description</Form.Label>
                    <FormControl id="description" type="text" placeholder="Description" />
                </Form.Group>
                <Form.Group className="admin-user-detail-header__form-group">
                    <Button className="submit" type="submit">Submit Transaction</Button>
                </Form.Group>
            </Form>
        </div>
    );
}
