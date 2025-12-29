<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';

	import Button from '$lib/registry/default/ui/button.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/registry/default/ui/tooltip';
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			{#snippet child({ props })}
				<Button variant="outline" size="icon" aria-label="Add new item" {...props}>
					<Plus size={16} aria-hidden="true" />
				</Button>
			{/snippet}
		</TooltipTrigger>
		<TooltipContent class="px-2 py-1 text-xs">Tooltip</TooltipContent>
	</Tooltip>
</TooltipProvider>
