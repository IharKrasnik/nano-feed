import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
	kit: {
		adapter: adapter({
			fallback: '200.html'
		})
	},
	prerender: {
		enabled: false
	},
	ssr: false
};

export default config;

// const adapter = require('@sveltejs/adapter-static');

// module.exports = {
//   kit: {
//     adapter: adapter({
//       fallback: '200.html'
//     },
//     prerender: {
//       enabled: false
//     },
//     ssr: false
//   }
// };
