import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyApp'
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      "import * as xeokitSdk from '@xeokit/xeokit-sdk';": "var xeokitSdk = window.xeokitSdk;"
    })
  ]
};
