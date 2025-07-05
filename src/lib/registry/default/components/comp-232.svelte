<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Label from '$lib/components/ui/label.svelte';

	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';

	let open = $state(false);
	let value = $state('');

	const countries = [
		{
			continent: 'Europe',
			items: [
				{ flag: '🇩🇪', value: 'Germany' },
				{ flag: '🇬🇧', value: 'United Kingdom' },
				{ flag: '🇫🇷', value: 'France' }
			]
		},
		{
			continent: 'America',
			items: [
				{ flag: '🇺🇸', value: 'United States' },
				{ flag: '🇨🇦', value: 'Canada' },
				{ flag: '🇲🇽', value: 'Mexico' }
			]
		},
		{
			continent: 'Africa',
			items: [
				{ flag: '🇿🇦', value: 'South Africa' },
				{ flag: '🇳🇬', value: 'Nigeria' },
				{ flag: '🇲🇦', value: 'Morocco' }
			]
		},
		{
			continent: 'Asia',
			items: [
				{ flag: '🇨🇳', value: 'China' },
				{ flag: '🇯🇵', value: 'Japan' },
				{ flag: '🇮🇳', value: 'India' }
			]
		},

		{
			continent: 'Oceania',
			items: [
				{ flag: '🇦🇺', value: 'Australia' },
				{ flag: '🇳🇿', value: 'New Zealand' }
			]
		}
	] as const;

	const selectedCountry = $derived.by(() => {
		const items = countries.flatMap<(typeof countries)[number]['items'][number]>(
			(group) => group.items
		);

		return items.find((item) => item.value === value);
	});

	function handleSelect(currentValue: string) {
		value = currentValue;
		open = false;
	}
</script>

<div class="space-y-2">
	<Label>Options with flag and search</Label>
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="bg-background hover:bg-background focus-visible:border-ring focus-visible:outline-ring/20 w-full justify-between px-3 font-normal outline-offset-0 focus-visible:outline-[3px]"
					{...props}
				>
					{#if value && selectedCountry}
						<span class="flex min-w-0 items-center gap-2">
							<span class="text-lg leading-none">{selectedCountry.flag}</span>
							<span class="truncate">{value}</span>
						</span>
					{:else}
						<span class="text-muted-foreground">Select country</span>
					{/if}
					<ChevronDown size={16} class="text-muted-foreground/80 shrink-0" aria-hidden="true" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-full min-w-(--bits-popover-anchor-width) p-0" align="start">
			<Command.Root>
				<Command.Input placeholder="Search country..." />
				<Command.List>
					<Command.Empty>No country found.</Command.Empty>
					{#each countries as group (group.continent)}
						<Command.Group heading={group.continent}>
							{#each group.items as country (country.value)}
								<Command.Item value={country.value} onSelect={() => handleSelect(country.value)}>
									<span class="text-lg leading-none">{country.flag}</span>
									{country.value}
									<Check
										class={cn('ml-auto', value === country.value ? 'opacity-100' : 'opacity-0')}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					{/each}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
