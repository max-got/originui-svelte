<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import { DefaultDateDelimiter, formatDate, registerCursorTracker } from 'cleave-zen';

	let inputRef = $state<HTMLInputElement>(null!);

	$effect(() => {
		if (!inputRef) return;

		const unregisterCursorTracker = registerCursorTracker({
			delimiter: DefaultDateDelimiter,
			input: inputRef
		});
		const handleInput = (event: Event) => {
			const input = event.target as HTMLInputElement;
			input.value = formatDate(input.value, {
				datePattern: ['m', 'y']
			});
		};

		inputRef.addEventListener('input', handleInput);

		return () => {
			inputRef.removeEventListener('input', handleInput);
			unregisterCursorTracker();
		};
	});
</script>

<div class="*:not-first:mt-2">
	<Label for="input-49">Expiry date</Label>
	<Input
		id="input-49"
		bind:ref={inputRef}
		type="text"
		placeholder="MM/YY"
		autocomplete="cc-exp"
		class="peer pe-11"
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
