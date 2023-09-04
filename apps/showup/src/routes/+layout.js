import authClientGuard from 'lib/guards/auth.client';

import { PAGE_URL } from 'lib/env';
import { get } from 'lib/api';

export async function load({ url, params, session, cookies }) {
	let authData = await authClientGuard({ url, params, session }, 'Build In Public Journal');

	return {
		...authData,
		ogTitle: 'Build In Public Journal',
		ogDescription: 'Share your progress daily',
		ogImage:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693764860336-image.png'
	};
}
