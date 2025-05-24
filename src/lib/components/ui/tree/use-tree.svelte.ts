import {
	createTree,
	type FeatureImplementation,
	type TreeConfig,
	type TreeInstance,
	type TreeState
} from '@headless-tree/core';
import { createAttachmentKey } from 'svelte/attachments';
import { createSubscriber } from 'svelte/reactivity';

// This is a workaround to allow for  behavior in Svelte.

export const svelteFeatures: FeatureImplementation = {
	itemInstance: {
		getProps: ({ item, prev }) => {
			const { onClick, onDragEnd, onDragLeave, onDragOver, onDragStart, onDrop, ...rest } =
				prev?.() ?? {};

			const attacher = {
				[createAttachmentKey()]: (node: HTMLElement) => {
					item.registerElement(node);
				}
			};
			return {
				...rest,
				attacher,
				onclick: onClick,
				ondragend: onDragEnd,
				ondragleave: onDragLeave,
				ondragover: onDragOver,
				ondragstart: onDragStart,
				ondrop: onDrop
			};
		}
	}
};

export class ReactiveTree<T> {
	#tree: TreeInstance<T>;
	#subscribe: () => void;
	#currentState: TreeState<T>;

	constructor(config: TreeConfig<T>) {
		const configWithFeatures: TreeConfig<T> = {
			...config,
			features: [...(config.features ?? []), svelteFeatures]
		};
		this.#tree = createTree(configWithFeatures);

		this.#currentState = this.#tree.getState();

		this.#subscribe = createSubscriber((update) => {
			this.#tree.setConfig((prev) => ({
				...prev,
				...config,
				features: [...(config.features ?? []), svelteFeatures],
				setState: (newState) => {
					this.#currentState = {
						...this.#currentState,
						...newState
					};
					config.setState?.(this.#currentState);
					// Trigger reactive updates when tree state changes
					update();
				},
				state: {
					...this.#currentState,
					...config.state
				}
			}));

			// Do we need a cleanup?
			return () => {};
		});
	}

	get current(): TreeInstance<T> {
		this.#subscribe();
		return this.#tree;
	}
}

export const useTree = <T>(config: TreeConfig<T>) => new ReactiveTree<T>(config);
