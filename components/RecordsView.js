import { Fragment, useState, useEffect } from 'react'
import { Card, Row, Col, InputGroup, FormControl, Form, Button } from 'react-bootstrap'
import Link from 'next/link'
import Helper from '../app-helper'
import moment from 'moment'
import NewRecordModal from './NewRecordModal'

export default function RecordsView() {
    const [records, setRecords] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchType, setSearchType] = useState("All")

    const [modalShow, setModalShow] = useState(false);

    const recordCards = records?.map((record) => {
        const textColor = (record.categoryType === 'Income') ? 'text-success' : 'text-danger'
        const amountSymbol = (record.categoryType === 'Income') ? '+' : '-'
        return (
            <Card className="mb-3" key={record._id}>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <h5>{ record.description }</h5>
                            <h6><span className={textColor}>{record.type}</span> {'(' + record.categoryName + ')'}</h6>
                            <p>{ moment(record.dateAdded).format("MMMM D, YYYY") }</p>
                        </Col>
                        <Col md={6} className="text-right">
                            <h6 className={textColor}>{amountSymbol + ' ' + record.amount.toLocaleString()}</h6>
                            <span>{record.balanceAfterTransaction.toLocaleString()}</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    })

    useEffect(() => {
        if (records === null) {
            refreshRecords()
        }
    }, [records])

    useEffect(() => {
        if (searchKeyword.length > 0) {
            setRecords(records?.filter((record) => {
                return record.description.toLowerCase().includes(searchKeyword.toLowerCase())
            }))
        } else {
            refreshRecords()
        }
    }, [searchKeyword])

    useEffect(() => {
        if (searchType !== 'All') {
            setRecords(records?.filter((record) => {
                return record.categoryType.toLowerCase() === searchType.toLowerCase()
            }))
        } else {
            refreshRecords()
        }
    }, [searchType])

    function refreshRecords() {
        const token = Helper.getAccessToken()
        const options = { headers: { Authorization: `Bearer ${token}` }}
        fetch(`${Helper.apiBaseUrl}/api/users/get-records`, options)
        .then((response) => response.json())
        .then((data) => { 
            if (data) setRecords(data) 
        })
    }

    function onRecordSubmitted() {
        refreshRecords()
        setModalShow(false)
    }
      
    return (
        <>
        <Fragment>
            <h3>Transactions</h3>
            <InputGroup className="mb-2">
                <InputGroup.Prepend>
                    {/*
                    <Link href="/user/records/new" onClick={() => setModalShow(true)}>
                        <a className="btn btn-primary">New</a>
                    </Link> */}
                    <Button onClick={() => setModalShow(true)}>New</Button>
                </InputGroup.Prepend>
                <FormControl placeholder="Search Record" value={searchKeyword} onChange={ (e) => setSearchKeyword(e.target.value) }/>
                <Form.Control as="select" defaultValue={searchType} onChange={ (e) => setSearchType(e.target.value) }>
                    <option value="All">All</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </Form.Control>
            </InputGroup>
            {recordCards}
        </Fragment>

        <NewRecordModal show={modalShow} onHide={() => onRecordSubmitted()}/>
        </>
    )
}