<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';
</script>

<div class="space-y-4">
	<legend class="text-sm font-medium text-foreground">Equalizer</legend>
	<div class="flex h-48 justify-center gap-8">
		<div class="flex flex-col items-center gap-2">
			<Slider
				value={[2]}
				min={-5}
				max={5}
				orientation="vertical"
				class="[&>[data-slider-thumb]]:h-6 [&>[data-slider-thumb]]:w-4 [&>[data-slider-thumb]]:rounded"
				aria-label="60 Hz"
				showTooltip
			/>
			<Label class="flex w-0 justify-center text-xs text-muted-foreground">60</Label>
		</div>
		<div class="flex flex-col items-center gap-2">
			<Slider
				value={[1]}
				min={-5}
				max={5}
				orientation="vertical"
				class="[&>[data-slider-thumb]]:h-6 [&>[data-slider-thumb]]:w-4 [&>[data-slider-thumb]]:rounded"
				aria-label="250 Hz"
				showTooltip
			/>
			<Label class="flex w-0 justify-center text-xs text-muted-foreground">250</Label>
		</div>
		<div class="flex flex-col items-center gap-2">
			<Slider
				value={[-1]}
				min={-5}
				max={5}
				orientation="vertical"
				class="[&>[data-slider-thumb]]:h-6 [&>[data-slider-thumb]]:w-4 [&>[data-slider-thumb]]:rounded"
				aria-label="1k"
				showTooltip
			/>
			<Label class="flex w-0 justify-center text-xs text-muted-foreground">1k</Label>
		</div>
		<div class="flex flex-col items-center gap-2">
			<Slider
				value={[-3]}
				min={-5}
				max={5}
				orientation="vertical"
				class="[&>[data-slider-thumb]]:h-6 [&>[data-slider-thumb]]:w-4 [&>[data-slider-thumb]]:rounded"
				aria-label="4k"
				showTooltip
			/>
			<Label class="flex w-0 justify-center text-xs text-muted-foreground">4k</Label>
		</div>
		<div class="flex flex-col items-center gap-2">
			<Slider
				value={[2]}
				min={-5}
				max={5}
				orientation="vertical"
				class="[&>[data-slider-thumb]]:h-6 [&>[data-slider-thumb]]:w-4 [&>[data-slider-thumb]]:rounded"
				aria-label="16k"
				showTooltip
			/>
			<Label class="flex w-0 justify-center text-xs text-muted-foreground">16K</Label>
		</div>
	</div>
</div>
