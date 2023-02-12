import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
// import { eslint } from 'rollup-plugin-eslint';
import replace from '@rollup/plugin-replace';

const outputConfig = {
	file: 'static/wave.js',
	format: 'umd',
	name: 'tracker',
	sourcemap: false,
	globals: {
		tracker: 'tracker',
		Fingerprint2: 'Fingerprint2'
	}
};

export default {
	input: 'src/index.js',
	context: 'window',
	moduleContext: 'window',
	output: [{ ...outputConfig }],
	plugins: [
		// eslint({
		// 	exclude: ['node_modules/**', '../src/lib/**']
		// }),
		babel({
			exclude: ['node_modules/**', '../src/lib/**']
		}),
		replace({
			['process.env.BUILD']: JSON.stringify(process.env.BUILD)
		}),
		terser({ ecma: 5, safari10: true })
	]
};
