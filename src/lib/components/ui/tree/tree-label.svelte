<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { ItemInstance } from '@headless-tree/core';
	import type { HTMLAttributes } from 'svelte/elements';

	import { useTreeContext } from './tree-context.svelte';

	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { cn } from '$lib/utils';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface TreeItemLabelProps<T = any> extends HTMLAttributes<HTMLElement> {
		item?: ItemInstance<T>;
	}

	const {
		children,
		class: className,
		item: propItem,
		...restProps
	}: TreeItemLabelProps<T> = $props();

	const ctx = useTreeContext<T>();
	const item = propItem || ctx.currentItem;

	if (!item) {
		console.warn('TreeItemLabel: No item provided via props or context');
	}
</script>

{#if item}
	<span
		data-slot="tree-item-label"
		class={cn(
			'flex items-center gap-1 rounded-sm bg-background px-2 py-1.5 text-sm transition-colors hover:bg-accent  data-[selected=true]:bg-accent data-[folder=true]:ps-7 group-data-[selected=true]/tree-item:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
			'group-data-[drag-target=true]/tree-item:bg-accent group-data-[search-match=true]/tree-item:bg-blue-400/20 group-data-[selected=true]/tree-item:bg-accent',
			'group-focus-visible/tree-item:outline-none group-focus-visible/tree-item:ring-[3px] group-focus-visible/tree-item:ring-ring/50',
			className
		)}
		{...restProps}
	>
		{#if item.isFolder()}
			<ChevronDownIcon class="size-4 text-muted-foreground aria-[expanded=false]:-rotate-90" />
		{/if}
		{#if children}
			{@render children?.()}
		{:else}
			{typeof item.getItemName === 'function' ? item.getItemName() : null}
		{/if}
	</span>
{/if}
