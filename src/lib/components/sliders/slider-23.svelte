<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';

	const min = 0;
	const max = 100;

	let value = $state(25);

	function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
		value = parseFloat(e.currentTarget.value) || 0;
	}
</script>

<div class="space-y-4">
	<Label>Vertical slider with input</Label>
	<div class="flex h-40 flex-col items-center justify-center gap-4">
		<Slider
			type="single"
			class="data-[orientation=vertical]:min-h-0"
			orientation="vertical"
			bind:value
			{min}
			{max}
			aria-label="Slider with input"
		/>
		<Input
			class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			inputmode="decimal"
			onchange={handleInputChange}
			{min}
			{max}
			{value}
			aria-label="Enter value"
		/>
	</div>
</div>
