<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const items = [
		{ disabled: true, label: 'Svelte', value: 's1' },
		{ label: 'Next.js', value: 's2' },
		{ disabled: true, label: 'Astro', value: 's3' },
		{ label: 'Gatsby', value: 's4' }
	];

	let value = $state('s2');

	const selected = $derived(items.find((i) => i.value === value));
</script>

<div class="space-y-2">
	<Label for="select-27">Select with disabled options</Label>
	<Select.Root type="single" bind:value>
		<Select.Trigger id="select-27">
			{selected?.label ?? 'Select a framework'}
		</Select.Trigger>
		<Select.Content>
			{#each items as item (item.value)}
				<Select.Item value={item.value} disabled={item.disabled}>
					{item.label}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
