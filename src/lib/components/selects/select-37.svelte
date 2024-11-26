<script lang="ts">
	import Label from '$lib/components/ui/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const continents = [
		{
			label: 'America',
			countries: [
				{ value: 's1', label: 'United States', flag: '🇺🇸' },
				{ value: 's2', label: 'Canada', flag: '🇨🇦' },
				{ value: 's3', label: 'Mexico', flag: '🇲🇽' }
			]
		},
		{
			label: 'Africa',
			countries: [
				{ value: 's4', label: 'South Africa', flag: '🇿🇦' },
				{ value: 's5', label: 'Nigeria', flag: '🇳🇬' },
				{ value: 's6', label: 'Morocco', flag: '🇲🇦' }
			]
		},
		{
			label: 'Asia',
			countries: [
				{ value: 's7', label: 'China', flag: '🇨🇳' },
				{ value: 's8', label: 'Japan', flag: '🇯🇵' },
				{ value: 's9', label: 'India', flag: '🇮🇳' }
			]
		},
		{
			label: 'Europe',
			countries: [
				{ value: 's10', label: 'United Kingdom', flag: '🇬🇧' },
				{ value: 's11', label: 'France', flag: '🇫🇷' },
				{ value: 's12', label: 'Germany', flag: '🇩🇪' }
			]
		},
		{
			label: 'Oceania',
			countries: [
				{ value: 's13', label: 'Australia', flag: '🇦🇺' },
				{ value: 's14', label: 'New Zealand', flag: '🇳🇿' }
			]
		}
	];

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
