<script lang="ts">
	import type { ChangeEventHandler, FocusEventHandler } from 'svelte/elements';

	import Input from '$lib/components/ui/input.svelte';

	import {
		expandAllFeature,
		hotkeysCoreFeature,
		searchFeature,
		selectionFeature,
		syncDataLoaderFeature,
		type TreeState
	} from '@headless-tree/core';
	import CircleXIcon from '@lucide/svelte/icons/circle-x';
	import FilterIcon from '@lucide/svelte/icons/filter';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import { Tree, TreeItem, TreeLabel, useTree } from '$lib/components/ui/tree';

	interface Item {
		children?: string[];
		name: string;
	}

	const items: Record<string, Item> = {
		apis: { name: 'APIs' },
		backend: { children: ['apis', 'infrastructure'], name: 'Backend' },
		company: {
			children: ['engineering', 'marketing', 'operations'],
			name: 'Company'
		},
		components: { name: 'Components' },
		content: { name: 'Content' },
		'design-system': {
			children: ['components', 'tokens', 'guidelines'],
			name: 'Design System'
		},
		engineering: {
			children: ['frontend', 'backend', 'platform-team'],
			name: 'Engineering'
		},
		finance: { name: 'Finance' },
		frontend: { children: ['design-system', 'web-platform'], name: 'Frontend' },
		guidelines: { name: 'Guidelines' },
		hr: { name: 'HR' },
		infrastructure: { name: 'Infrastructure' },
		marketing: { children: ['content', 'seo'], name: 'Marketing' },
		operations: { children: ['hr', 'finance'], name: 'Operations' },
		'platform-team': { name: 'Platform Team' },
		seo: { name: 'SEO' },
		tokens: { name: 'Tokens' },
		'web-platform': { name: 'Web Platform' }
	};

	// Store the initial expanded items to reset when search is cleared
	const initialExpandedItems = ['engineering', 'frontend', 'design-system'];
	const indent = 20;

	let treeState = $state.raw<Partial<TreeState<Item>>>({});
	let searchValue = $state('');
	let filteredItems = $state<string[]>([]);
	let inputElement = $state<HTMLInputElement | null>(null);

	const tree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) => items[itemId].children ?? [],
			getItem: (itemId) => items[itemId]
		},
		features: [
			syncDataLoaderFeature,
			hotkeysCoreFeature,
			selectionFeature,
			searchFeature,
			expandAllFeature
		],
		getItemName: (item) => item.getItemData().name,
		indent,
		initialState: {
			expandedItems: initialExpandedItems
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: 'company',
		setState: (state) => {
			treeState = {
				...treeState,
				...state
			};
		},
		state: treeState
	});

	// This function determines if an item should be visible based on our custom filtering
	function shouldShowItem(itemId: string): boolean {
		if (!searchValue || searchValue.length === 0) return true;
		return filteredItems.includes(itemId);
	}

	// Update filtered items based on search value
	function updateFilteredItems(value: string) {
		if (!value || value.length === 0) {
			filteredItems = [];
			return;
		}

		// Get all items
		const allItems = tree.current.getItems();

		// First, find direct matches
		const directMatches = allItems
			.filter((item) => {
				const name = item.getItemName().toLowerCase();
				return name.includes(value.toLowerCase());
			})
			.map((item) => item.getId());

		// Then, find all parent IDs of matching items
		const parentIds = new Set<string>();
		directMatches.forEach((matchId) => {
			let item = allItems.find((i) => i.getId() === matchId);
			while (item?.getParent && item.getParent()) {
				const parent = item.getParent();
				if (parent) {
					parentIds.add(parent.getId());
					item = parent;
				} else {
					break;
				}
			}
		});

		// Find all children of matching items
		const childrenIds = new Set<string>();
		directMatches.forEach((matchId) => {
			const item = allItems.find((i) => i.getId() === matchId);
			if (item && item.isFolder()) {
				// Get all descendants recursively
				const getDescendants = (itemId: string) => {
					const children = items[itemId]?.children || [];
					children.forEach((childId) => {
						childrenIds.add(childId);
						if (items[childId]?.children?.length) {
							getDescendants(childId);
						}
					});
				};

				getDescendants(item.getId());
			}
		});

		// Combine direct matches, parents, and children
		filteredItems = [...directMatches, ...Array.from(parentIds), ...Array.from(childrenIds)];

		// Keep all folders expanded during search to ensure all matches are visible
		// Store current expanded state first
		const currentExpandedItems = tree.current.getState().expandedItems || [];

		// Get all folder IDs that need to be expanded to show matches
		const folderIdsToExpand = allItems
			.filter((item) => item.isFolder())
			.map((item) => item.getId());

		// Update expanded items in the tree state
		treeState = {
			...treeState,
			expandedItems: [...new Set([...currentExpandedItems, ...folderIdsToExpand])]
		};
	}

	// Handle clearing the search
	function handleClearSearch() {
		searchValue = '';

		// Manually trigger the tree's search onChange with an empty value
		// to ensure item.isMatchingSearch() is correctly updated.
		const searchProps = tree.current.getSearchInputElementProps();
		if (searchProps.onChange) {
			const syntheticEvent = {
				target: { value: '' }
			};
			searchProps.onChange(syntheticEvent);
		}

		// Reset tree state to initial expanded items
		treeState = {
			...treeState,
			expandedItems: initialExpandedItems
		};

		// Clear custom filtered items
		filteredItems = [];

		if (inputElement) {
			inputElement.focus();
		}
	}

	const searchInputProps = $derived.by(() => {
		if (tree.current && typeof tree.current.getSearchInputElementProps === 'function') {
			return {
				...tree.current.getSearchInputElementProps(),

				onblur: ((e) => {
					// Prevent default blur behavior
					e.preventDefault();

					// Re-apply the search to ensure it stays active
					if (searchValue && searchValue.length > 0) {
						const searchProps = tree.current.getSearchInputElementProps();
						if (searchProps.onChange) {
							const syntheticEvent = {
								target: { value: searchValue }
							};
							searchProps.onChange(syntheticEvent);
						}
					}
				}) satisfies FocusEventHandler<EventTarget>,

				oninput: ((e) => {
					const value = (e.currentTarget as HTMLInputElement).value;
					searchValue = value;

					// Apply the search to the tree's internal state as well
					const searchProps = tree.current.getSearchInputElementProps();
					searchProps.onChange?.(e);

					if (value && value.length > 0) {
						// If input has at least one character, expand all items and update filtering
						tree.current.expandAll();
						updateFilteredItems(value);
					} else {
						// If input is cleared, reset to initial expanded state
						treeState = {
							...treeState,
							expandedItems: initialExpandedItems
						};
						filteredItems = [];
					}
				}) satisfies ChangeEventHandler<EventTarget>
			};
		}
		return {};
	});
