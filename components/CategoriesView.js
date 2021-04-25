import { Col, Row, Card, InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Helper from '../app-helper'

export default function CategoriesView() {
    const [categories, setCategories] = useState(null)
    const [newCategory, setNewCategory] = useState("")
    const [newCategoryType, setNewCategoryType] = useState("Income")

    const categoryRows = categories?.map((category) => {
        return (
            <>
            {/* <tr>
                <th>{category.name}</th>
                <th>{category.type}</th>
                <th key={category._id}><a className="btn btn-danger" onClick={() => deleteCategory(category._id)}>-</a></th>
            </tr> */}
            <Card className="mb-1" key={category._id}>
                <Card.Body><Row>
                    <Col xs={8}>
                        <Card.Title>{category.name}</Card.Title>
                        <Card.Text>{category.type}</Card.Text>
                    </Col>
                    <Col>
                        <a style={{justifyContent: 'center'}} className="btn btn-danger" onClick={() => deleteCategory(category._id)}>Delete</a>
                    </Col>
                </Row></Card.Body>
            </Card>
            </>
        )
    })

    useEffect(() => {
        if (categories === null) refreshCategories()
    }, [categories, setCategories])

    function refreshCategories() {
        const token = Helper.getAccessToken()
        const options = { headers: { Authorization: `Bearer ${token}` }}

        fetch('http://localhost:4000/api/users/get-categories', options)
        .then((response) => response.json())
        .then((data) => { 
            if (data) setCategories(data) 
        })
    }

    function addCategory() {
        if (newCategory !== '') {
            const token = Helper.getAccessToken()
            fetch('http://localhost:4000/api/users/add-category', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newCategory,
                    type: newCategoryType
                })
            })
            .then((res) => res.json())
            .then((data) => refreshCategories())	
        }	
    }

    function deleteCategory(categoryId) {
        const token = Helper.getAccessToken()
        fetch('http://localhost:4000/api/users/delete-category', {
			method: 'POST',
			headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
			body: JSON.stringify({ categoryId: categoryId })
        })
        .then((res) => res.json())
        .then((data) => refreshCategories())
    }

    return (
        <>
        <h3>Categories</h3>
            <InputGroup className="mb-2">  
                <FormControl placeholder="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                <Form.Control as="select" defaultValue={newCategoryType} onChange={(e) => setNewCategoryType(e.target.value)}>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </Form.Control>
                <InputGroup.Append>
                    {
                        (newCategory.length === 0) 
                        ? <Button disabled className="btn btn-primary">+</Button>
                        : <Button className="btn btn-primary" onClick={() => addCategory()}>Add</Button>
                    }
                </InputGroup.Append>
            </InputGroup>
            {/*
            <Table style={{'max-width': '100vw'}}striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {categoryRows}
                </tbody>
            </Table> */}
            {categoryRows}
        </>
    )
}