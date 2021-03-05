import React, {Fragment} from 'react';
import Head from 'next/head';
import {GetServerSideProps, InferGetStaticPropsType} from 'next';
import {getHome} from '../lib/demoActions';
import {withTranslation, WithTranslation} from 'react-i18next';
import withSession from '../lib/session';
import withRouter, {WithRouterProps} from 'next/dist/client/with-router';

type Props = InferGetStaticPropsType<typeof getServerSideProps> & WithTranslation & WithRouterProps;

class Error extends React.Component<Props> {
	public render() {
		const {t, i18n, message} = this.props;
		return (
			<Fragment>
				<Head>
					<title>{t('error')}</title>
				</Head>
				<div>
					<h1>
						{t('error')}: {t(message)}
					</h1>
				</div>
			</Fragment>
		);
	}
}

export default withTranslation()(withRouter(Error));

export const getServerSideProps: GetServerSideProps<{message: string}> = ({req, res, query}) => {
	console.log(query);
	let error: string = query.error as string;
	return Promise.resolve({
		props: {
			message: error,
		},
	});
};
