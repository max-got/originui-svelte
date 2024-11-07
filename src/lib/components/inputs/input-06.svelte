<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div class="space-y-2">
	<Label for="input-06">Input with error</Label>
	<Input
		id="input-06"
		class="border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
		placeholder="Email"
		type="email"
		value="invalid@email.com"
	/>
	<p class="text-xs text-destructive" role="alert" aria-live="polite">Email is invalid</p>
</div>
