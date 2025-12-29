<script lang="ts">
	import Slider from '$lib/components/ui/slider.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
</script>

<div class="*:not-first:mt-4">
	<Label>Simple slider</Label>
	<Slider type="single" value={25} aria-label="Simple slider" />
</div>
