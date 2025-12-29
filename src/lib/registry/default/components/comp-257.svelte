<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const emojis = ['😡', '🙁', '😐', '🙂', '😍'];
	const labels = ['Awful', 'Poor', 'Okay', 'Good', 'Amazing'];

	let value = $state(3);
</script>

<div class="*:not-first:mt-3">
	<Label>Rate your experience</Label>
	<div class="flex items-center gap-3">
		<Slider
			type="single"
			bind:value
			min={1}
			max={5}
			showTooltip
			tooltipContent={(value) => labels[value - 1]}
			aria-label="Rate your experience"
		/>
		<span class="text-2xl">{emojis[value - 1]}</span>
	</div>
</div>
