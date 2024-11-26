<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const items = [
		{ label: 'Svelte', value: 's1' },
		{ label: 'Next.js', value: 's2' },
		{ label: 'Astro', value: 's3' },
		{ label: 'Gatsby', value: 's4' }
	];

	let value = $state('s1');

	const selected = $derived(items.find((i) => i.value === value));
</script>

<div class="space-y-2">
	<Label for="select-24">Select with auto-width</Label>
	<Select.Root type="single" bind:value>
		<!-- Adjust the min-width to fit the longest option -->
		<Select.Trigger id="select-24" class="w-auto min-w-48 max-w-full">
			{selected?.label ?? 'Select a framework'}
		</Select.Trigger>
		<Select.Content>
			{#each items as item (item.value)}
				<Select.Item value={item.value}>
					{item.label}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
