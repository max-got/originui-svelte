<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox.svelte';
	import Label from '$lib/components/ui/label.svelte';

	const uid = $props.id();
</script>

<div class="flex items-center gap-2">
	<Checkbox
		id={uid}
		class="rounded-full data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500"
		checked
	/>
	<Label
		for={uid}
		class="peer-data-[state=checked]:line-throgh relative after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:ease-in-out peer-data-[state=checked]:text-muted-foreground peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
	>
		Fancy todo item
	</Label>
</div>
