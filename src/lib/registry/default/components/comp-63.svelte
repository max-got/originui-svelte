<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Textarea from '$lib/registry/default/ui/textarea.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2" style:--ring="234 89% 74%">
	<Label for={uid}>Textarea with colored border and ring</Label>
	<Textarea id={uid} placeholder="Leave a comment" />
</div>
