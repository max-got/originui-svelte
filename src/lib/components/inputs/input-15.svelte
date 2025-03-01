<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with end add-on</Label>
	<div class="flex rounded-lg shadow-sm shadow-black/[.04]">
		<Input
			id={uid}
			class="z-10 -me-px rounded-e-none shadow-none"
			placeholder="google"
			type="text"
		/>
		<span
			class="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground"
		>
			.com
		</span>
	</div>
</div>
