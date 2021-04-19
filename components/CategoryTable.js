import { Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function CategoryTable() {
    return (
        <Fragment>
            <Button>Add</Button>
            
            <Table style={{'margin-top':'8px'}} striped bordered hover>
                <thead>
                    <tr>
                    <th>Category</th>
                    <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Sample Category</td>
                    <td>Sample Type</td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
} 