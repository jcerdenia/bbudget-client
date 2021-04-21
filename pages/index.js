import { useState } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import View from '../components/View'; 
import Swal from 'sweetalert2'
import Router from 'next/router';
import UserContext from '../contexts/UserContext'

const LOCAL_BASE_URL = "http://localhost/4000"
const HOSTED_BASE_URL = "https://aqueous-atoll-99638.herokuapp.com"

export default function Home() {
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 const { user, setUser } = useContext(UserContext)

const retrieveUserDetails = () => {
	// User needs to be verified, i.e., has access token
	const options = {
		headers: { Authorization: `Bearer ${accessToken}` }
	}
	fetch('http://localhost:4000/api/users/details', options)
	.then((response) => response.json())
	.then((data) => { 
		setUser({ id: data._id, isAdmin: data.isAdmin })
		Router.push('/user/records')
	})
}

 function login(e) {
 	e.preventDefault()
	fetch(LOCAL_BASE_URL + "/api/users/login", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
	.then((res) => res.json())
	.then((data) => {
		if (typeof data.accessToken !== "undefined") {
			localStorage.setItem('token', data.accessToken)
			Swal.fire({
				icon: 'success',
				title: 'Succesfully logged in'
			})
			Router.push('/user/records')
		} else {
			Swal.fire('Login Error', 'Something went wrong', 'error')
		}
	})
 }

  return (
      <View title={ 'Budget Tracking App' }>
         <h1>Welcome!</h1>
          <p>Log in with your account information.</p>
	        <Form onSubmit={(e) => login(e)}>
	            <Form.Group controlId="email">
	                <Form.Label>Email:</Form.Label>
	                <Form.Control type="text" value={email} onChange={e=>setEmail(e.target.value)} required/>
	            </Form.Group>
	            <Form.Group controlId="password">
	                <Form.Label>Password:</Form.Label>
	                <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
	            </Form.Group>
	            <Button type="submit" variant="primary" className="btn-block mb-3">Submit</Button>
	        </Form>
      </View>
  )
}