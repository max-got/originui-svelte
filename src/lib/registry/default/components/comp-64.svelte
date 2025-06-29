<script lang="ts">
	import Textarea from '$lib/components/ui/textarea.svelte';
	import Label from '$lib/registry/default/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2">
	<Label for={uid}>Textarea with error</Label>
	<Textarea
		id={uid}
		class="border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
		placeholder="Leave a comment"
		value="Hello!"
	/>
	<p class="text-destructive mt-2 text-xs" role="alert" aria-live="polite">
		Message should be at least 10 characters
	</p>
</div>
