import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

const globals = {
	'moment': 'moment',
	'moment-timezone': 'moment-timezone'
};
const plugins = [
	resolve(),
	commonjs(),
	json(),
	babel({
		exclude: ['node_modules/**'],
		plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-arrow-functions'],
		presets: [
			['@babel/preset-env', {
				corejs: 3,
				modules: false,
				targets: {
					ie: 11,
					browsers: 'last 5 versions'
				},
				useBuiltIns: 'usage'
			}]
		],
		runtimeHelpers: true
	})
];

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/google-calendar-events.js',
			format: 'iife',
			name: 'GoogleCalendarEvents',
			globals
		},
		external: Object.keys(globals),
		plugins: plugins.concat(terser())
	},
	{
		input: 'src/plugin.js',
		output: {
			file: 'dist/jquery-google-calendar-events.js',
			format: 'iife',
			name: 'jQueryGoogleCalendarEvents',
			globals
		},
		external: Object.keys('globals'),
		plugins
	},
	{
		input: 'src/plugin.js',
		output: {
			file: 'dist/jquery-google-calendar-events.min.js',
			format: 'iife',
			name: 'jQueryGoogleCalendarEvents',
			globals
		},
		external: Object.keys('globals'),
		plugins: plugins.concat(terser())
	},
];