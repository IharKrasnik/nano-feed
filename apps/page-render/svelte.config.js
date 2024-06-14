import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({})
	},
	preprocess: [
		preprocess({
			preserve: ['ld+json'],
			postcss: true
		})
	]
};

export default config;
