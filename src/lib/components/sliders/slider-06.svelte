<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Slider from '$lib/components/ui/slider.svelte';
</script>

<div class="space-y-4">
	<Label>Slider with reference labels</Label>
	<div>
		<Slider value={[15]} min={5} max={35} aria-label="Slider with reference labels" />
		<span
			class="mt-4 flex w-full items-center justify-between gap-1 text-xs font-medium text-muted-foreground"
			aria-hidden="true"
		>
			<span>5 GB</span>
			<span>20 GB</span>
			<span>35 GB</span>
		</span>
	</div>
</div>
