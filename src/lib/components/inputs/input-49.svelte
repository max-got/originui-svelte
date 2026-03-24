<script lang="ts">
	import type { Attachment } from 'svelte/attachments';

	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import { DefaultDateDelimiter, formatDate, registerCursorTracker } from 'cleave-zen';

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
</script>

<div class="*:not-first:mt-2">
	<Label for="input-49">Expiry date</Label>
	<Input
		id="input-49"
		type="text"
		placeholder="MM/YY"
		autocomplete="cc-exp"
		class="peer pe-11"
		{@attach expiryAttachment}
	/>
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
