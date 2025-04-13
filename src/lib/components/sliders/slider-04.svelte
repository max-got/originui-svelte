<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';
</script>

<div class="space-y-4">
	<Label>Slider with solid thumb</Label>
	<Slider
		type="single"
		value={25}
		class="[&>[data-slider-range]]:opacity-70 [&>[data-slider-thumb]]:bg-primary"
		aria-label="Slider with solid thumb"
	/>
</div>
