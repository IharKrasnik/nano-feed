import authServerGuard from '$lib/guards/auth.server';

export const prerender = false;

export function load({ url, params, session, cookies }) {
	return authServerGuard({ url, params, session, cookies });
}
