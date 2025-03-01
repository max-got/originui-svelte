<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Search input with &lt;kbd&gt;</Label>
	<div class="relative">
		<Input id={uid} class="pe-11" placeholder="Search..." type="search" />
		<div
			class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground"
		>
			<kbd
				class="inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70"
			>
				⌘K
			</kbd>
		</div>
	</div>
</div>
