<script lang="ts">
	import { CreditCardIcon } from '@lucide/svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Cleave from 'cleave.js';

	const id = $props.id();

	let cardNumberRef = $state<HTMLInputElement>(null!);
	let expiryDateRef = $state<HTMLInputElement>(null!);
	let cvcRef = $state<HTMLInputElement>(null!);

	$effect(() => {
		if (!cardNumberRef || !expiryDateRef || !cvcRef) return;

		const cardNumberCleave = new Cleave(cardNumberRef, {
			creditCard: true
		});
		const expiryDateCleave = new Cleave(expiryDateRef, {
			date: true,
			datePattern: ['m', 'y']
		});
		const cvcCleave = new Cleave(cvcRef, {
			blocks: [4],
			numericOnly: true
		});

		return () => {
			cardNumberCleave.destroy();
			expiryDateCleave.destroy();
			cvcCleave.destroy();
		};
	});
</script>

<div class="*:not-first:mt-2">
	<Label>Card Details</Label>
	<div>
		<div class="relative focus-within:z-1">
			<Input
				id="number-{id}"
				bind:ref={cardNumberRef}
				type="text"
				placeholder="Card number"
				autocomplete="cc-number"
				class="peer rounded-b-none pe-9 shadow-none"
			/>
			<div
				class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
			>
				<CreditCardIcon class="size-4" />
				<span class="sr-only">Card Provider</span>
			</div>
		</div>
		<div class="-mt-px flex">
			<div class="min-w-0 flex-1 focus-within:z-1">
				<Input
					id="expiry-{id}"
					bind:ref={expiryDateRef}
					type="text"
					placeholder="MM/YY"
					autocomplete="cc-exp"
					class="rounded-e-none rounded-t-none shadow-none"
				/>
			</div>
			<div class="-ms-px min-w-0 flex-1 focus-within:z-1">
				<Input
					id="cvc-{id}"
					bind:ref={cvcRef}
					type="text"
					placeholder="CVC"
					autocomplete="cc-csc"
					class="rounded-s-none rounded-t-none shadow-none"
				/>
			</div>
		</div>
	</div>
	<p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
		Built with <a
			class="hover:text-foreground underline"
			href="https://github.com/nosir/cleave.js"
			target="_blank"
			rel="noopener nofollow"
		>
			cleave.js
		</a>
	</p>
</div>
