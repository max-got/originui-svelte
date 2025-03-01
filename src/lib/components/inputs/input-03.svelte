<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with helper text</Label>
	<Input id={uid} placeholder="Email" type="email" />
	<p class="text-xs text-muted-foreground" role="region" aria-live="polite">
		We won't share your email with anyone
	</p>
</div>
