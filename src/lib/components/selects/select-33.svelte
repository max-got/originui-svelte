<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const items = [
		{ label: 'Javascript', value: 's1' },
		{ label: 'Bash', value: 's2' }
	];

	let value = $state('s1');

	const selected = $derived(items.find((i) => i.value === value));
</script>

<div class="space-y-2">
	<Label for="select-33">Select with left text</Label>
	<Select.Root type="single" bind:value>
		<Select.Trigger id="select-33">
			{#if selected}
				Language: {selected.label}
			{:else}
				Select a language
			{/if}
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
