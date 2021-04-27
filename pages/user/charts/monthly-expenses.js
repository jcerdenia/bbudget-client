import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import View from '../../../components/View'
import Helper from '../../../app-helper.js'
import moment from 'moment'

export default function MonthlyExpenses() {
    const [labelsArr, setLabelsArr] = useState([])
    const [dataArr, setDataArr] = useState([])
    const [bgColors,setBgColors] = useState([])

    useEffect(() => {
    	const token = Helper.getAccessToken()
    	const options =  {
	        headers: { 'Authorization': `Bearer ${token}` },
	    }
	    fetch(`${Helper.apiBaseUrl}/api/users/get-expenses-by-month`, options)
	    .then((response) => response.json())
	    .then((data) => {
	        setDataArr(data.map((item) => item.total))
	        setLabelsArr(data.map((item) => item.month))
	        setBgColors(data.map(() => Helper.getRandomColor()))
	    })
    }, [])

    return (
        <View title="Monthly Expenses">
        
            <h3>Monthly Expenses</h3>
            
            <hr/>
            <Bar height={100} data={{
                labels: labelsArr, 
                datasets: [{ 
                	label: 'Monthly Expense',
                    data: dataArr, 
                    backgroundColor: bgColors
                }] 
            }}/>
            
        </View>
    )
}