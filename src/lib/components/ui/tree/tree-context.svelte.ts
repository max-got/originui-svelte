import { Context } from 'runed';

import type { ReactiveItemInstance, ReactiveTree } from './use-tree.svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TreeContextValue<T = any> {
	currentItem?: ReactiveItemInstance<T>;
	indent: number;
	tree?: ReactiveTree<T>;
}

export const treeContext = new Context<TreeContextValue | undefined>('tree:context');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useTreeContext<T = any>() {
	const context = treeContext.get();

	if (!context) {
		throw new Error('useTree must be used within a Tree');
	}

	return context as TreeContextValue<T>;
}
