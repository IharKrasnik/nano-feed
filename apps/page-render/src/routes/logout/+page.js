import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	cookies.delete('access_token');
	throw redirect(302, '/');
}
