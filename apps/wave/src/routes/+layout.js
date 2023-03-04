import authClientGuard from 'lib/guards/auth.client';
export const prerender = false;

export function load({ url, params, session }) {
	return authClientGuard({ url, params, session }, 'Momentum Wave');
}
