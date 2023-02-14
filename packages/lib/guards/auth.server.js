import apiServerSide from 'lib/apiServerSide';
import { redirect } from '@sveltejs/kit';

export default async ({ url, cookies }, pageName = 'Momentum') => {
	if (!url.href.includes('_redirect')) {
		let otp = new URL(url.href).searchParams.get('otp');

		if (otp) {
			let api = apiServerSide({});

			try {
				const authData = await api.get('users/current-by-otp', { otp });
				const { accessToken } = authData;

				cookies.set('access_token', accessToken, { httpOnly: false });
			} catch (err) {
				console.log('err', err);
			}

			throw redirect(302, '/');
		}
	}

	return {
		ogTitle: pageName
	};
};
