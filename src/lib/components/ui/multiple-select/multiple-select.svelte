<script module lang="ts">
	import { type ComponentProps, type Snippet, untrack } from 'svelte';
	export interface Option {
		/** Group the options by providing key. */
		[key: string]: boolean | string | undefined;
		disable?: boolean;
		/** fixed option that can't be removed. */
		fixed?: boolean;
		label: string;
		value: string;
	}
	export interface GroupOption {
		[key: string]: Option[];
	}
	export interface MultipleSelectorProps extends Omit<ComponentProps<typeof Command>, 'value'> {
		badgeClassName?: string;
		/** Allow user to create option when there is no option matched. */
		creatable?: boolean;
		defaultOptions?: Option[];
		/** Debounce time for async search. Only work with `onSearch`. */
		delay?: number;
		disabled?: boolean;
		/** Group the options base on provided key. */
		groupBy?: string;

		/** hide the clear all button. */
		hideClearAllButton?: boolean;
		/** Hide the placeholder when there are options selected. */
		hidePlaceholderWhenSelected?: boolean;
		/** Props of `CommandInput` */
		inputProps?: Omit<
			ComponentProps<typeof CommandPrimitive.Input>,
			'disabled' | 'placeholder' | 'value'
		>;
		inputRef?: HTMLInputElement | null;

		/** Limit the maximum number of selected options. */
		maxSelected?: number;
		onChange?: (options: Option[]) => void;
		/** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
		onMaxSelected?: (maxLimit: number) => void;
		/** async search */
		onSearch?: (value: string) => Promise<Option[]>;
		/**
		 * sync search. This search will not showing loadingIndicator.
		 * The rest props are the same as async search.
		 * i.e.: creatable, groupBy, delay.
		 **/
		onSearchSync?: (value: string) => Option[];
		/** manually controlled options */
		options?: Option[];
		placeholder?: string;
		selectFirstItem?: boolean;
		/**
		 * Only work with `onSearch` prop. Trigger search when `onFocus`.
		 * For example, when user click on the input, it will trigger the search to get initial options.
		 **/
		triggerSearchOnFocus?: boolean;
		value?: Option[];
	}
	export function transToGroupOption(options: Option[], groupBy?: string): GroupOption {
		if (options.length === 0) {
			return {};
		}
		if (!groupBy) {
			return {
				'': options
			};
		}

		const groupOption: GroupOption = {};
		options.forEach((option) => {
			const key = (option[groupBy] as string) || '';
			if (!groupOption[key]) {
				groupOption[key] = [];
			}
			groupOption[key].push(option);
		});
		return groupOption;
	}

	export function removePickedOption(groupOption: GroupOption, picked: Option[]) {
		const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;

		for (const [key, value] of Object.entries(cloneOption)) {
			cloneOption[key] = value.filter((val) => !picked.find((p) => p.value === val.value));
		}
		return cloneOption;
	}

	export function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
		for (const [, value] of Object.entries(groupOption)) {
			if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
				return true;
			}
		}
		return false;
	}
</script>

