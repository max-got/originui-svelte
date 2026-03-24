<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import { CreditCardIcon } from '@lucide/svelte';
	import {
		DefaultCreditCardDelimiter,
		DefaultDateDelimiter,
		formatCreditCard,
		formatDate,
		formatGeneral,
		registerCursorTracker
	} from 'cleave-zen';

	const id = $props.id();

	const cardNumberAttachment: Attachment<HTMLInputElement> = (input) => {
		const unregisterCursorTracker = registerCursorTracker({
			delimiter: DefaultCreditCardDelimiter,
			input
		});

		const handleInput = (event: Event) => {
			const target = event.target as HTMLInputElement;
			target.value = formatCreditCard(target.value);
		};

		input.addEventListener('input', handleInput);

		return () => {
			input.removeEventListener('input', handleInput);
			unregisterCursorTracker();
		};
	};

	const expiryAttachment: Attachment<HTMLInputElement> = (input) => {
		const unregisterCursorTracker = registerCursorTracker({
			delimiter: DefaultDateDelimiter,
			input
		});

		const handleInput = (event: Event) => {
			const target = event.target as HTMLInputElement;
			target.value = formatDate(target.value, {
				datePattern: ['m', 'y']
			});
		};

		input.addEventListener('input', handleInput);

		return () => {
			input.removeEventListener('input', handleInput);
			unregisterCursorTracker();
		};
	};

	const cvcAttachment: Attachment<HTMLInputElement> = (input) => {
		const handleInput = (event: Event) => {
			const target = event.target as HTMLInputElement;
			target.value = formatGeneral(target.value, {
				blocks: [4],
				numericOnly: true
			});
		};

		input.addEventListener('input', handleInput);

		return () => input.removeEventListener('input', handleInput);
	};
</script>

<div class="*:not-first:mt-2">
	<Label>Card Details</Label>
	<div>
		<div class="relative focus-within:z-1">
			<Input
				id="number-{id}"
				type="text"
				placeholder="Card number"
				autocomplete="cc-number"
				class="peer rounded-b-none pe-9 shadow-none"
				{@attach cardNumberAttachment}
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
					type="text"
					placeholder="MM/YY"
					autocomplete="cc-exp"
					class="rounded-e-none rounded-t-none shadow-none"
					{@attach expiryAttachment}
				/>
			</div>
			<div class="-ms-px min-w-0 flex-1 focus-within:z-1">
				<Input
					id="cvc-{id}"
					type="text"
					placeholder="CVC"
					autocomplete="cc-csc"
					class="rounded-s-none rounded-t-none shadow-none"
					{@attach cvcAttachment}
				/>
			</div>
		</div>
	</div>
	<p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
		Built with <a
			class="hover:text-foreground underline"
			href="https://github.com/nosir/cleave-zen"
			target="_blank"
			rel="noopener nofollow"
		>
			cleave-zen
		</a>
	</p>
</div>
