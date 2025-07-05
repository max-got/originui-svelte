<script lang="ts">
	import Checkbox from '$lib/registry/default/ui/checkbox.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const id = $props.id();
</script>

<div class="grid gap-3">
	<div class="flex items-center gap-2">
		<Checkbox id="{id}-1" />
		<Label for="{id}-1">Svelte</Label>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="{id}-2" />
		<Label for="{id}-2">SvelteKit</Label>
	</div>
	<div class="flex items-center gap-2">
		<Checkbox id="{id}-3" />
		<Label for="{id}-3">Astro</Label>
	</div>
</div>
