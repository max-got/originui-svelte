<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import { cn } from '$lib/utils.js';

	import { PinInput, type PinInputCell } from 'bits-ui';

	let value = $state('');
	const uid = $props.id();
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
	<Label for={uid}>OTP input single</Label>
	<PinInput.Root
		bind:value
		id={uid}
		class="flex items-center gap-3 has-[:disabled]:opacity-50"
		maxlength={4}
	>
		{#snippet children({ cells })}
			<div class="flex">
				<!-- eslint-disable-next-line svelte/require-each-key -->
				{#each cells as cell}
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
