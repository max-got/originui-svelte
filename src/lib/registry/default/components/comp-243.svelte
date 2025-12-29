<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<div class="*:not-first:mt-4">
	<Label>Slider with solid thumb</Label>
	<Slider
		type="single"
		value={25}
		class="*:data-slider-thumb:bg-primary *:data-slider-range:opacity-70"
		aria-label="Slider with solid thumb"
	/>
</div>
