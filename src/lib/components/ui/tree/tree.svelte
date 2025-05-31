<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { HTMLAttributes } from 'svelte/elements';

	import { treeContext } from './tree-context.svelte';
	import { cn } from '$lib/utils.js';

	import { mergeProps } from 'svelte-toolbelt';

	import type { ReactiveTree } from './use-tree.svelte';
	interface TreeProps extends HTMLAttributes<HTMLDivElement> {
		indent?: number;
		tree?: ReactiveTree<T>;
	}

	let { children, class: className, indent = 20, tree, ...props }: TreeProps = $props();

	treeContext.set({
		indent,
		tree: tree
	});

	const containerProps = $derived.by(() =>
		tree && typeof tree.current.getContainerProps === 'function'
			? tree.current.getContainerProps()
			: {}
	);

	const mergedProps = $derived.by(() => mergeProps(props, containerProps));

	// Extract style from mergedProps to merge with our custom styles
	const { style: propStyle, ...otherProps } = $derived.by(() => mergedProps);

	const mergedStyle = $derived.by(() =>
		[propStyle, `--tree-indent: ${indent}px`].filter(Boolean).join('; ')
	);
</script>

<div data-slot="tree" style={mergedStyle} class={cn('flex flex-col', className)} {...otherProps}>
	{@render children?.()}
</div>
