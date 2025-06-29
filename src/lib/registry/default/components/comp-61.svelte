<script lang="ts">
	import Label from '$lib/registry/default/ui/label.svelte';
	import Textarea from '$lib/registry/default/ui/textarea.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Textarea with helper text</Label>
	<Textarea id={uid} placeholder="Leave a comment" />
	<p class="text-muted-foreground mt-2 text-xs" role="region" aria-live="polite">
		Please add as many details as you can
	</p>
</div>
