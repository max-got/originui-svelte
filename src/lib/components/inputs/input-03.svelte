<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div class="space-y-2">
	<Label for="input-03">Input with helper text</Label>
	<Input id="input-03" placeholder="Email" type="email" />
	<p class="text-xs text-muted-foreground" role="region" aria-live="polite">
		We won't share your email with anyone
	</p>
</div>
