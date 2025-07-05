<script lang="ts">
	import Checkbox from '$lib/registry/default/ui/checkbox.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="flex items-center gap-2">
	<Checkbox id={uid} checked />
	<Label for={uid} class="peer-data-[state=checked]:line-through">Simple todo item</Label>
</div>
