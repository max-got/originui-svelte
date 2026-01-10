<script lang="ts">
	import { CreditCardIcon } from '@lucide/svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Cleave from 'cleave.js';

	let inputRef = $state<HTMLInputElement>(null!);

	$effect(() => {
		if (!inputRef) return;

		const cleave = new Cleave(inputRef, {
			creditCard: true
		});

		return () => cleave.destroy();
	});
</script>

<div class="*:not-first:mt-2">
	<Label for="input-48">Card Number</Label>
	<div class="relative">
		<Input
			id="input-48"
			bind:ref={inputRef}
			type="text"
			placeholder="Card number"
			autocomplete="cc-number"
			class="peer pe-11"
		/>
		<div
			class="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
		>
			<CreditCardIcon class="size-4" />
			<span class="sr-only">Card Provider</span>
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
