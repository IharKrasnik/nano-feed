import apiServerSide from 'lib/apiServerSide';
import { redirect } from '@sveltejs/kit';

export default async ({ url, cookies }, pageName = 'Momentum') => {
	if (!url.href.includes('_redirect')) {
		let urlObj = new URL(url.href);
		let otp = urlObj.searchParams.get('otp');

		if (otp) {
			let api = apiServerSide({});

			try {
				const authData = await api.get('users/current-by-otp', { otp });
				const { accessToken } = authData;

				if (url.href.includes('mmntm.build')) {
					cookies.set('access_token', accessToken, { httpOnly: false, domain: '.mmntm.build' });
				} else {
					cookies.set('access_token', accessToken, { httpOnly: false });
				}
			} catch (err) {
				console.log('err', err);
			}

			throw redirect(302, `${urlObj.origin}${urlObj.pathname}`);
		}
	}

	return {
		ogTitle: pageName
	};
};
