<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Cleave from 'cleave.js';

	let inputRef = $state<HTMLInputElement>(null!);

	$effect(() => {
		if (!inputRef) return;

		const cleave = new Cleave(inputRef, {
			blocks: [4],
			numericOnly: true
		});

		return () => cleave.destroy();
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
			href="https://github.com/nosir/cleave.js"
			target="_blank"
			rel="noopener nofollow"
		>
			cleave.js
		</a>
	</p>
</div>
