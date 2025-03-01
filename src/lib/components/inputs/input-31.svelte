<script lang="ts">
	import Input from '$lib/components/ui/input.svelte';

	const uid = $props.id();
</script>

<div class="group relative">
	<label
		for={uid}
		class="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
	>
		Input with overlapping label
	</label>
	<Input id={uid} class="h-10" placeholder="Email" type="email" />
</div>
