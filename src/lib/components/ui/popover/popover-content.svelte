<script lang="ts">
	import { cn } from '$lib/utils.js';

	import { Popover as PopoverPrimitive } from 'bits-ui';

	let {
		align = 'center',
		class: className,
		portalProps,
		ref = $bindable(null),
		sideOffset = 4,
		...restProps
	}: PopoverPrimitive.ContentProps & {
		portalProps?: PopoverPrimitive.PortalProps;
	} = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
	<PopoverPrimitive.Content
		bind:ref
		{sideOffset}
		{align}
		class={cn(
			'z-50 min-w-[8rem] rounded-lg border border-input bg-popover p-4 text-popover-foreground shadow-lg shadow-black/5 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className
		)}
		{...restProps}
	/>
</PopoverPrimitive.Portal>
