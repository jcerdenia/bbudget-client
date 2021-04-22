import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Head from 'next/head';

export default function View({ title, children }) {
	return (
		<Fragment>
			<Head>
				<title key="title-tag">bbudget – {title}</title>
				<meta key="title-meta" name="viewport" content="initial-scale=1.0, width=device-width"/>
			</Head>
			<Container id="view" className="mt-5 pt-4 mb-5">
				{/*<h2>{title}</h2>*/}
				{children}
			</Container>
		</Fragment>
	);
}