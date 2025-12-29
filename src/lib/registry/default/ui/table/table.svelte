<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';

	import type { WithElementRef } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLTableAttributes> = $props();
</script>

<div class="relative w-full overflow-auto">
	<table bind:this={ref} class={cn('w-full caption-bottom text-sm', className)} {...restProps}>
		{@render children?.()}
	</table>
</div>
