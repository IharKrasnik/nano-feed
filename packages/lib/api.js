import { browser } from '$app/environment';
import { get as getStoreValue } from 'svelte/store';
import cookie from 'cookie';
import { toast } from '@zerodevx/svelte-toast';

// import notify from 'lib/services/notify';

import { API_URL } from 'lib/env';

const serialize = (obj) => {
	if (!obj) {
		return '';
	}

	if (obj._response) {
		delete obj._response;
	}

	const str = [];

	Object.keys(obj).forEach((key) => {
		const value = typeof obj[key] === 'object' ? JSON.stringify(obj[key]) : obj[key];
		str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
	});

	return str.join('&');
};

class ValidationError extends Error {
	constructor({ message, data, status }) {
		super(message);
		this.name = 'ValidationError'; // (2)
		this.data = data;
		this.status = status;
	}
}

const ftch = async (method, url, params, options = {}) => {
	let res;

	const absoluteUrl = url.startsWith('http') ? url : `${API_URL}/${url}`;

	let body = null;
	let headers = {};
	headers['Content-Type'] = 'application/json';

	if (method !== 'get') {
		if (params instanceof FormData) {
			body = params;
			delete headers['Content-Type'];
		} else {
			body = JSON.stringify(params);
		}
	}

	if (browser) {
		const cookies = cookie.parse(document.cookie);
		if (cookies.access_token) {
			headers['Authorization'] = `Bearer ${cookies.access_token}`;
		}

		if (cookies.customer_access_token) {
			headers['Authorization-Customer'] = `Bearer ${cookies.customer_access_token}`;
		}

		if (cookies['wave_fingerprint']) {
			headers['X-FINGERPRINT'] = cookies['wave_fingerprint'];
		}
	}

	if (absoluteUrl.startsWith(API_URL)) {
		options.credentials = 'include';
		options.mode = 'cors';
	}

	let controller = new AbortController();

	const timeoutId = setTimeout(() => controller.abort(), options?.abortTimeout || 10000);

	try {
		res = await fetch(`${absoluteUrl}${method === 'get' ? `?${serialize(params)}` : ''}`, {
			signal: controller.signal,
			method,
			body,
			...options,
			headers: {
				...headers,

				...(options.headers || {})
			}
		});

		clearTimeout(timeoutId);
	} catch (err) {
		console.log('error GET', absoluteUrl, method, err);

		// throw err;
		return null;
	}

	if (res.ok || res.status === 302) {
		const data = await res.json();

		if (options?.includeResponse) {
			data._response = {
				status: res.status
			};
		}

		return data;
	} else {
		const data = await res.json();

		if (browser && !options?.isNoNotifications) {
			toast.push(
				`Error: ${
					data?.errors?.global || res.status === 401 ? 'Unauthorised. Please log in.' : 'unknown'
				}`,
				{
					duration: 3000,
					pausable: true,
					theme: {
						'--toastWidth:': '500px',
						'--toastColor': 'white',
						'--toastBackground': '#b13131',
						'--toastBarBackground': 'red',
						'--toastPadding': '10px 15px'
					}
				}
			);
		}

		throw new ValidationError({ message: `Could not load ${url}`, data, status: res.status });
	}
};

export const get = async (url, params, options) => {
	return ftch('get', url, params, options);
};

export const post = async (url, params, options) => {
	return ftch('post', url, params, options);
};

export const put = async (url, params, options) => {
	return ftch('put', url, params, options);
};

export const del = async (url, params, options) => {
	return ftch('delete', url, params, options);
};

export const postFile = (url, file, params = {}, options = {}) => {
	const body = new FormData();

	body.append('file', file, file.name);

	Object.keys(params).forEach((paramName) => {
		body.append(paramName, params[paramName]);
	});

	return ftch('post', url, body, options);
};

export default {
	get,
	post,
	postFile,
	put,
	del
};
