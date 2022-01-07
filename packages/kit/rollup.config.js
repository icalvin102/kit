import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

[
	'assets/runtime',
	'router/runtime',
	'router/createmanifest'
].forEach((path) => {
	(fs.rmSync || fs.rmdirSync)(path, { recursive: true, force: true });
});

const external = [].concat(
	Object.keys(pkg.dependencies || {}),
	Object.keys(pkg.peerDependencies || {}),
	Object.keys(process.binding('natives')),
	'typescript',
	'svelte2tsx'
);

export default [
	{
		input: {
			'internal/start': 'src/runtime/client/start.js',
			'app/navigation': 'src/runtime/app/navigation.js',
			'app/stores': 'src/runtime/app/stores.js',
			'app/paths': 'src/runtime/app/paths.js',
			'app/env': 'src/runtime/app/env.js',
			paths: 'src/runtime/paths.js',
			env: 'src/runtime/env.js'
		},
		output: {
			dir: 'router/runtime',
			format: 'esm',
			paths: {
				ROOT: '../../components/root.svelte'
			}
		},
		external: ['svelte', 'svelte/store', 'ROOT'],
		plugins: [
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			})
		]
	},

	{
		input: 'src/runtime/client/create_manifest.js',
		output: {
			file: 'router/createmanifest/index.cjs',
			format: 'cjs'
		},
		plugins: [
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			}),
			commonjs()
		]
	},

	{
		input: 'src/runtime/client/create_manifest.js',
		output: {
			file: 'router/createmanifest/index.js',
			format: 'esm'
		},
		plugins: [
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			}),
			commonjs()
		]
	}
];
