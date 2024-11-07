<script lang="ts">
	import { getToggleGroupCtx } from '$lib/components/ui/toggle-group/toggle-group.svelte';
	import { type ToggleVariants, toggleVariants } from '$lib/components/ui/toggle.svelte';
	import { cn } from '$lib/utils.js';

	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';

	let {
		class: className,
		ref = $bindable(null),
		size,
		value,
		variant,
		...restProps
	}: ToggleGroupPrimitive.ItemProps & ToggleVariants = $props();

	const ctx = getToggleGroupCtx();
</script>

<ToggleGroupPrimitive.Item
	bind:ref
	{value}
	class={cn(
		toggleVariants({
			size: ctx.size || size,
			variant: ctx.variant || variant
		}),
		className
	)}
	{...restProps}
/>
