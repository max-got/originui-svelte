<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import Textarea from '$lib/components/ui/textarea.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Textarea with helper text</Label>
	<Textarea id={uid} placeholder="Leave a comment" />
	<p class="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
		Please add as many details as you can
	</p>
</div>
