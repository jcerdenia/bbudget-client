import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Form, Col } from 'react-bootstrap'
import View from '../../../components/View'
import Helper from '../../../app-helper.js'
import moment from 'moment'

export default function Trend() {
    const [fromDate, setFromDate] = useState(moment().subtract(1, 'months').format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'))
    const [labelsArr, setLabelsArr] = useState([])
    const [dataArr, setDataArr] = useState([])
    const [bgColors,setBgColors] = useState([])

    useEffect(() => {
    	const token = Helper.getAccessToken()
	    fetch(`${Helper.apiBaseUrl}/api/users/get-balance-trend-by-range`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Helper.getAccessToken()}`
            },
            body: JSON.stringify({
                fromDate: fromDate,
                toDate: toDate
            })
        })
	    .then((response) => response.json())
	    .then((data) => {
	        setDataArr(data.map((item) => item.balance))
	        setLabelsArr(data.map((item) => item.date))
	        setBgColors(Helper.getRandomColor())
	    })
    }, [fromDate, toDate])

    return (
        <View title="Balance Trend">
            <h3>Balance Trend</h3>

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
            <Line height={100} data={{
                labels: labelsArr, 
                datasets: [{ 
                    label: "Balance",
                    data: dataArr, 
                    backgroundColor: bgColors
                }] 
            }}/>
            
        </View>
    )
}