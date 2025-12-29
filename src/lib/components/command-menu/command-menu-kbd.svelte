<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils';

	interface CommandMenuKbdProps extends HTMLAttributes<HTMLElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className = '', ...restProps }: CommandMenuKbdProps = $props();
</script>

<kbd
	class={cn(
		"bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
		className
	)}
	{...restProps}
>
	{@render children()}
</kbd>
