<script lang="ts">
	import ContentImg from '$assets/dialog-content.png?w=764&h=432&enhanced';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip';
	import Button from '$lib/registry/default/ui/button.svelte';
</script>

<TooltipProvider delayDuration={0}>
	<Tooltip>
		<TooltipTrigger>
			{#snippet child({ props })}
				<Button variant="outline" size="sm" {...props}>W/ image</Button>
			{/snippet}
		</TooltipTrigger>
		<TooltipContent class="py-3">
			<div class="flex max-w-95.5 flex-col gap-y-2">
				<enhanced:img class="w-full rounded" src={ContentImg} alt="Content image" />
				<div class="flex flex-col gap-y-1">
					<p class="text-[13px] font-medium">Tooltip with title and icon</p>
					<p class="text-muted-foreground text-xs">
						Tooltips are made to be highly customizable, with features like dynamic placement, rich
						content, and a robust API.
					</p>
				</div>
			</div>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
