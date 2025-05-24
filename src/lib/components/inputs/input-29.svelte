<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import { CurrencyInput } from '$lib/hooks/use-currency-input.svelte';

	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';

	const uid = $props.id();
	const currencyInput = new CurrencyInput({ id: uid, initialValue: 99 });
</script>

<div class="space-y-2">
	<Label for={currencyInput.inputProps.id} class="text-sm font-medium text-foreground">
		Number input with chevrons
	</Label>
	<div
		class="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2"
	>
		<input
			class="flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none"
			{...currencyInput.inputProps}
		/>
		<div class="flex h-[calc(100%+2px)] flex-col">
			<button
				class="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				{...currencyInput.incrementProps}
			>
				<ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
			</button>
			<button
				class="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				{...currencyInput.decrementProps}
			>
				<ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
			</button>
		</div>
	</div>
</div>
