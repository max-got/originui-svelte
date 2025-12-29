<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Switch from '$lib/registry/default/ui/switch.svelte';

	const uid = $props.id();
</script>

<div class="inline-flex items-center gap-2">
	<Switch id={uid} disabled />
	<Label for={uid} class="sr-only">Disabled</Label>
</div>
