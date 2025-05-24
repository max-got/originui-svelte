<script lang="ts">
	import { cn } from '$lib/utils.js';

	import Check from '@lucide/svelte/icons/check';
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		children: childrenProp,
		class: className,
		label,
		ref = $bindable(null),
		value,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	class={cn(
		'relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ highlighted, selected })}
		<span class="absolute left-2 flex size-3.5 items-center justify-center">
			{#if selected}
				<Check size={16} stroke-width={2} />
			{/if}
		</span>
		<span>
			{#if childrenProp}
				{@render childrenProp({ highlighted, selected })}
			{:else}
				{label || value}
			{/if}
		</span>
	{/snippet}
</SelectPrimitive.Item>
