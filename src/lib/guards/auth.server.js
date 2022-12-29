import currentUser from '$lib/stores/currentUser';
import apiServerSide from '$lib/apiServerSide';
import { redirect } from '@sveltejs/kit';

let user;

currentUser.subscribe((value) => (user = value));

export default async ({ url, cookies }) => {
	let otp = new URL(url).searchParams.get('otp');
	throw redirect(302, '/test_url' + url);
	if (otp) {
		let api = apiServerSide({});

		try {
			const authData = await api.get('users/current-by-otp', { otp });
			const { accessToken } = authData;
			cookies.set('access_token', accessToken);
		} catch (err) {
			console.log('err', err);
		}

		throw redirect(302, '/');
	}

	let accessToken = cookies.get('access_token');

	if (user)
		if (!user && accessToken) {
			let api = apiServerSide({ accessToken });

			try {
				user = await api.get('users/current');
				console.log('user', user);

				currentUser.set(user);
			} catch (err) {
				console.log('err', err);
			}
		}

	return {};
};
