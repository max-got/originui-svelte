<!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
<script lang="ts" generics="T = any">
	import type { TreeInstance } from '@headless-tree/core';
	import type { HTMLAttributes } from 'svelte/elements';

	import TreeContextProvider from './tree-context-provider.svelte';
	import { cn } from '$lib/utils.js';

	import { mergeProps } from 'bits-ui';

	interface TreeProps extends HTMLAttributes<HTMLDivElement> {
		indent?: number;

		tree?: TreeInstance<T>;
	}

	let { children, class: className, indent = 20, style, tree, ...props }: TreeProps = $props();

	const containerProps = $derived.by(() => {
		if (tree && typeof tree.getContainerProps === 'function') {
			return tree.getContainerProps();
		}

		return {};
	});

	const { style: propStyle, ...otherProps } = $derived.by(() => mergeProps(props, containerProps));

	const mergedStyle = $derived.by(() =>
		[style, propStyle, `--tree-indent: ${indent}px`].filter(Boolean).join('; ')
	);
</script>

<TreeContextProvider {tree} {indent}>
	<div data-slot="tree" style={mergedStyle} class={cn('flex flex-col', className)} {...otherProps}>
		{@render children?.()}
	</div>
</TreeContextProvider>
