<script lang="ts">
	import type { ItemInstance } from '@headless-tree/core';

	import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core';
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

	const indent = 20;

	const tree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId: string) => items[itemId].children ?? [],
			getItem: (itemId: string) => items[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item: ItemInstance<Item>) => item.getItemData().name,
		indent,
		initialState: {
			expandedItems: ['engineering', 'frontend', 'design-system']
		},
		isItemFolder: (item: ItemInstance<Item>) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: 'company'
	});
</script>

<div class="flex h-full flex-col gap-2 *:first:grow">
	<Tree
		class="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
		{indent}
		{tree}
	>
		{#each tree.current.getItems() as item (item.getId())}
			<TreeItem {item}>
				<TreeLabel>
					{item.getItemData().name}
				</TreeLabel>
			</TreeItem>
		{/each}
	</Tree>
	<p aria-live="polite" role="region" class="mt-2 text-xs text-muted-foreground">
		Basic tree with no extra features ∙
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
