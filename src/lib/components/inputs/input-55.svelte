<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import Inputmask from 'inputmask';

	let inputElement = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (!inputElement) return;
		const im = new Inputmask('99:99:99', {
			placeholder: '-',
			showMaskOnHover: false
		}).mask(inputElement);

		return () => im.remove();
	});
</script>

<div class="space-y-2">
	<Label for="input-55">Timestamp</Label>
	<Input id="input-55" placeholder="00:00:00" type="text" bind:ref={inputElement} />
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Built with <a
			class="underline hover:text-foreground"
			href="https://github.com/RobinHerbots/inputmask"
			target="_blank"
			rel="noopener nofollow">inputmask</a
		>
	</p>
</div>
