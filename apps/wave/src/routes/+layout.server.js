import authServerGuard from 'lib/guards/auth.server';

export function load({ url, params, session, cookies }) {
	return authServerGuard({ url, params, session, cookies });
}