<script lang="ts">
	import MultipleSelectEmpty from './multiple-select-empty.svelte';
	import MultipleSelectInput from './multiple-select-input.svelte';
	import { cn } from '$lib/utils.js';

	import { Command, CommandGroup, CommandItem, CommandList } from '$lib/components/ui/command';
	import { Command as CommandPrimitive } from 'bits-ui';
	import X from 'lucide-svelte/icons/x';
	import { useDebounce } from 'runed';

	type InputEvent = FocusEvent & { currentTarget: EventTarget & HTMLInputElement };
	type Props = MultipleSelectorProps & {
		emptyIndicator?: Snippet;
		loadingIndicator?: Snippet;
	};

	let {
		badgeClassName,
		creatable = false,
		defaultOptions = [],
		delay = 300,
		disabled,
		emptyIndicator,
		groupBy,
		hideClearAllButton = false,
		hidePlaceholderWhenSelected,
		inputProps,
		inputRef = $bindable(null),
		loadingIndicator,
		maxSelected = Number.MAX_SAFE_INTEGER,
		onChange,
		onMaxSelected,
		onSearch,
		onSearchSync,
		options: arrayOptions,
		placeholder,
		ref = $bindable(null),
		selectFirstItem = true,
		triggerSearchOnFocus = false,
		value = [],
		...restProps
	}: Props = $props();

	// State management
	let selected = $state(value);
	let selectedBind = $state('');
	let inputValue = $state('');
	let debouncedSearchTerm = $state('');
	let open = $state(false);
	let scrollbar = $state(false);
	let isLoading = $state(false);
	let dropdownRef = $state<HTMLDivElement | null>(null);
	let options = $state<GroupOption>(transToGroupOption(defaultOptions, groupBy));

	let currentFilter = $derived.by(() => {
		if (restProps.filter) return restProps.filter;
		if (creatable)
			return (value: string, search: string) =>
				value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
		return undefined;
	});

	// Derived states
	const selectables = $derived(removePickedOption(options, selected));
	const selectablesEntries = $derived.by(() => Object.entries(selectables));
	const emptyItemSnippet = $derived.by(() => {
		if (!emptyIndicator) return undefined;

		// For async search that showing emptyIndicator
		if (onSearch && !creatable && Object.keys(options).length === 0) {
			return emptyIndicatorCommandItem;
		}

		return emptyIndicatorCommandEmpty;
	});

	const creatableItemSnippet = $derived.by(() => {
		if (!creatable) return undefined;
		if (
			isOptionsExist(options, [{ label: inputValue, value: inputValue }]) ||
			selected.find((s) => s.value === inputValue)
		) {
			return undefined;
		}

		// For normal creatable
		if (!onSearch && inputValue.length > 0) {
			return creatableItem;
		}

		// For async search creatable. avoid showing creatable item before loading
		if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
			return creatableItem;
		}

		return undefined;
	});

	// Update options when props or search changes
	function updateOptions() {
		if (arrayOptions && !onSearch) {
			const newOption = transToGroupOption(arrayOptions, groupBy);
			if (JSON.stringify(newOption) !== JSON.stringify(options)) {
				options = newOption;
			}
		} else {
			options = transToGroupOption(defaultOptions, groupBy);
		}
	}

	// Watch for changes that require updates
	$effect(() => {
		updateOptions();
	});

	// Use debounced search term
	const debouncedSearch = useDebounce(
		() => {
			debouncedSearchTerm = inputValue;
		},
		() => delay
	);

	async function handleSearch() {
		if (!open) return;

		const searchTerm = debouncedSearchTerm;

		if (onSearchSync) {
			const res = onSearchSync(searchTerm);
			options = transToGroupOption(res || [], groupBy);
			return;
		}

		if (onSearch) {
			isLoading = true;
			try {
				const res = await onSearch(searchTerm);
				options = transToGroupOption(res || [], groupBy);
			} finally {
				isLoading = false;
			}
		}
	}

	// Watch input changes and trigger debounced search
	$effect(() => {
		const _ = inputValue; // Track inputValue changes
		untrack(() => debouncedSearch());
	});

	// Watch for debounced value changes and trigger search
	$effect(() => {
		const _ = debouncedSearchTerm; // Track debouncedSearchValue changes
		if (!open) return;
		if (debouncedSearch.pending) return;

		handleSearch();
	});

	// Handle focus events
	function handleFocus(event: InputEvent) {
		open = true;
		if (triggerSearchOnFocus) {
			onSearch?.(debouncedSearchTerm);
		}
		inputProps?.onfocus?.(event);
	}

	function handleBlur(event: InputEvent) {
		if (!scrollbar) {
			open = false;
		}
		inputProps?.onblur?.(event);
	}

	function handleUnselect(option: Option) {
		if (option.fixed) return;
		selected = selected.filter((s) => s.value !== option.value);
		onChange?.(selected);
	}

	function handleSelect(option: Option) {
		if (option.disable) return;
		if (selected.length >= maxSelected) {
			onMaxSelected?.(selected.length);
			return;
		}

		inputValue = '';
		selected = [...selected, option];
		onChange?.(selected);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!inputRef) return;

		if (
			(e.key === 'Delete' || e.key === 'Backspace') &&
			inputRef.value === '' &&
			selected.length > 0
		) {
			const lastOption = selected[selected.length - 1];
			if (!lastOption.fixed) handleUnselect(lastOption);
		}

		if (e.key === 'Escape') inputRef.blur();
	}

	function handleClearAll() {
		selected = selected.filter((s) => s.fixed);
		onChange?.(selected);
	}

	// Update click outside handling
	function handleClickOutside(event: MouseEvent) {
		if (!dropdownRef?.contains(event.target as Node) && !inputRef?.contains(event.target as Node)) {
			open = false;
			inputRef?.blur();
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

{#snippet creatableItem()}
	<CommandItem
		value={inputValue}
		class="cursor-pointer"
		onmousedown={(e) => {
			e.preventDefault();
			e.stopPropagation();
		}}
		onSelect={() => {
			if (selected.length >= maxSelected) {
				onMaxSelected?.(selected.length);
				return;
			}
			inputValue = '';
			selected.push({ label: inputValue, value: inputValue });
			onChange?.(selected);
		}}
	>
		Create "{inputValue}"
	</CommandItem>
{/snippet}

{#snippet emptyIndicatorCommandItem(snippet: Snippet)}
	<CommandItem title="No results found" value="-" disabled>
		{@render snippet?.()}
	</CommandItem>
{/snippet}

{#snippet emptyIndicatorCommandEmpty(snippet: Snippet)}
	<MultipleSelectEmpty>
		{@render snippet?.()}
	</MultipleSelectEmpty>
{/snippet}

{#snippet Badge(option: Option)}
	<div
		class={cn(
			'animate-fadeIn relative inline-flex h-7 cursor-default items-center rounded-md border border-solid bg-background pe-7 pl-2 ps-2 text-xs font-medium text-secondary-foreground transition-all hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 data-[fixed]:pe-2',
			badgeClassName
		)}
		data-fixed={option.fixed}
		data-disabled={disabled}
	>
		{option.label}
		{#if !option.fixed}
			<button
				class="absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-lg border border-transparent p-0 text-muted-foreground/80 outline-0 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
				onkeydown={(e) => e.key === 'Enter' && handleUnselect(option)}
				onmousedown={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				onclick={() => handleUnselect(option)}
				aria-label="Remove"
			>
				<X size={14} strokeWidth={2} aria-hidden="true" />
			</button>
		{/if}
	</div>
{/snippet}

<Command
	bind:ref={dropdownRef}
	bind:value={selectedBind}
	{...restProps}
	onkeydown={(e) => {
		handleKeyDown(e);
		restProps?.onkeydown?.(e);
	}}
	class={cn('h-auto overflow-visible bg-transparent', restProps.class)}
	shouldFilter={restProps?.shouldFilter ?? !onSearch}
	filter={currentFilter}
>
	<!-- eslint-disable-next-line svelte/valid-compile -->
	<div
		class={cn(
			'relative min-h-[38px] rounded-lg border border-input text-sm transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
			{
				'cursor-text': !disabled && selected.length !== 0,
				'px-3 py-2': selected.length !== 0
			},
			!hideClearAllButton && 'pe-9'
		)}
		onclick={() => !disabled && inputRef?.focus()}
	>
		<div class="flex flex-wrap gap-1">
			{#each selected as option}
				{@render Badge(option)}
			{/each}

			<MultipleSelectInput
				bind:value={inputValue}
				{disabled}
				bind:ref={inputRef}
				onblur={handleBlur}
				onfocus={handleFocus}
				placeholder={hidePlaceholderWhenSelected && selected.length ? '' : placeholder}
				class={cn(
					'flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
					{
						'ml-1': selected.length !== 0,
						'px-3 py-2': selected.length === 0,
						'w-full': hidePlaceholderWhenSelected
					},
					inputProps?.class
				)}
			/>

			{#if !hideClearAllButton && !disabled && selected.length > 0 && selected.some((s) => !s.fixed)}
				<button
					type="button"
					onclick={handleClearAll}
					class="absolute end-0 top-0 flex size-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
					aria-label="Clear all"
				>
					<X size={16} strokeWidth={2} aria-hidden="true" />
				</button>
			{/if}
		</div>
	</div>

	{#if open}
		<div class="relative">
			<div
				class={cn(
					'absolute top-2 z-10 w-full overflow-hidden rounded-lg border border-input',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
					!open && 'hidden'
				)}
				data-state="open"
			>
				<CommandList
					class="bg-popover text-popover-foreground shadow-lg shadow-black/5 outline-none"
					onmouseleave={() => (scrollbar = false)}
					onmouseenter={() => (scrollbar = true)}
					onmouseup={() => inputRef?.focus()}
				>
					{#if isLoading}
						{@render loadingIndicator?.()}
					{:else}
						{@render emptyItemSnippet?.(emptyIndicator!)}
						{@render creatableItemSnippet?.()}

						{#if !selectFirstItem}
							<CommandItem value="-" class="hidden" />
						{/if}

						{#each selectablesEntries as [key, dropdowns]}
							<CommandGroup class="h-full overflow-auto" heading={key}>
								{#each dropdowns as option (option.value)}
									<CommandItem
										value={option.value}
										disabled={option.disable}
										onmousedown={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onSelect={() => handleSelect(option)}
										class={cn(' cursor-pointer', option.disable && 'cursor-not-allowed opacity-50')}
									>
										{option.label}
									</CommandItem>
								{/each}
							</CommandGroup>
						{/each}
					{/if}
				</CommandList>
			</div>
		</div>
	{/if}
</Command>
