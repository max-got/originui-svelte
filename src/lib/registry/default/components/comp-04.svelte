<script lang="ts">
	import Input from '$lib/registry/default/ui/input.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="[*:not(:first-child)]:mt-2">
	<div class="mb-2 flex justify-between gap-1">
		<Label for={uid} class="leading-6">Input with hint</Label>
		<span class="text-muted-foreground text-sm">Optional</span>
	</div>
	<Input id={uid} placeholder="Email" type="email" />
</div>
