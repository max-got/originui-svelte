<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		className = '',
		children,
		...restProps
	}: {
		className?: string;
		children?: Snippet;
	} = $props();
</script>

<h3 data-slot="stepper-title" class={cn('text-sm font-medium', className)} {...restProps}>
	{@render children?.()}
</h3>
