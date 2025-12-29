<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<div class="*:not-first:mt-4">
	<Label>Slider with square thumb</Label>
	<Slider
		type="single"
		value={25}
		max={100}
		step={5}
		class="*:data-slider-thumb:rounded"
		aria-label="Slider with square thumb"
	/>
</div>
