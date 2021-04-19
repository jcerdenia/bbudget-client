import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from '../components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {
  return (
  	<>
  		<AppNavBar />
	  	<Container>
        <Component {...pageProps} />
      </Container>
  	</>
  );
}

export default MyApp;