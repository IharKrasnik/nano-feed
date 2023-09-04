import authServerGuard from 'lib/guards/auth.server';

export async function load({ url, params, session, cookies }) {
	let authData = await authServerGuard(
		{ url, params, session, cookies },
		'Build In Public Journal'
	);

	return {
		...authData,
		ogTitle: 'Build In Public Journal',
		ogDescription: 'Share your progress daily',
		ogImage:
			'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1693764860336-image.png'
	};
}
