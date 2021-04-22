import { useState, useContext } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import Router from 'next/router';
import Link from 'next/Link';
import styles from '../styles/Home.module.css'
import UserContext from '../contexts/UserContext'
import View from '../components/View'; 
import Swal from 'sweetalert2'

const BASE_URL = "http://localhost:4000"
//const BASE_URL = "https://aqueous-atoll-99638.herokuapp.com"

export default function Home() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { user, setUser } = useContext(UserContext)

	// Redirect to records if user is already found
	if (user.email !== null) Router.push('/user/records')

	const retrieveUserDetails = (accessToken) => {
		// Send access token to API endpoint
		const options = {
			headers: { Authorization: `Bearer ${accessToken}` }
		}
		fetch(`${BASE_URL}/api/users/details`, options)
		.then((response) => response.json())
		.then((data) => { 
			// Should receive user data
			console.log("Received data" + data)
			setUser({ email: data.email })
			console.log(user)
			//Router.push('/user/records')
		})
	}

	function login(e) {
	 	e.preventDefault()
	 	// Send user email and password to endpoint
		fetch(`${BASE_URL}/api/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then((res) => res.json())
		.then((data) => {
			// Should receive an access token
			if (typeof data.accessToken !== "undefined") {
				localStorage.setItem('token', data.accessToken)
				retrieveUserDetails(data.accessToken)
				Swal.fire({
					icon: 'success',
					title: 'Succesfully logged in.'
				})
				Router.push('/user/records')
			} else {
				Swal.fire('Login Error', 'Something went wrong', 'error')
			}
		})
	}

  return (
      <View title={'Log in'}>
      <div className={styles.formContainer}>
        	<h1>An easy way to track your budget.</h1>
          	<p>Log in with your account information.</p>
	        <Form onSubmit={(e) => login(e)}>
	            <Form.Group controlId="email">
	                <Form.Label>Email:</Form.Label>
	                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>
	            </Form.Group>
	            <Form.Group controlId="password">
	                <Form.Label>Password:</Form.Label>
	                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
	            </Form.Group>
	            <Button type="submit" variant="primary" className="btn-block mb-3">Submit</Button>
	        </Form>
	        <Link href="/register">Don't have an account? Sign up now.</Link>
	  </div>
      </View>
  )
}