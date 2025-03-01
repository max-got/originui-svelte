<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import AtSign from 'lucide-svelte/icons/at-sign';

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Input with start icon</Label>
	<div class="relative">
		<Input id={uid} class="peer ps-9" placeholder="Email" type="email" />
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<AtSign size={16} stroke-width={2} aria-hidden="true" />
		</div>
	</div>
</div>
