import { start as _start } from './runtime/internal/start';
import Root from './components/root.svelte';

/** @param {{
 *   target: Node;
 *   trailing_slash: import('types/internal').TrailingSlash;
 *   base: string;
 * }} opts */
export async function start(opts) {
	await _start({Root, ...opts});
}
