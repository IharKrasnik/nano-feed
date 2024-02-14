import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		rawFonts(['.ttf']),
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
		host: true,
		port: process.env.PORT || 5177,

		headers: {
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin'
		}
	},
	build: {
		minify: 'esbuild'
	}
};

function rawFonts(ext) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(code, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		}
	};
}

export default config;
