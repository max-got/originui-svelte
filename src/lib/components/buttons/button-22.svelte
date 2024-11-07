<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';

	import Plus from 'lucide-svelte/icons/plus';
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			{#snippet child({ props })}
				<Button variant="outline" size="icon" aria-label="Add new item" {...props}>
					<Plus size={16} stroke-width={2} aria-hidden="true" />
				</Button>
			{/snippet}
		</TooltipTrigger>
		<TooltipContent class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
			Tooltip
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
