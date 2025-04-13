<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';

	const min = 0;
	const max = 200;

	let value = $state([50, 150]);

	function handleInputChange(e: Event & { currentTarget: HTMLInputElement }, index: number) {
		const v = parseFloat(e.currentTarget.value) || 0;
		if (index == 0 && v > value[1]) value = [value[1], value[1]];
		else if (index == 1 && v < value[0]) value = [value[0], value[0]];
		else value[index] = v;
	}
</script>

<div class="space-y-3">
	<Label>Dual range slider with input</Label>
	<div class="flex items-center gap-4">
		<Input
			class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			inputmode="decimal"
			{min}
			max={value[1]}
			value={value[0]}
			onchange={(e) => handleInputChange(e, 0)}
			aria-label="Enter minimum value"
		/>
		<Slider
			type="multiple"
			class="flex-grow"
			bind:value
			{min}
			{max}
			aria-label="Dual range slider with input"
		/>
		<Input
			class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			type="number"
			inputmode="decimal"
			min={value[0]}
			{max}
			value={value[1]}
			onchange={(e) => handleInputChange(e, 1)}
			aria-label="Enter maximum value"
		/>
	</div>
</div>
