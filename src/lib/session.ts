import {NextApiRequest, NextApiResponse} from 'next';
import {Handler, Session, withIronSession} from 'next-iron-session';

export type WithSession<R = NextApiRequest> = {session: Session} & R;

export declare type NextSessionApiHandler<T = any> = (req: NextApiRequest, res: NextApiResponse<T>) => void | Promise<void>;

export default function withSession(handler: Handler) {
	return withIronSession(handler, {
		password: process.env.SECRET_COOKIE_PASSWORD,
		cookieName: 'next-typescript-base',
		cookieOptions: {
			// the next line allows to use the session in non-https environements like
			// Next.js dev mode (http://localhost:3000)
			secure: process.env.NODE_ENV === 'production',
		},
	});
}
