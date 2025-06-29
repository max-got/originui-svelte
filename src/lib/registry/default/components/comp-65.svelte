<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Textarea from '$lib/registry/default/ui/textarea.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Textarea with gray background</Label>
	<Textarea
		id={uid}
		class="bg-muted border-transparent shadow-none"
		placeholder="Leave a comment"
	/>
</div>