</script>

<div class="flex h-full flex-col gap-2 *:[&_:nth-child(2)]:grow">
	<div class="relative">
		<Input
			{...searchInputProps}
			bind:ref={inputElement}
			bind:value={searchValue}
			class="peer ps-9"
			placeholder="Filter items..."
			type="search"
		/>
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<FilterIcon class="size-4" aria-hidden="true" />
		</div>
		{#if searchValue}
			<button
				class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
				aria-label="Clear search"
				onclick={handleClearSearch}
			>
				<CircleXIcon class="size-4" aria-hidden="true" />
			</button>
		{/if}
	</div>

	<div>
		<Tree {indent} {tree}>
			{#if searchValue && filteredItems.length === 0}
				<p class="px-3 py-4 text-center text-sm">No items found for "{searchValue}"</p>
			{:else}
				{#each tree.current.getItems() as item (item.getId())}
					{@const isVisible = shouldShowItem(item.getId())}
					<TreeItem
						{item}
						data-visible={isVisible || !searchValue}
						class="data-[visible=false]:hidden"
					>
						<TreeLabel>
							<span class="flex items-center gap-2">
								{#if item.isFolder()}
									{#if item.isExpanded()}
										<FolderOpenIcon class="pointer-events-none size-4 text-muted-foreground" />
									{:else}
										<FolderIcon class="pointer-events-none size-4 text-muted-foreground" />
									{/if}
								{/if}

								{item.getItemName()}
							</span>
						</TreeLabel>
					</TreeItem>
				{/each}
			{/if}
		</Tree>
	</div>

	<p aria-live="polite" role="region" class="mt-2 text-xs text-muted-foreground">
		Tree with filtering ∙
		<a
			href="https://headless-tree.lukasbach.com"
			class="underline hover:text-foreground"
			target="_blank"
			rel="noopener noreferrer"
		>
			Headless Tree
		</a>
		∙
		<a
			href="https://github.com/max-got/originui-svelte/blob/main/src/lib/components/ui/tree/use-tree.svelte.ts"
			class="underline hover:text-foreground"
			target="_blank"
			rel="noopener noreferrer"
		>
			Svelte Integration
		</a>
	</p>
</div>
