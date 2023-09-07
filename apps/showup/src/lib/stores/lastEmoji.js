import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'EMOJI';

const lastEmojiStore = writable('✔️');

if (browser) {
	let lastEmoji;

	try {
		lastEmoji = localStorage[KEY] || '✔️';
	} catch (err) {
		localStorage[KEY] = '✔️';
		lastEmoji = '✔️';
	}

	lastEmojiStore.set(lastEmoji);

	lastEmojiStore.subscribe((e) => {
		localStorage[KEY] = e;
	});
}

export default lastEmojiStore;
