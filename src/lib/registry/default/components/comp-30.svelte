<script lang="ts">
	import Input from '$lib/registry/default/ui/input.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>File input</Label>
	<Input id={uid} class="p-0 pe-3 file:me-3 file:border-0 file:border-e" type="file" />
</div>
