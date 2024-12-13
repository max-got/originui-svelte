<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { DropdownMenu as DropdownMenuPrimitive, type WithoutChild } from 'bits-ui';
	import Circle from 'lucide-svelte/icons/circle';

	let {
		children: childrenProp,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<DropdownMenuPrimitive.RadioItemProps> = $props();
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	class={cn(
		'relative flex cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			{#if checked}
				<Circle class="size-2 fill-current" />
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>
