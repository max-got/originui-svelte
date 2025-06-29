<script lang="ts">
	import Input from '$lib/registry/default/ui/input.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Simple input</Label>
	<Input id={uid} placeholder="Email" type="email" />
</div>
