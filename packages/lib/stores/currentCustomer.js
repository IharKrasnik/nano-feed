import { get, post } from 'lib/api';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import Cookies from 'js-cookie';

const currentCustomerStore = writable({
	vars: {}
});

let CACHE_KEY = 'CURRENT_CUSTOMER';

if (browser) {
	if (localStorage[CACHE_KEY]) {
		currentCustomerStore.set(JSON.parse(localStorage[CACHE_KEY]) || {});
	}

	currentCustomerStore.subscribe((store) => {
		if (store) {
			store.updatedOn = new Date();

			if (!store.vars) {
				store.vars = {};
			}
		}

		localStorage[CACHE_KEY] = JSON.stringify(store);
	});
}
export let isAuthorized = writable(!!Cookies.get('customer_access_token'));

export let loginCustomer = async ({ email, loginCode, page } = {}) => {
	let { customer, token } = await post(
		`customers/auth?pageId=${page._id || page.parentPage?._id}`,
		{
			email,
			loginCode
		}
	);
	currentCustomerStore.update(() => customer);
	Cookies.set('customer_access_token', token);
	isAuthorized.update(() => true);
};

export default currentCustomerStore;
