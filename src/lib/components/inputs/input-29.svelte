<script lang="ts">
	// Dependencies: pnpm install lucide-svelte @canutin/svelte-currency-input
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Label from '$lib/components/ui/label.svelte';
	import CurrencyInput from '@canutin/svelte-currency-input';

	let value = $state(99);
</script>

<div class="space-y-2">
	<Label for="input-29" class="text-sm font-medium text-foreground"
		>Number input with chevrons</Label
	>
	<div
		class="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/30 focus-within:ring-offset-2"
	>
		<CurrencyInput
			id="input-29"
			autocomplete="off"
			name="total"
			bind:value
			locale="de-DE"
			currency="EUR"
			inputClasses={{
				wrapper: 'flex-1',
				formatted: 'bg-background px-3 py-2 tabular-nums !text-foreground focus:outline-none'
			}}
		/>
		<div class="flex h-[calc(100%+2px)] flex-col">
			<button
				id="increment-button"
				onclick={() => value++}
				class="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Increase value"
				aria-labelledby="increment-button input-29"
				aria-controls="input-29"
			>
				<ChevronUp size={12} stroke-width={2} aria-hidden="true" />
			</button>
			<button
				id="decrement-button"
				onclick={() => value--}
				class="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Decrease value"
				aria-labelledby="decrement-button input-29"
				aria-controls="input-29"
			>
				<ChevronDown size={12} stroke-width={2} aria-hidden="true" />
			</button>
		</div>
	</div>
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Built with <a
			class="underline hover:text-foreground"
			href="https://github.com/fmaclen/svelte-currency-input"
			target="_blank"
			rel="noopener nofollow"
		>
			Svelte Currency Input
		</a>
	</p>
</div>
