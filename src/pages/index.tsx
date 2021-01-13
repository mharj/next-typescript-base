import React, {Fragment} from 'react';
import Head from 'next/head';
import {InferGetStaticPropsType} from 'next';
import {getHome} from '../lib/demoActions';

type Props = InferGetStaticPropsType<typeof getServerSideProps>;

export default class Home extends React.Component<Props> {
	public render() {
		const {data} = this.props;
		return (
			<Fragment>
				<Head>
					<title>Woot!</title>
				</Head>
				<h1>Hello !! {data.title}</h1>
			</Fragment>
		);
	}
}

export async function getServerSideProps() {
	return {
		props: {
			data: await getHome(),
		},
	};
}

