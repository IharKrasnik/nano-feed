import babel from 'rollup-plugin-babel';
// import { eslint } from 'rollup-plugin-eslint';
import replace from '@rollup/plugin-replace';

const outputConfig = {
	file: 'build/tracker.js',
	format: 'umd',
	sourcemap: 'inline',
	name: 'tracker',
	globals: {
		tracker: 'tracker',
		Fingerprint2: 'Fingerprint2'
	}
};

export default {
	input: 'src/index.js',
	context: 'window',
	moduleContext: 'window',
	output: [
		{ ...outputConfig },
		{
			...outputConfig,
			file: '../web/src/client/static/script/tracker.js'
		}
	],
	plugins: [
		// eslint({
		//   fix: true,
		//   exclude: ['node_modules/**', '../src/lib/**'],
		// }),
		babel({
			exclude: ['node_modules/**', '../src/lib/**']
		}),
		replace({
			['process.env.BUILD']: JSON.stringify(process.env.BUILD)
		})
	]
};
