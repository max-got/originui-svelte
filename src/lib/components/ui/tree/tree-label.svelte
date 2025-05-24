<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { ItemInstance } from '@headless-tree/core';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface TreeItemLabelProps<T = any> extends HTMLAttributes<HTMLSpanElement> {
		item?: ItemInstance<T>;
	}

	const {
		children,
		class: className,
		item: propItem,
		...restProps
	}: TreeItemLabelProps<T> = $props();
	import { useTreeContext } from './tree-context.svelte';

	import { cn } from '$lib/utils';

	const { currentItem } = useTreeContext<T>();
	const item = $derived(propItem || currentItem);

	if (!item) {
		console.warn('TreeItemLabel: No item provided via props or context');
	}
</script>

{#if item}
	<span
		data-slot="tree-item-label"
		class={cn(
			'in-focus-visible:ring-ring/50 in-data-[selected=true]:bg-accent in-data-[selected=true]:text-accent-foreground in-data-[drag-target=true]:bg-accent in-focus-visible:ring-[3px] in-data-[search-match=true]:bg-blue-400/20! not-in-data-[folder=true]:ps-7 flex items-center gap-1 rounded-sm bg-background px-2 py-1.5 text-sm transition-colors hover:bg-accent [&_svg]:pointer-events-none [&_svg]:shrink-0',
			className
		)}
		{...restProps}
	>
		{#if item.isFolder()}
			<ChevronDownIcon class="in-aria-[expanded=false]:-rotate-90 size-4 text-muted-foreground" />
		{/if}
		{#if children}
			{@render children?.()}
		{:else}
			{typeof item.getItemName === 'function' ? item.getItemName() : null}
		{/if}
	</span>
{/if}
