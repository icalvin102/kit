import { Router } from './router.js';
import { Renderer } from './renderer.js';
import { init } from '../app/navigation.js';
import { set_paths } from '../paths.js';

/** @param {{
 *   base: string;
 *   target: Node;
 *   trailing_slash: import('types/internal').TrailingSlash;
 *   routes: any;
 *   fallback: any;
 *   Root: any;
 * }} opts */
export async function start({ base = '', target, trailing_slash = 'never', routes, fallback, Root }) {
	const host = location.host;
	const session = {};

	if (!target) {
		throw new Error('Missing target element. See https://kit.svelte.dev/docs#configuration-target');
	}

	const renderer = new Renderer({
		Root,
		fallback,
		target,
		session,
		host
	});

	const router = new Router({
		base,
		routes,
		trailing_slash,
		renderer
	});

	init(router);
	set_paths({ base, assets: ''});

	router.goto(location.href, { replaceState: true }, []);
	router.init_listeners();

	dispatchEvent(new CustomEvent('sveltekit:start'));
}

