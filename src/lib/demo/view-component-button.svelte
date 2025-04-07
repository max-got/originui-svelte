<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Button from '$lib/components/ui/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';

	import Code from 'lucide-svelte/icons/code';

	type Props = ComponentProps<typeof Tooltip.TooltipTrigger>;

	let { class: className, onclick, ...restProps }: Props = $props();
</script>

<div class={cn(className)}>
	<Tooltip.TooltipProvider>
		<Tooltip.Tooltip>
			<Tooltip.TooltipTrigger
				{onclick}
				class="text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
				aria-label="View component Details"
				{...restProps}
			>
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" {...props}>
						<Code size={16} aria-hidden />
						<span class="sr-only">View component Details</span>
					</Button>
				{/snippet}
			</Tooltip.TooltipTrigger>

			<Tooltip.TooltipContent
				class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground"
			>
				View component details
			</Tooltip.TooltipContent>
		</Tooltip.Tooltip>
	</Tooltip.TooltipProvider>
</div>
