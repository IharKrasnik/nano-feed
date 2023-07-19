import authServerGuard from 'lib/guards/auth.server';

export async function load({ url, params, session, cookies }) {
	let authData = await authServerGuard({ url, params, session, cookies }, 'Momentum Engage');

	return { ...authData };
}
