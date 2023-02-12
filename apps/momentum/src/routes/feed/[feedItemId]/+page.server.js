// import { error } from '@sveltejs/kit';
import { get } from '$lib/api';

export async function load({ params }) {
	const { feedItemId } = params;

	let feedItem = await get(`feed/${feedItemId}`);

	return {
		ogTitle: `${feedItem.creators[0].fullName} post on Momentum`,
		ogDescription: `${feedItem.title || ''} ${feedItem.content || ''}`,
		ogImage: `${feedItem.attachments[0].url}`
	};
}
