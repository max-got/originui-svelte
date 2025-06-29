<script lang="ts">
	import Button from '$lib/registry/default/ui/button.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/registry/default/ui/tooltip';
	import { cn } from '$lib/registry/default/lib/utils';

	import CheckIcon from '@lucide/svelte/icons/check';
	import CopyIcon from '@lucide/svelte/icons/copy';

	let copied = $state(false);

	function handleCopy() {
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger
			class="disabled:opacity-100"
			onclick={handleCopy}
			aria-label={copied ? 'Copied' : 'Copy component source'}
			disabled={copied}
		>
			{#snippet child({ props })}
				<Button variant="outline" size="icon" {...props}>
					<div class={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}>
						<CheckIcon class="stroke-emerald-500" size={16} aria-hidden="true" />
					</div>
					<div
						class={cn(
							'absolute transition-all',
							copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
						)}
					>
						<CopyIcon size={16} aria-hidden="true" />
					</div>
				</Button>
			{/snippet}
		</TooltipTrigger>
		<TooltipContent class="px-2 py-1 text-xs">Click to copy</TooltipContent>
	</Tooltip>
</TooltipProvider>
