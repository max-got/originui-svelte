<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { type WithElementRef } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		children,
		class: className,
		inset,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		inset?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	class={cn('text-muted-foreground px-2 py-1.5 text-xs font-medium', inset && 'pl-8', className)}
	{...restProps}
>
	{@render children?.()}
</div>
