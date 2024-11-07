<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger
	} from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';

	import Check from 'lucide-svelte/icons/check';
	import Copy from 'lucide-svelte/icons/copy';

	let copied = $state(false);
	let inputElement = $state<HTMLInputElement | null>(null);

	async function handleCopy() {
		if (!inputElement) return;

		await navigator.clipboard.writeText(inputElement.value);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1500);
	}
</script>

<div class="space-y-2">
	<Label for="input-53">Copy to clipboard</Label>
	<div class="relative">
		<Input
			bind:ref={inputElement}
			id="input-53"
			class="pe-9"
			type="text"
			value="pnpm install origin-ui-svelte"
			readonly
		/>
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onclick={handleCopy}
					class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed"
					aria-label={copied ? 'Copied' : 'Copy to clipboard'}
					disabled={copied}
				>
					{#snippet child({ props })}
						<button {...props}>
							<div
								class={cn('transition-all', copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0')}
							>
								<Check class="stroke-emerald-500" size={16} stroke-width={2} aria-hidden="true" />
							</div>
							<div
								class={cn(
									'absolute transition-all',
									copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
								)}
							>
								<Copy size={16} stroke-width={2} aria-hidden="true" />
							</div>
						</button>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent
					class="border border-input bg-popover px-2 py-1 text-xs text-muted-foreground"
				>
					Copy to clipboard
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	</div>
</div>
