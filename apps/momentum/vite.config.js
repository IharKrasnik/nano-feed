import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';

const config = {
	plugins: [sveltekit(), rawFonts(['.ttf'])],
	build: {
		minify: 'esbuild'
	},
	optimizeDeps: {
		exclude: ['@vercel/og']
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
