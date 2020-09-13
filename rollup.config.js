import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const packages = require('./package.json');

// eslint-disable-next-line no-undef
const ENV = process.env.NODE_ENV;

const paths = {
    input: {         
        root:'src/index.js',
    },
    output: {
        root: ENV === 'example'
            ? 'example/dist/'
            : '',
    },
};

const fileNames = {
    development: `${packages.name}.js`,
    example: `example.js`,
    production: `index.js`
};

const fileName = fileNames[ENV];

export default {
    input: `${paths.input.root}`,
    output: {
        file: `${paths.output.root}${fileName}`,
        format: 'umd',
        name: 'jsdk'
    },
    plugins: [
        resolve(),
        commonjs(),
        eslint({
            include: ['src/**'],
            exclude: ['node_modules/**']
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        (ENV === 'production' && uglify()),
    ],
};