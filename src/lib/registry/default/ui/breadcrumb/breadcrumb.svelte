<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from 'bits-ui';

	let {
		children,
		class: className,
		ref = $bindable(),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<nav class={className} bind:this={ref} aria-label="breadcrumb" {...restProps}>
	{@render children?.()}
</nav>
