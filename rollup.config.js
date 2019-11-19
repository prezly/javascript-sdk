import typescript from 'rollup-plugin-typescript';

const config = require('./package.json');

export default {
    input: './src/index.ts',
    output: {
        file: config.main,
        format: 'commonjs',
    },
    plugins: [typescript()],
    external: ['query-string'],
};
