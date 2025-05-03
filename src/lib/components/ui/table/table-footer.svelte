<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props();
</script>

<tfoot
	bind:this={ref}
	data-slot="table-footer"
	class={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
	{...restProps}
>
	{@render children?.()}
</tfoot>
