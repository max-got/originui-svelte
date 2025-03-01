<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with start add-on</Label>
	<div class="flex rounded-lg shadow-sm shadow-black/5">
		<span
			class="inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground"
		>
			https://
		</span>
		<Input
			id={uid}
			class="-ms-px rounded-s-none shadow-none"
			placeholder="google.com"
			type="text"
		/>
	</div>
</div>
