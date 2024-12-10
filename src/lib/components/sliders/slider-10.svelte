<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';
</script>

<div class="space-y-4">
	<Label>Slider with labels and tooltip</Label>
	<div>
		<span
			class="mb-3 flex w-full items-center justify-between gap-2 text-xs font-medium text-muted-foreground"
			aria-hidden="true"
		>
			<span>Low</span>
			<span>High</span>
		</span>
		<Slider value={[50]} step={10} showTooltip aria-label="Slider with labels and tooltip" />
	</div>
</div>
