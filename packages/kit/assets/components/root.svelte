<script>
  import Route from './route.svelte';
	import { setContext, afterUpdate, onMount } from 'svelte';

	// stores
	export let stores;
	export let page;

	export let components;

	setContext('__svelte__', stores);

	$: stores.page.set(page);
	afterUpdate(stores.page.notify);

	let mounted = false;
	let navigated = false;
	let title = null;

	onMount(() => {
		const unsubscribe = stores.page.subscribe(() => {
			if (mounted) {
				navigated = true;
				title = document.title || 'untitled page';
			}
		});

		mounted = true;
		return unsubscribe;
	});
</script>

<Route {components} props={$$restProps} />

{#if mounted}
	<div id="svelte-announcer" aria-live="assertive" aria-atomic="true">
		{#if navigated}
			{title}
		{/if}
	</div>
{/if}

<style>
	#svelte-announcer {
		position: absolute;
		left: 0;
		top: 0;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		overflow: hidden;
		white-space: nowrap;
		width: 1px;
		height: 1px;
	}
</style>
