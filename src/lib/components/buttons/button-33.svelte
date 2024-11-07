<script lang="ts">
	import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group/index.js';

	const options = [
		{
			label: 'Left',
			value: 'left'
		},
		{
			label: 'Center',
			value: 'center'
		},
		{
			label: 'Right',
			value: 'right'
		}
	] as const;

	let value = $state(options[0].value);
</script>

<ToggleGroup
	type="single"
	variant="outline"
	class="flex w-full gap-0 -space-x-px rounded-lg shadow-sm shadow-black/[0.04] rtl:space-x-reverse"
	bind:value
>
	{#each options as option (option.value)}
		<ToggleGroupItem
			class="flex-1 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
			value={option.value}
			aria-label={option.label}
		>
			{option.label}
		</ToggleGroupItem>
	{/each}
</ToggleGroup>
