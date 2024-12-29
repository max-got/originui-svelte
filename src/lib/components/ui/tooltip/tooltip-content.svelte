<script lang="ts">
	import type { TooltipContentProps } from 'bits-ui';

	import { cn } from '$lib/utils.js';

	import { Tooltip } from 'bits-ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		showArrow = false,
		sideOffset = 4,
		...restProps
	}: TooltipContentProps & { showArrow?: boolean } = $props();
</script>

<Tooltip.Portal>
	<Tooltip.Content
		{ref}
		{sideOffset}
		class={cn(
			'relative z-50 max-w-[280px] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showArrow}
			<Tooltip.Arrow class="-my-px text-popover drop-shadow-[0_1px_0_hsl(var(--border))]" />
		{/if}
	</Tooltip.Content>
</Tooltip.Portal>
