# svelte-kitlike-router - Standalone SvelteKit SPA Router


### Install

```bash
npm install svelte-kitlike-router 
```

### Usage

Add the createmanifest plugin to your `rollup.config.js`.

```js
// rollup.config.js

import createManifest from 'svelte-kitlike-router/createmanifest';

export default {
	input: 'src/main.js',
	output,
	plugins: [
		/* ... Other Plugins */

		createManifest(),
	]
};
```

Add the following code to your `main.js` file.

```js
import { start } from 'svelte-kitlike-router';
import { routes, fallback } from './routes/manifest.js'

start({
  target: document.body,
  routes,
	fallback
});
```

The `start` function creates the `root` component of your app and attaches
it to the DOM. 

The contents of the `manifest.js` file will be generated automatically by
the rollup plugin. Just place a empty `manifest.js` file in the root directory
of your route components and import it like in the example above.

See the [SvelteKit documentation](https://kit.svelte.dev/docs) to learn more
about the routing in SvelteKit. 

**Supported SvelteKit features:**

- [routing](https://kit.svelte.dev/docs#routing)
- [layouts](https://kit.svelte.dev/docs#layouts)
- [loading](https://kit.svelte.dev/docs#loading)
- the [$app module](https://kit.svelte.dev/docs#modules-$app-navigation) is availibe through the following imports
	- `svelte-kitlike-router/app/navigation`
	- `svelte-kitlike-router/app/stores`
	- `svelte-kitlike-router/app/paths`
	- `svelte-kitlike-router/app/env` not really usefuleful at the moment as the values are static
- [anchor-options](https://kit.svelte.dev/docs#anchor-options)

