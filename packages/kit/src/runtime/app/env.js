/**
 * @param {string} key
 * @returns {any}
 */
const env = (key) => (import.meta?.env)[key];

/**
 * @type {import('$app/env').browser}
 */
export const browser = !env('SSR');
/**
 * @type {import('$app/env').dev}
 */
export const dev = !!env('DEV');
/**
 * @type {import('$app/env').mode}
 */
export const mode = env('MODE') || 'production';
/**
 * @type {import('$app/env').amp}
 */
export const amp = !!env('VITE_SVELTEKIT_AMP');

export { prerendering } from '../env.js';
