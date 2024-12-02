<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';

	const min = 0;
	const max = 100;

	let value = $state([25]);

	function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
		value[0] = parseFloat(e.currentTarget.value) || 0;
	}
</script>

<div class="space-y-3">
	<Label>Slider with input</Label>
	<div class="flex items-center gap-4">
		<Slider class="flex-grow" bind:value {min} {max} aria-label="Slider with input" />
		<Input
			class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			inputmode="decimal"
			{min}
			{max}
			value={value[0]}
			onchange={handleInputChange}
			aria-label="Enter value"
		/>
	</div>
</div>
