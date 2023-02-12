import { get, post, put, del } from './api';

export default ({ accessToken }) => {
	const headers = {};

	if (accessToken) {
		headers['Authorization'] = `Bearer ${accessToken}`;
	}

	return {
		get(url, params) {
			return get(url, params, {
				headers
			});
		},
		post(url, params) {
			return post(url, params, {
				headers
			});
		},
		put(url, params) {
			return put(url, params, {
				headers
			});
		},
		del(url, params) {
			return del(url, params, {
				headers
			});
		}
	};
};
