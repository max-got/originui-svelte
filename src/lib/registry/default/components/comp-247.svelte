<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	let value = $state(25);
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between gap-2">
		<Label class="leading-6">Slider with output</Label>
		<output class="text-sm font-medium tabular-nums">{value}</output>
	</div>
	<Slider type="single" bind:value aria-label="Slider with output" />
</div>
