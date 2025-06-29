<script lang="ts">
	import Button from '$lib/registry/default/ui/button.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';
	import Textarea from '$lib/registry/default/ui/textarea.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Textarea with left button</Label>
	<Textarea id={uid} placeholder="Leave a comment" />
	<Button variant="outline">Send</Button>
</div>
