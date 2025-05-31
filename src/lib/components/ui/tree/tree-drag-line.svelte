<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	import { useTreeContext } from './tree-context.svelte';

	import { cn } from '$lib/utils';

	type TreeDragLineProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: TreeDragLineProps = $props();

	const ctx = useTreeContext();

	if (!ctx.tree || typeof ctx.tree.current.getDragLineStyle !== 'function') {
		console.warn(
			'TreeDragLine: No tree provided via context or tree does not have getDragLineStyle method'
		);
	}

	const dragLine = $derived.by(() =>
		Object.entries(ctx.tree?.reactive(() => ctx.tree?.current.getDragLineStyle()) ?? {})
			.map(([key, value]) => `${key}: ${value}`)
			.join('; ')
	);
</script>

<div
	style={dragLine}
	class={cn(
		'absolute z-30 -mt-px h-0.5 w-[unset] bg-primary before:absolute before:-top-[3px] before:left-0 before:size-2 before:rounded-full before:border-2 before:border-primary before:bg-background',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
