<script>
	export let index = 0;
	export let components;
	export let props;
</script>


<svelte:component this={components[index]} {...(props[`props_${index}`] || {})}>
	{#if index + 1 < components.length }
		<svelte:self {components} {props} index={index + 1} />
	{/if}
</svelte:component>
