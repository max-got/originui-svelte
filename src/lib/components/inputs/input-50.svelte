<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import { formatGeneral } from 'cleave-zen';

	let inputRef = $state<HTMLInputElement>(null!);

	$effect(() => {
		if (!inputRef) return;

		const handleInput = (event: Event) => {
			const input = event.target as HTMLInputElement;
			input.value = formatGeneral(input.value, {
				blocks: [4],
				numericOnly: true
			});
		};

		inputRef.addEventListener('input', handleInput);

		return () => inputRef.removeEventListener('input', handleInput);
	});
</script>

<div class="*:not-first:mt-2">
	<Label for="input-50">Code</Label>
	<Input
		id="input-50"
		bind:ref={inputRef}
		type="text"
		placeholder="CVC"
		autocomplete="cc-csc"
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
