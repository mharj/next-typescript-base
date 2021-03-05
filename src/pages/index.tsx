import React, {Fragment} from 'react';
import Head from 'next/head';
import {InferGetStaticPropsType} from 'next';
import {getHome} from '../lib/demoActions';
import {withTranslation, WithTranslation} from 'react-i18next';
import withSession from '../lib/session';
import withRouter, {WithRouterProps} from 'next/dist/client/with-router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

type Props = InferGetStaticPropsType<typeof getServerSideProps> & WithTranslation & WithRouterProps;

class Home extends React.Component<Props> {
	public render() {
		const {t, i18n, data, router} = this.props;
		return (
			<Fragment>
				<Head>
					<title>{t('home')} </title>
				</Head>
				<h1>{t('hello')} !! {data.title}</h1>
				<button onClick={() => router.push('/login')}>{t('login')}</button>
			</Fragment>
		);
	}
}

export default withTranslation()(withRouter(Home));

export const getServerSideProps = withSession(async ({req, res, locale}) => {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			data: await getHome(),
		},
	};
});
