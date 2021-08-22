import {resolve, dirname, relative, basename} from 'path';
import create_manifest_data from '../../core/create_manifest_data/index.js';

const NAME = 'svelte-kitlike-router';

function relativePath(dir) {
	return (path) => {
		if (resolve(path).startsWith(dir)) {
			return './' + relative(dir, path);
		}
		return path;
	}
}

function createConfig(routes_dir) {
	return {
		extensions: ['.svelte'],
		kit: {
			files: {
				assets: routes_dir,
				routes: routes_dir
			},
			serviceWorker: {exclude: []}
		}
	};
}

function createManifest(routes_dir) {
	const config = createConfig(routes_dir);
	const manifest = create_manifest_data({ config, output: NAME});

	return stringifyManifest(manifest, routes_dir);
}

function transformManifest(manifest, dir) {
	const result = {};
	const { components, routes, error, layout } = manifest;
	const makeRelative = relativePath(dir);

	const indexOf = (path) => components.indexOf(path);

	result.components = components.map(makeRelative);
	result.fallback = [indexOf(layout), indexOf(error)];

	result.routes = routes
		.filter((route) => route.type === 'page')
		.map((route) => ({
			pattern: route.pattern.toString(),
			params: route.params,
			a: (route.a || []).map(indexOf),
			b: (route.b || []).map(indexOf),
			comment: route.a[route.a.length-1]
		}));

	return result;
}


function stringifyImports(components) {
	return components
		.map((p, i) => `import * as C${i} from '${p}';`)
		.join('\n');
}

function stringifyModules(components){
	const modules = components
		.map((path, i) => `\t() => C${i}, // ${path}`)
		.join(',\n');
	return `const c = [\n${modules}\n];`;
}

function stringifyGetParams(params) {
	const result = params
		.map((p, i) => `${p}: d(m[${i + 1}])`)
		.join(', ');
	return result ? `(m) => ({${result}})` : '/* no params */';
}

function stringifyRoute({ pattern, comment, ...route}) {
	const a = route.a.map((i) => `c[${i}]`).join(', ');
	const b = route.b.map((i) => `c[${i}]`).join(', ');
	const params = stringifyGetParams(route.params);
	return `\n
	// ${comment}
	[${pattern}, [${a}], [${b}], ${params}]`;

}

function stringifyManifest(manifest, dir) {
	const { components, routes, fallback } = transformManifest(manifest, dir);
	const parts = {};

	parts.imports = stringifyImports(components);
	parts.components = stringifyModules(components);

	parts.routes = [
		'export const routes = [',
		routes.map(stringifyRoute).join(','),
		'];'
	].join('\n');

	parts.fallback = [
		'export const fallback = ',
		'[', fallback.map(i => `c[${i}]()`), '];'
	].join('');

	return [
		parts.imports,
		'const d = decodeURIComponent;',
		parts.components,
		parts.routes,
		parts.fallback,
	].join('\n\n');
}

function createManifestPlugin() {
	const pattern = /manifest\.(ts|js)/;
	return {
		name: NAME,
		transform(code, id) {
			if (pattern.test(basename(id))) {
				const manifest = createManifest(dirname(id));
				console.log('creaded manifest');
				console.log(manifest);
				return manifest;
			}	
		}
	}
}

export default createManifestPlugin;
