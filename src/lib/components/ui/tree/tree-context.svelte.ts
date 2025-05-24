import type { ItemInstance } from '@headless-tree/core';

import { Context } from 'runed';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TreeContextValue<T = any> {
	currentItem?: ItemInstance<T>;
	indent: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tree?: any;
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
