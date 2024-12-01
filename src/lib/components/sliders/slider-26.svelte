<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/input.svelte';
	import Slider from '$lib/components/ui/slider.svelte';

	const items = Array.from({ length: 100 }, (_, i) => ({
		id: i + 1,
		price: 80 + i * (i % 15 == 0 ? 9 : 10)
	}));

	let value = $state([200, 780]);
	const itemsInRange = $derived(
		items.filter((item) => item.price >= value[0] && item.price <= value[1]).length
	);

	const tickCount = 40;

	const min = Math.min(...items.map((item) => item.price));
	const max = Math.max(...items.map((item) => item.price));
	const priceStep = (max - min) / tickCount;

	const itemCounts = Array.from({ length: tickCount }, (_, tick) => {
		const rangeMin = min + tick * priceStep;
		const rangeMax = min + (tick + 1) * priceStep;
		return items.filter((item) => item.price >= rangeMin && item.price < rangeMax).length;
	});
	const maxCount = Math.max(...itemCounts);

	function isBarInSelectedRange(index: number) {
		const rangeMin = min + index * priceStep;
		const rangeMax = min + (index + 1) * priceStep;
		return itemsInRange > 0 && rangeMin <= value[1] && rangeMax >= value[0];
	}

	function handleInputChange(e: Event & { currentTarget: HTMLInputElement }, index: number) {
		const v = parseFloat(e.currentTarget.value) || 0;
		if (index == 0 && v > value[1]) value = [value[1], value[1]];
		else if (index == 1 && v < value[0]) value = [value[0], value[0]];
		else value[index] = v;
	}
</script>

<div class="space-y-4">
	<Label>Price slider</Label>
	<div>
		<div class="flex h-12 w-full items-end px-3" aria-hidden="true">
			{#each itemCounts as count, i (i)}
				<div class="flex flex-1 justify-center" style="height: {(count / maxCount) * 100}%">
					<span data-selected={isBarInSelectedRange(i)} class="h-full w-full bg-primary/20"></span>
				</div>
			{/each}
		</div>
		<Slider bind:value {min} {max} aria-label="Price range" />
	</div>
	<div class="flex items-center justify-between gap-4">
		<div class="space-y-1">
			<Label for="min-price">Min price</Label>
			<div class="relative">
				<Input
					class="peer w-full ps-6 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					type="number"
					inputmode="decimal"
					onchange={(e) => handleInputChange(e, 0)}
					{min}
					max={value[1]}
					value={value[0]}
					aria-label="Enter minimum price"
				/>
				<span
					class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
				>
					$
				</span>
			</div>
		</div>
		<div class="space-y-1">
			<Label for="max-price">Max price</Label>
			<div class="relative">
				<Input
					class="peer w-full ps-6 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
					type="number"
					inputmode="decimal"
					onchange={(e) => handleInputChange(e, 1)}
					min={value[0]}
					{max}
					value={value[1]}
					aria-label="Enter maximum price"
				/>
				<span
					class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50"
				>
					$
				</span>
			</div>
		</div>
	</div>
	<Button class="w-full" variant="outline">
		Show {itemsInRange} items
	</Button>
</div>
