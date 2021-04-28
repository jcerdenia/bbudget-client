import { Modal, Button, Row, Col, Card, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Helper from '../app-helper'

export default function NewRecordModal(props) {
    const [categoryName, setCategoryName] = useState(undefined)
    const [typeName, setTypeName] = useState(undefined)
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        fetch(`${Helper.apiBaseUrl}/api/users/get-categories`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Helper.getAccessToken()}`
            },
            body: JSON.stringify({
                type: typeName
            })
        })
        .then((response) => response.json())
        .then((data) => { 
            if (data) setCategories(data) 
        })
    }, [typeName])

    useEffect(() => {
        const isFilledOut = categoryName !== undefined && typeName !== undefined && amount > 0 && description !== ''
        setIsActive(isFilledOut)
    }, [categoryName, typeName, amount, description])

    function submitRecord() {
        fetch(`${Helper.apiBaseUrl}/api/users/add-record`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${Helper.getAccessToken()}`
            },
            body: JSON.stringify({
                categoryName: categoryName,
                categoryType: typeName,
                amount: amount,
                description: description
            })
        })
        .then((response) => response.json())
        .then((data) => props.onHide)
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Record
          </Modal.Title>
        </Modal.Header>
       
          
        <Form onSubmit={() => submitRecord()}>
         <Modal.Body>
            <Form.Group controlId="typeName">
                <Form.Label>Category Type:</Form.Label>
                <Form.Control as="select" value={typeName} onChange={(e) => setTypeName(e.target.value)} required>
                    <option value selected disabled>Select Category</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="categoryName">
                <Form.Label>Category Name:</Form.Label>
                <Form.Control as="select" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required>
                    <option value selected disabled>Select Category Name</option>
                    {
                        categories?.map((category) => {
                            return (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} required/>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                { (isActive) 
                    ? <Button type="submit" onClick={props.onHide}>Submit</Button>
                    : <Button disabled>Submit</Button>
                }
            </Modal.Footer>
        </Form>

      </Modal>
    );
}