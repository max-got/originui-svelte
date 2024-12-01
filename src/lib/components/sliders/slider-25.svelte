<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';

	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';

	const defaultValue = 0;
	const min = -10;
	const max = 10;

	let value = $state({
		x: [-2],
		y: [4],
		z: [2]
	});

	function reset() {
		value.x[0] = defaultValue;
		value.y[0] = defaultValue;
		value.z[0] = defaultValue;
	}

	function handleInputChange(
		e: Event & { currentTarget: HTMLInputElement },
		key: keyof typeof value
	) {
		value[key][0] = parseFloat(e.currentTarget.value) || 0;
	}
</script>

<div class="space-y-4">
	<legend class="text-sm font-medium text-foreground">Object position</legend>
	<div class="space-y-2">
		<div class="flex items-center gap-4">
			<Label class="text-xs text-muted-foreground">X</Label>
			<Slider
				class="flex-grow [&>[data-slider-thumb]]:rounded"
				bind:value={value.x}
				min={-10}
				max={10}
				aria-label="X"
			/>
			<Input
				class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				type="number"
				inputmode="decimal"
				onchange={(e) => handleInputChange(e, 'x')}
				{min}
				{max}
				value={value.x[0]}
				aria-label="Enter value"
			/>
		</div>
		<div class="flex items-center gap-4">
			<Label class="text-xs text-muted-foreground">Y</Label>
			<Slider
				class="flex-grow [&>[data-slider-thumb]]:rounded"
				bind:value={value.y}
				min={-10}
				max={10}
				aria-label="Y"
			/>
			<Input
				class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				type="number"
				inputmode="decimal"
				onchange={(e) => handleInputChange(e, 'y')}
				{min}
				{max}
				value={value.y[0]}
				aria-label="Enter value"
			/>
		</div>
		<div class="flex items-center gap-4">
			<Label class="text-xs text-muted-foreground">Z</Label>
			<Slider
				class="flex-grow [&>[data-slider-thumb]]:rounded"
				bind:value={value.z}
				min={-10}
				max={10}
				aria-label="Z"
			/>
			<Input
				class="h-8 w-12 px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				type="number"
				inputmode="decimal"
				onchange={(e) => handleInputChange(e, 'z')}
				{min}
				{max}
				value={value.z[0]}
				aria-label="Enter value"
			/>
		</div>
	</div>
	<Button class="w-full" variant="outline" onclick={reset}>
		<RotateCcw class="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
		Reset
	</Button>
</div>
