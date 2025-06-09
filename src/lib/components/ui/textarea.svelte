<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	let {
		class: className,
		ref = $bindable(null),
		value = $bindable(),
		...restProps
	}: WithElementRef<HTMLTextareaAttributes> = $props();
</script>

<textarea
	bind:this={ref}
	bind:value
	class={cn(
		'border-input bg-background text-foreground ring-offset-background placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/30 flex min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm shadow-xs shadow-black/[.04] transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...restProps}
></textarea>
