<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import { cn } from '$lib/utils.js';

	import { PinInput, type PinInputCell } from 'bits-ui';
	import Minus from 'lucide-svelte/icons/minus';

	let value = $state('');
</script>

{#snippet Cell(cell: PinInputCell)}
	<PinInput.Cell
		{cell}
		class={cn(
			'relative flex size-9 items-center justify-center border-y border-e border-input bg-background font-medium text-foreground shadow-sm shadow-black/[.04] ring-offset-background transition-all first:rounded-s-lg first:border-s last:rounded-e-lg',
			{ 'z-10 border border-ring ring-2 ring-ring/30 ring-offset-2': cell.isActive }
		)}
	>
		{#if cell.char !== null}
			<div>{cell.char}</div>
		{/if}
	</PinInput.Cell>
{/snippet}

<div class="space-y-2">
	<Label for="input-45">OTP input double</Label>
	<PinInput.Root
		bind:value
		id="input-45"
		class="flex items-center gap-3 has-[:disabled]:opacity-50"
		maxlength={6}
	>
		{#snippet children({ cells })}
			<div class="flex">
				{#each cells.slice(0, 3) as cell}
					{@render Cell(cell)}
				{/each}
			</div>

			<div class="text-muted-foreground/80">
				<Minus size={16} strokeWidth={2} aria-hidden="true" />
			</div>

			<div class="flex">
				{#each cells.slice(3) as cell}
					{@render Cell(cell)}
				{/each}
			</div>
		{/snippet}
	</PinInput.Root>
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Built with <a
			class="underline hover:text-foreground"
			href="https://next.bits-ui.com/docs/components/pin-input"
			target="_blank"
			rel="noopener nofollow"
		>
			Bits UI PIN Input
		</a>
	</p>
</div>
