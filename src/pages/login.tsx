import React, {Fragment} from 'react';
import Head from 'next/head';
import {GetServerSideProps, GetServerSidePropsContext, InferGetStaticPropsType} from 'next';
import {parseBody} from 'next/dist/next-server/server/api-utils';
import {getHome} from '../lib/demoActions';
import {withTranslation, WithTranslation} from 'react-i18next';
import withSession from '../lib/session';
import withRouter, {WithRouterProps} from 'next/dist/client/with-router';

type Props = InferGetStaticPropsType<typeof getServerSideProps> & WithTranslation & WithRouterProps;

interface IState {
	username: string;
	password: string;
}

class Login extends React.Component<Props, IState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		this.handleLogin = this.handleLogin.bind(this);
	}
	public render() {
		const {username, password} = this.state;
		const {t, i18n} = this.props;
		return (
			<Fragment>
				<Head>
					<title>{t('login')}</title>
				</Head>
				<form>
					<input onChange={({currentTarget}) => this.setState({username: currentTarget.value})} required value={username} />
					<input onChange={({currentTarget}) => this.setState({password: currentTarget.value})} type="password" required value={password} />
					<button onClick={this.handleLogin}>{t('login')}</button>
				</form>
			</Fragment>
		);
	}
	private async handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		const {username, password} = this.state;
		const body = JSON.stringify({
			username,
			password,
		});
		const headers = new Headers();
		headers.set('Content-type', 'application/json');
		headers.set('Content-length', '' + body.length);
		const res = await fetch('/api/login', {method: 'POST', headers, body, credentials: 'include'});
		if (res.status !== 200) {
			const error = await res.json();
			this.props.router.push('/error?error=' + error.error);
		} else {
			this.props.router.push('/');
		}
		return false;
	}
}

export default withTranslation()(withRouter(Login));

/* export const getServerSideProps: GetServerSideProps<{}> = ({req, res}) => {
	return Promise.resolve({
		props: {},
	});
}; */
export const getServerSideProps = withSession(async ({req, res}) => {
	return {
		props: {},
	};
});
