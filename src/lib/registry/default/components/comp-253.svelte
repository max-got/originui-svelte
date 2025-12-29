<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<div class="*:not-first:mt-4">
	<Label>Slider with multiple thumbs</Label>
	<Slider
		type="multiple"
		value={[25, 50, 100]}
		aria-label="Slider with multiple thumbs"
		showTooltip
		tooltipContent={(value) => `${value}%`}
	/>
</div>
