import authClientGuard from 'lib/guards/auth.client';

import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	let { pageSlug } = params;

	let extend = {};

	extend = {
		ogTitle: `Momentum Brand`,
		ogDescription: `Create your brand visual assets in seconds`
	};

	let authData = await authClientGuard({ url, params, session });

	return { ...authData, ...extend };
}
