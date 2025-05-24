<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Search from '@lucide/svelte/icons/search';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Search input with icon and button</Label>
	<div class="relative">
		<Input id={uid} class="peer pe-9 ps-9" placeholder="Search..." type="search" />
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<Search size={16} stroke-width={2} />
		</div>
		<button
			class="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
			aria-label="Submit search"
			type="submit"
		>
			<ArrowRight size={16} stroke-width={2} aria-hidden="true" />
		</button>
	</div>
</div>
