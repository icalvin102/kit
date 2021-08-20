import { start as _start } from './runtime/internal/startrouter';
import * as FallbackComp from './components/layout.svelte';
import * as FallbackErrorComp from './components/error.svelte';

const fallback = [FallbackComp, FallbackErrorComp];

/** @param {{
 *   target: Node;
 *   trailing_slash: import('types/internal').TrailingSlash;
 *   base: string;
 * }} opts */
export async function start(opts): void;
