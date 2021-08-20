import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

(fs.rmSync || fs.rmdirSync)('assets/runtime', { recursive: true, force: true });

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
			dir: 'assets/runtime',
			format: 'esm'
		},
		external: ['svelte', 'svelte/store', 'ROOT', 'MANIFEST'],
		plugins: [
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			})
		]
	},

	{
		input: 'src/runtime/client/create_manifest.js',
		output: {
			file: 'assets/runtime/createmanifest.cjs',
			format: 'cjs'
		},
		plugins: [
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			}),
			commonjs()
		]
	}
];
