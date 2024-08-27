/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', '../../packages/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'tall': { 'raw': '(min-height: 800px)' }
			}
		}
	},
	plugins: [require('tailwindcss-bg-patterns')]
};
