<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Switch from '$lib/registry/default/ui/switch.svelte';

	const uid = $props.id();
</script>

<div class="inline-flex items-center gap-2">
	<Switch id={uid} />
	<Label for={uid} class="sr-only">Simple switch</Label>
</div>
