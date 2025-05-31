<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	import Input from '$lib/components/ui/input.svelte';

	import {
		expandAllFeature,
		hotkeysCoreFeature,
		searchFeature,
		selectionFeature,
		syncDataLoaderFeature,
		type TreeState
	} from '@headless-tree/core';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { Tree, TreeItem, TreeLabel, useTree } from '$lib/components/ui/tree';

	interface Item {
		children?: string[];
		name: string;
	}
	const initialItems: Record<string, Item> = {
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
	let items = $state.raw(initialItems);
	const initialExpandedItems = ['engineering', 'frontend', 'design-system'];

	const indent = 20;
	let treeState = $state.raw<Partial<TreeState<Item>>>({});

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

	const searchInputProps = $derived.by(() => {
		if (tree.current && typeof tree.current.getSearchInputElementProps === 'function') {
			return {
				...tree.current.getSearchInputElementProps(),
				class: 'peer ps-9',
				onchange: ((e) => {
					// First call the original onChange handler from getSearchInputElementProps
					const originalProps = tree.current.getSearchInputElementProps();
					originalProps.onChange?.(e);

					// Then handle our custom logic
					const value = (e.currentTarget as HTMLInputElement).value;

					if (value.length > 0) {
						// If input has at least one character, expand all items
						tree.current.expandAll();
					} else {
						// If input is cleared, reset to initial expanded state
						treeState = {
							...treeState,
							expandedItems: initialExpandedItems
						};
					}
				}) satisfies ChangeEventHandler<EventTarget>,
				placeholder: 'Quick search...',
				type: 'search'
			};
		}
		return {
			class: 'peer ps-9',
			placeholder: 'Quick search...',
			type: 'search'
		};
	});
</script>

<div class="flex h-full flex-col gap-2 *:[&_:nth-child(2)]:grow">
	<div class="relative">
		<Input {...searchInputProps} />
		<div
			class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50"
		>
			<SearchIcon class="size-4" aria-hidden="true" />
		</div>
	</div>

	<div>
		<Tree {indent} {tree}>
			{#each tree.current.getItems() as item (item.getId())}
				<TreeItem {item}>
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
		</Tree>
	</div>
	<p aria-live="polite" role="region" class="mt-2 text-xs text-muted-foreground">
		Tree with search highlight ∙
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
