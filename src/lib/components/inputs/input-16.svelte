<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with inline start and end add-on</Label>
	<div class="relative flex rounded-lg shadow-sm shadow-black/[.04]">
		<span
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground"
		>
			€
		</span>
		<Input id={uid} class="-me-px rounded-e-none ps-6 shadow-none" placeholder="0.00" type="text" />
		<span
			class="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground"
		>
			EUR
		</span>
	</div>
</div>
