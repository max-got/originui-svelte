<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';
</script>

<div>
	<div class="mb-2 flex justify-between gap-1">
		<Label for="input-04" class="mb-0">Input with hint</Label>
		<span class="text-sm text-muted-foreground">Optional</span>
	</div>
	<Input id="input-04" placeholder="Email" type="email" />
</div>
