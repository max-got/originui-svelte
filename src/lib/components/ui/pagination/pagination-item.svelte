<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	import type { WithElementRef } from 'bits-ui';

	let {
		children,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLLiAttributes> = $props();
</script>

<li bind:this={ref} {...restProps}>
	{@render children?.()}
</li>
