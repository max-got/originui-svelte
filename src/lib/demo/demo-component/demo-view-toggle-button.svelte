<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';

	import Code from 'lucide-svelte/icons/code';
	import Eye from 'lucide-svelte/icons/eye';

	let {
		class: className,
		onToggle,
		showCode
	}: { class?: string; onToggle: () => void; showCode: boolean } = $props();
</script>

<div class={cn(className)}>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger
				onclick={onToggle}
				class="text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
				aria-label={showCode ? 'Show preview' : 'Show code'}
			>
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" {...props}>
						<div class="relative size-4">
							<div
								class={cn(
									'absolute inset-0 transition-all duration-300',
									showCode ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
								)}
							>
								<Code size={16} />
							</div>
							<div
								class={cn(
									'absolute inset-0 transition-all duration-300',
									showCode ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
								)}
							>
								<Eye size={16} />
							</div>
						</div>
					</Button>
				{/snippet}
			</TooltipTrigger>

			<TooltipContent
				class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground"
			>
				{showCode ? 'Show preview' : 'Show code'}
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</div>
