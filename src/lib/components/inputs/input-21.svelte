<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with end button</Label>
	<div class="flex rounded-lg shadow-sm shadow-black/[.04]">
		<Input
			id={uid}
			class="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
			placeholder="Email"
			type="email"
		/>
		<button
			class="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm font-medium text-foreground ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
		>
			Send
		</button>
	</div>
</div>
