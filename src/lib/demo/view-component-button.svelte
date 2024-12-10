<script lang="ts">
	import type { TooltipTriggerProps } from 'bits-ui';

	import Button from '$lib/components/ui/button.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';

	import Code from 'lucide-svelte/icons/code';

	let {
		class: className,
		href,
		onToggle
	}: { class?: string; href: string; onToggle: TooltipTriggerProps['onclick'] } = $props();
</script>

<div class={cn(className)}>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger
				onclick={onToggle}
				class="text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
				aria-label="View component Details"
			>
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" {...props} {href}>
						<Code size={16} aria-hidden />
						<span class="sr-only">View component Details</span>
					</Button>
				{/snippet}
			</TooltipTrigger>

			<TooltipContent
				class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground"
			>
				View component details
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</div>
