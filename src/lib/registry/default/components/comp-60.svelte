<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Textarea from '$lib/registry/default/ui/textarea.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>
		Required textarea <span class="text-destructive">*</span>
	</Label>
	<Textarea id={uid} placeholder="Leave a message" required />
</div>
