<script module lang="ts">
	// [!code collapse-start]
	const continents = [
		{
			countries: [
				{ flag: '🇺🇸', label: 'United States', value: 's1' },
				{ flag: '🇨🇦', label: 'Canada', value: 's2' },
				{ flag: '🇲🇽', label: 'Mexico', value: 's3' }
			],
			label: 'America'
		},
		{
			countries: [
				{ flag: '🇿🇦', label: 'South Africa', value: 's4' },
				{ flag: '🇳🇬', label: 'Nigeria', value: 's5' },
				{ flag: '🇲🇦', label: 'Morocco', value: 's6' }
			],
			label: 'Africa'
		},
		{
			countries: [
				{ flag: '🇨🇳', label: 'China', value: 's7' },
				{ flag: '🇯🇵', label: 'Japan', value: 's8' },
				{ flag: '🇮🇳', label: 'India', value: 's9' }
			],
			label: 'Asia'
		},
		{
			countries: [
				{ flag: '🇬🇧', label: 'United Kingdom', value: 's10' },
				{ flag: '🇫🇷', label: 'France', value: 's11' },
				{ flag: '🇩🇪', label: 'Germany', value: 's12' }
			],
			label: 'Europe'
		},
		{
			countries: [
				{ flag: '🇦🇺', label: 'Australia', value: 's13' },
				{ flag: '🇳🇿', label: 'New Zealand', value: 's14' }
			],
			label: 'Oceania'
		}
	];
	// [!code collapse-end]
</script>

<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const items = continents.reduce(
		(previous: (typeof continents)[number]['countries'], current) =>
			previous.concat(current.countries),
		[]
	);

	let value = $state('s2');

	const selected = $derived(items.find((i) => i.value === value));
</script>

{#snippet country(item: (typeof items)[number])}
	<span class="mr-1 text-lg leading-none">{item.flag}</span>
	<span class="truncate">{item.label}</span>
{/snippet}

<div class="space-y-2">
	<Label for="select-37">Options with flag</Label>
	<Select.Root type="single" bind:value>
		<Select.Trigger
			id="select-37"
			class="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80"
		>
			<span>
				{#if selected}
					{@render country(selected)}
				{:else}
					Select a country
				{/if}
			</span>
		</Select.Trigger>
		<Select.Content
			class="[&_*[data-select-item]>span>svg]:shrink-0 [&_*[data-select-item]>span>svg]:text-muted-foreground/80 [&_*[data-select-item]>span]:end-2 [&_*[data-select-item]>span]:start-auto [&_*[data-select-item]>span]:flex [&_*[data-select-item]>span]:items-center [&_*[data-select-item]>span]:gap-2 [&_*[data-select-item]]:pe-8 [&_*[data-select-item]]:ps-2"
		>
			{#each continents as continent}
				<Select.Group>
					<Select.GroupHeading class="ps-2">
						{continent.label}
					</Select.GroupHeading>
					{#each continent.countries as item (item.value)}
						<Select.Item value={item.value}>
							{@render country(item)}
						</Select.Item>
					{/each}
				</Select.Group>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
