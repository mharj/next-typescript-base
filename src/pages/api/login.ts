import {NextApiRequest, NextApiResponse} from 'next';
import withSession, {WithSession} from '../../lib/session';

export type HelloData = {
	text?: string;
	error?: string;
};

async function handler(req: WithSession<NextApiRequest>, res: NextApiResponse<HelloData>) {
	const {username, password} = req.body;
	if (username === 'test' && password === 'password') {
		// get session and map with session state
		const sessionId = req.session.get('session');
		if (!sessionId) {
			// if new session, create empty session and send unique "id"
			req.session.set('session', 'demo');
			await req.session.save();
		}
		res.status(200).json({text: 'world!'});
	} else {
		res.status(401).json({error: 'auth_failed'});
	}
}

export default withSession(handler);
