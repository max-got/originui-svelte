<script lang="ts">
	import {
		createOnDropHandler,
		dragAndDropFeature,
		hotkeysCoreFeature,
		keyboardDragAndDropFeature,
		selectionFeature,
		syncDataLoaderFeature
	} from '@headless-tree/core';
	import FolderIcon from '@lucide/svelte/icons/folder';
	import FolderOpenIcon from '@lucide/svelte/icons/folder-open';
	import {
		Tree,
		TreeAssistiveTreeDescription,
		TreeDragLine,
		TreeItem,
		TreeLabel,
		useTree
	} from '$lib/components/ui/tree';
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
	let items = $state(initialItems);

	const indent = 20;

	const tree = useTree<Item>({
		canReorder: true,
		dataLoader: {
			getChildren: (itemId) => items[itemId].children ?? [],
			getItem: (itemId) => items[itemId]
		},
		features: [
			syncDataLoaderFeature,
			selectionFeature,
			hotkeysCoreFeature,
			dragAndDropFeature,
			keyboardDragAndDropFeature
		],
		getItemName: (item) => item.getItemData().name,
		indent,
		initialState: {
			expandedItems: ['engineering', 'frontend', 'design-system'],
			selectedItems: ['components']
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		onDrop: createOnDropHandler((parentItem, newChildrenIds) => {
			items = {
				...items,
				[parentItem.getId()]: {
					...items[parentItem.getId()],
					children: newChildrenIds
				}
			};
		}),
		rootItemId: 'company'
	});
</script>

<div class="flex h-full flex-col gap-2 *:first:grow">
	<div>
		<Tree {indent} tree={tree.current}>
			<TreeAssistiveTreeDescription tree={tree.current} />
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
			<TreeDragLine />
		</Tree>
	</div>
</div>
