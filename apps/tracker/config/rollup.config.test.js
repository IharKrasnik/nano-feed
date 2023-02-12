import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/**/*.spec.js',
  output: {
    file: 'build/tests/bundle.spec.js',
    format: 'esm',
  },
  plugins: [
    common(),
    resolve(),
    multiEntry(),
    replace({
      'process.env.BUILD': JSON.stringify(process.env.BUILD),
    }),
  ],
};
