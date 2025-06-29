<script lang="ts">
	import Button from '$lib/registry/default/ui/button.svelte';

	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuTrigger
	} from '$lib/registry/default/ui/dropdown-menu';

	const options = [
		{
			description:
				'All commits from this branch will be added to the base branch via a commit version.',
			label: 'Merge pull request'
		},
		{
			description:
				'The 6 commits from this branch will be combined into one commit in the base branch.',
			label: 'Squash and merge'
		},
		{
			description: 'The 6 commits from this branch will be rebased and added to the base branch.',
			label: 'Rebase and merge'
		}
	];

	let selectedIndex = $state(0);
</script>

<div
	class="divide-primary-foreground/30 inline-flex divide-x rounded-md shadow-xs rtl:space-x-reverse"
>
	<Button class="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10">
		{options[Number(selectedIndex)].label}
	</Button>
	<DropdownMenu>
		<DropdownMenuTrigger>
			{#snippet child({ props })}
				<Button
					class="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
					size="icon"
					aria-label="Options"
					{...props}
				>
					<ChevronDownIcon size={16} aria-hidden="true" />
				</Button>
			{/snippet}
		</DropdownMenuTrigger>
		<DropdownMenuContent class="max-w-64 md:max-w-xs" side="bottom" sideOffset={4} align="end">
			<DropdownMenuRadioGroup
				value={selectedIndex.toString()}
				onValueChange={(value) => (selectedIndex = Number(value))}
			>
				{#each options as option, index (option.label)}
					<DropdownMenuRadioItem value={String(index)} class="items-start [&>span]:pt-1.5">
						<div class="flex flex-col gap-1">
							<span class="text-sm font-medium">{option.label}</span>
							<span class="text-muted-foreground text-xs">
								{option.description}
							</span>
						</div>
					</DropdownMenuRadioItem>
				{/each}
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</div>
