<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import XIcon from '@lucide/svelte/icons/x';
	import { useId } from 'bits-ui';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	const languages = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'German', value: 'de' },
		{ label: 'Spanish', value: 'es' },
		{ label: 'Portuguese', value: 'pt' },
		{ label: 'Russian', value: 'ru' },
		{ label: 'Japanese', value: 'ja' },
		{ label: 'Korean', value: 'ko' },
		{ label: 'Chinese', value: 'zh' }
	];

	let selectedLanguages = $state<string[]>([]);
	let open = $state(false);

	const maxVisibleTags = 2;
	const maxWidth = 'w-[280px]'; 

	const selectedLanguageObjects = $derived(
		selectedLanguages.map((value) => languages.find((lang) => lang.value === value)).filter(Boolean)
	);

	const visibleLanguages = $derived(selectedLanguageObjects.slice(0, maxVisibleTags));
	const hiddenCount = $derived(Math.max(0, selectedLanguages.length - maxVisibleTags));

	function toggleLanguage(languageValue: string) {
		const isSelected = selectedLanguages.includes(languageValue);
		if (isSelected) {
			selectedLanguages = selectedLanguages.filter((lang) => lang !== languageValue);
		} else {
			selectedLanguages = [...selectedLanguages, languageValue];
		}
	}

	function removeLanguage(languageValue: string) {
		selectedLanguages = selectedLanguages.filter((lang) => lang !== languageValue);
	}

	function clearAll() {
		selectedLanguages = [];
	}

	const triggerId = useId();
</script>

<Popover.Root bind:open>
	<div id={triggerId} class={maxWidth}>
		<label
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
		</label>
		<Popover.Trigger
			class={cn(
				buttonVariants({ variant: 'outline' }),
				'mt-2 h-auto min-h-10 w-full justify-between py-2',
				!selectedLanguages.length && 'text-muted-foreground'
			)}
			role="combobox"
		>
			<div class="flex max-w-full flex-wrap gap-1 overflow-hidden">
				{#if selectedLanguages.length}
					<!-- Show visible tags -->
					{#each visibleLanguages as language}
						<span
							class="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
						>
							{language?.label}
							<button
								type="button"
								class="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20"
								onclick={(e) => {
									e.stopPropagation();
									removeLanguage(language?.value || '');
								}}
							>
								<XIcon class="h-3 w-3" />
							</button>
						</span>
					{/each}

					{#if hiddenCount > 0}
						<span
							class="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
						>
							+{hiddenCount} more
						</span>
					{/if}
				{:else}
					<span>Select languages</span>
				{/if}
			</div>
			<ChevronsUpDownIcon class="h-4 w-4 flex-shrink-0 opacity-50" />
		</Popover.Trigger>

		{#each selectedLanguages as value}
			<input type="hidden" name="language" {value} />
		{/each}
	</div>
	<Popover.Content class="w-[280px] p-0">
		<Command.Root>
			<Command.Input autofocus placeholder="Search language..." class="h-9" />
			<Command.Empty>No language found.</Command.Empty>
			<Command.Group>
				<Command.Item value="clear-all" onSelect={clearAll} class="text-red-600 hover:text-red-700">
					Clear all selections
				</Command.Item>
				<Command.Separator />
				{#each languages as language (language.value)}
					<Command.Item value={language.label} onSelect={() => toggleLanguage(language.value)}>
						<CheckIcon
							class={cn(
								'mr-2 h-4 w-4',
								!selectedLanguages.includes(language.value) && 'text-transparent'
							)}
						/>
						{language.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
