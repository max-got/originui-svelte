<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div class="space-y-2">
	<Label for="input-07">Input with gray background</Label>
	<Input
		id="input-07"
		class="border-transparent bg-muted shadow-none"
		placeholder="Email"
		type="email"
	/>
</div>
