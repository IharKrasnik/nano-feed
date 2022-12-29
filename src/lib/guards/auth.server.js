import apiServerSide from '$lib/apiServerSide';
import { redirect } from '@sveltejs/kit';

export default async ({ url, cookies }) => {
	let otp = new URL(url).searchParams.get('otp');

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

	throw redirect(302, '/url=' + url);
};
