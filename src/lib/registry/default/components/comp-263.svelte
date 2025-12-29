<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<div class="*:not-first:mt-4">
	<Label>Vertical dual range slider and tooltip</Label>
	<div class="flex h-40 justify-center">
		<Slider
			type="multiple"
			value={[2, 7]}
			max={10}
			orientation="vertical"
			aria-label="Vertical slider"
			showTooltip
		/>
	</div>
</div>
