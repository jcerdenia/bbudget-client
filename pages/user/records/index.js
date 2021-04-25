import { Fragment, useState, useEffect } from 'react'
import { Table, Button, Row, Col, InputGroup, FormControl, Form, Card } from 'react-bootstrap'
import View from '../../../components/View'
import RecordsView from '../../../components/RecordsView'
import CategoriesView from '../../../components/CategoriesView'

export default function Records() {
    
    return (
        <View title="Records">
        <Row>
            <Col md={4}><CategoriesView /></Col>
            <Col><RecordsView /></Col>
        </Row>
        </View>
    )
}