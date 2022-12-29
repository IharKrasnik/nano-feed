import apiServerSide from '$lib/apiServerSide';
import { redirect } from '@sveltejs/kit';

export default async ({ url, cookies }) => {
	if (!url.href.includes('_redirect')) {
		let otp = url.searchParams.get('otp');

		if (otp) {
			let api = apiServerSide({});

			try {
				const authData = await api.get('users/current-by-otp', { otp });
				const { accessToken } = authData;

				cookies.set('access_token', accessToken);
			} catch (err) {
				console.log('err', err);
			}

			throw redirect(302, '/?url', JSON.stringify(url));
		}

		// throw redirect(302, '/_redirect?url=' + url.searchParams.get('otp'));
	}

	return {};
};
