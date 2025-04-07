<script lang="ts">
	import type { PossibleDependency } from '$lib/constants';

	import Button from '$lib/components/ui/button.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';

	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Package from 'lucide-svelte/icons/package';
	let { class: className, dependency }: { class?: string; dependency: PossibleDependency } =
		$props();
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					class={cn('grid h-fit items-start justify-stretch gap-2 border border-border', className)}
					href={dependency.url}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div class="flex items-center justify-between gap-4">
						<span class="font-mono text-sm" title={dependency.packageName}>
							{dependency.packageName}
						</span>
						<span
							class="justify-self-end rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground"
						>
							{dependency.dev ? 'Dev' : 'Prod'}
						</span>
					</div>

					<div class="flex items-center justify-between gap-4 text-xs text-muted-foreground">
						<div class="flex items-center">
							<Package class="mr-1 h-3 w-3" />
							<span class="truncate" title={dependency.name}>{dependency.name}</span>
						</div>
						<ExternalLink class="h-3 w-3" />
					</div>
				</Button>
			{/snippet}
		</TooltipTrigger>
		<TooltipContent class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground">
			<p>Package: {dependency.packageName}</p>
			<p>Name: {dependency.name}</p>
			<p>Type: {dependency.dev ? 'Dev Dependency' : 'Prod Dependency'}</p>
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
