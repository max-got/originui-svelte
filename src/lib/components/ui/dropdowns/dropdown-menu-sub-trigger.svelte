<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	let {
		children,
		class: className,
		inset,
		ref = $bindable(null),
		...restProps
	}: DropdownMenuPrimitive.SubTriggerProps & {
		inset?: boolean;
	} = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
	bind:ref
	class={cn(
		'flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		inset && 'pl-8',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronRight class="ml-auto text-muted-foreground/80" />
</DropdownMenuPrimitive.SubTrigger>
