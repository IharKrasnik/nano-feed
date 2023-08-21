import authServerGuard from 'lib/guards/auth.server';
import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	const { pageSlug } = params;

	let extend = {};

	extend = {
		ogTitle: `Momentum Brand`,
		ogDescription: `Create your brand visual assets in seconds`
	};

	let authData = await authServerGuard({ url, params, session, cookies });

	return { ...authData, ...extend };
}
