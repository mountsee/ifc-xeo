export default {
  input: 'viewer.js',
  output: {
    file: 'bundle.js',
    // format: 'umd',
    name: 'MyXeokitScript',
    format: 'iife',
    sourceMap: 'inline',
  }
};