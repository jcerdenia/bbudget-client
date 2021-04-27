import { useState, useEffect } from 'react'
import { InputGroup, Form, Col } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import View from '../../../components/View'
import Helper from '../../../app-helper.js'
import moment from 'moment'

export default function CategoryBreakdown() {
    const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').format('l'))
    const [toDate, setToDate] = useState(moment().format('l'))
    const [labelsArr, setLabelsArr] = useState([])
    const [dataArr, setDataArr] = useState([])
    const [bgColors,setBgColors] = useState([])

    useEffect(() => {
        const token = Helper.getAccessToken()
        fetch('http://localhost:4000/api/users/get-records-breakdown-by-range', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                fromDate: fromDate,
                toDate: toDate
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setDataArr(data.map((item) => item.totalAmount))
            setLabelsArr(data.map((item) => item.categoryName))
            setBgColors(data.map(() => Helper.getRandomColor()))
        })
    }, [fromDate, toDate])

    return (
        <View title="Category Breakdown">
        
            <h3>Category Breakdown</h3>
            <Form.Row>
                <Form.Group as={Col} xs="6">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col} xs="6">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}/>
                </Form.Group>
            </Form.Row>
            <hr/>
            <Pie height={100} data={{
                labels: labelsArr, 
                datasets: [{ 
                    data: dataArr, 
                    backgroundColor: bgColors
                }] 
            }}/>
            
        </View>
    )
}