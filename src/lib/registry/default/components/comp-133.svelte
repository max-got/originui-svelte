<script lang="ts">
	import Checkbox from '$lib/registry/default/ui/checkbox.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	let checked = $state(false);

	const uid = $props.id();
</script>

<div class="flex items-center gap-2">
	<Checkbox id={uid} bind:checked indeterminate />
	<Label for={uid}>Indeterminate checkbox</Label>
</div>
