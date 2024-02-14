import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import tailwind from 'tailwindcss';
import nested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import { join } from 'path';

export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: join(process.cwd(), 'src') }]
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				postcss: {
					plugins: [nested(), tailwind(), autoprefixer()]
				}
			})
		}),
		{
			name: 'add-cors',

			configureServer(server) {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
					next();
				});
			}
		}
	],
	server: {
		headers: {
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin'
		}
	}
});
