<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import TreeContextProvider from './tree-context-provider.svelte';
	import { useTreeContext } from './tree-context.svelte';

	import { cn } from '$lib/utils';
	import { mergeProps } from 'svelte-toolbelt';

	import type { ReactiveItemInstance } from './use-tree.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface TreeItemProps<T = any> extends HTMLAttributes<HTMLElement> {
		child?: Snippet<[{ props: HTMLAttributes<HTMLElement> }]>;
		indent?: number;
		item: ReactiveItemInstance<T>;
	}

	const {
		child,
		children,
		class: className,
		item,
		...props
	}: Omit<TreeItemProps<T>, 'indent'> = $props();

	const treeContext = useTreeContext<T>();

	const itemProps = $derived.by(() => {
		const props = typeof item.getProps === 'function' ? item.getProps() : {};
		return props;
	});

	const { style: propStyle, ...otherProps } = $derived.by(() => mergeProps(props, itemProps));

	const mergedStyle = $derived.by(() =>
		[`--tree-padding: ${item.getItemMeta()?.level * treeContext.indent}px;`, propStyle]
			.filter(Boolean)
			.join('; ')
	);

	const mergedProps = $derived.by(() => {
		return {
			'aria-expanded': item.isExpanded() ?? false,
			class: cn(
				'group/tree-item z-10 ps-[--tree-padding] outline-none select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
				className
			),
			'data-drag-target':
				typeof item.isDragTarget === 'function' ? item.isDragTarget() || false : undefined,
			'data-focus': typeof item.isFocused === 'function' ? item.isFocused() || false : undefined,
			'data-folder': typeof item.isFolder === 'function' ? item.isFolder() || false : undefined,
			'data-search-match':
				typeof item.isMatchingSearch === 'function' ? item.isMatchingSearch() || false : undefined,
			'data-selected':
				typeof item.isSelected === 'function' ? item.isSelected() || false : undefined,
			'data-slot': 'tree-item',
			style: mergedStyle,
			...otherProps
		} as const;
	});
</script>

<TreeContextProvider currentItem={item} indent={treeContext.indent}>
	{#if child}
		{@render child({ props: mergedProps })}
	{:else}
		<button {...mergedProps}>
			{@render children?.()}
		</button>
	{/if}
</TreeContextProvider>
