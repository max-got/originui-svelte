<script lang="ts">
	import { cn } from '$lib/utils.js';

	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable<HTMLSpanElement | null>(null),
		class: className,
		label,
		placeholder,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & {
		ref?: HTMLSpanElement | null;
		label?: string;
		placeholder?: string;
	} = $props();
</script>

{#if children}
	{@render children?.()}
{:else}
	<span
		class={cn(className)}
		bind:this={ref}
		{...restProps}
		data-placeholder={!label ? '' : undefined}
	>
		{label || placeholder}
	</span>
{/if}
