<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<div class="*:not-first:mt-4">
	<Label>Dual range slider</Label>
	<Slider type="multiple" value={[25, 75]} step={5} aria-label="Dual range slider" />
</div>
