import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from '../components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { UserProvider } from '../contexts/UserContext'
import Helper from '../app-helper'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ email: null })

  useEffect(() => {
  	if (Helper.getAccessToken() !== null) {
  		const options = { headers: {
  				Authorization: `Bearer ${Helper.getAccessToken()}`
  		}}
  		// Send access token to API endpoint
      fetch('http://localhost:4000/api/users/details', options)
  		.then((response) => response.json())
  		.then((userData) => {
  			// Should receive user data
        if (typeof userData.email !== 'undefined') {
  				setUser({ email: userData })
  			} else {
  				setUser({ email: null })
  			}
  		})
  	}
  }, [user.id])

  const unsetUser = () => {
    // Log out user
	  localStorage.clear()
	  setUser({ email: null })
  }
  
  return (
  	<>
  		<UserProvider value={{ user, setUser, unsetUser }}>
	  		<AppNavBar />
		  	<Container>
	        <Component {...pageProps} />
	      </Container>
      </UserProvider>
  	</>
  );
}

export default MyApp