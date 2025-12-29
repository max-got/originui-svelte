<script lang="ts">
	import type { HTMLOlAttributes } from 'svelte/elements';

	import type { WithElementRef } from 'bits-ui';

	import { cn } from '$lib/registry/default/lib/utils.js';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLOlAttributes> = $props();
</script>

<ol
	bind:this={ref}
	class={cn(
		'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</ol>
