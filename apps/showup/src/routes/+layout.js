import authClientGuard from 'lib/guards/auth.client';

import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	let authData = await authClientGuard({ url, params, session }, 'Show Up Daily');

	return { ...authData };
}
