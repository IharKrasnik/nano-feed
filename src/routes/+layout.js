import authClientGuard from '$lib/guards/auth.client';

export function load({ url, params, session }) {
	return authClientGuard({ url, params, session });
}
