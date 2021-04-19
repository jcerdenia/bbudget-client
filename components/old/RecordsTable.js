import { Fragment } from 'react';
import { Container, Table, Button, Row, Col, Form, Card } from 'react-bootstrap';

export default function RecordsTable() {
    return (
        <Fragment>
            <Row>
                <Col ><Button>New Record</Button></Col>
                <Col ><Form.Control type="text" placeholder="Search Record" /></Col>
                <Col>
                    <Form.Control as="select">
                        <option>All</option>
                        <option>Income</option>
                        <option>Expense</option>
                    </Form.Control>
                </Col>
            </Row>
            
            <Container fluid="true" style={{'margin-top':'8px'}}>
            <Card>
                Sample Record
            </Card>
            </Container>
        </Fragment>
    );
} 