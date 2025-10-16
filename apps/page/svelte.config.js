import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		})
	},
	preprocess: [
		preprocess({
			preserve: ['ld+json'],
			postcss: true
		})
	]
};

export default config;
