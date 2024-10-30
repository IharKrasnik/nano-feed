export async function load({ cookies }) {
	cookies.delete('customer_access_token');
}

