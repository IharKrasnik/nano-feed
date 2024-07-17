import authClientGuard from 'lib/guards/auth.client';

export async function load({ url, params, session, cookies, data }) {
	let extend = {
		...data
	};
	let authData = await authClientGuard({ url, params, session }, 'Momentum IDE');
	//
	return { ...authData, ...extend };
}
