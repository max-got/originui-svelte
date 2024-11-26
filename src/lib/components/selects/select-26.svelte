<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const frontend = [
		{ value: 's1', label: 'Svelte' },
		{ value: 's2', label: 'Vue' },
		{ value: 's3', label: 'Angular' }
	];

	const backend = [
		{ value: 's4', label: 'Node.js' },
		{ value: 's5', label: 'Python' },
		{ value: 's6', label: 'Java' }
	];

	const items = [...frontend, ...backend];

	let value = $state('s1');

	const selected = $derived(items.find((i) => i.value === value));
</script>

<div class="space-y-2">
	<Label for="select-26">Select with separator</Label>
	<Select.Root type="single" bind:value>
		<Select.Trigger id="select-26">
			{selected?.label ?? 'Select a framework'}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.GroupHeading>Frontend</Select.GroupHeading>
				{#each frontend as item (item.value)}
					<Select.Item value={item.value}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Group>
			<Select.Separator />
			<Select.Group>
				<Select.GroupHeading>Backend</Select.GroupHeading>
				{#each backend as item (item.value)}
					<Select.Item value={item.value}>
						{item.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
