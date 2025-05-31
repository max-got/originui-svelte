/**
 * This is a workaround to allow for behavior in Svelte.
 * DO NOT USE THIS IN PRODUCTION.
 * If you have a better solution, please submit a PR. Even better, submit a PR to https://github.com/lukasbach/headless-tree
 * to give svelte a native way to handle this.
 */

import {
	createTree,
	type FeatureImplementation,
	type ItemInstance,
	type TreeConfig,
	type TreeInstance
} from '@headless-tree/core';
import { tick } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';
import { createSubscriber } from 'svelte/reactivity';

// This is a workaround to allow for behavior in Svelte.
export const svelteFeatures: FeatureImplementation = {
	itemInstance: {
		getProps: ({ prev }) => {
			const props = prev?.() ?? {};
			return {
				...props,
				[createAttachmentKey()]: (node: HTMLElement) => {
					props.ref(node);
				},
				onblur: props.onBlur ? (e: FocusEvent) => props.onBlur(e) : undefined,
				onclick: props.onClick ? (e: MouseEvent) => props.onClick(e) : undefined,
				ondragend: props.onDragEnd ? (e: DragEvent) => props.onDragEnd(e) : undefined,
				ondragleave: props.onDragLeave ? (e: DragEvent) => props.onDragLeave(e) : undefined,
				ondragover: props.onDragOver ? (e: DragEvent) => props.onDragOver(e) : undefined,
				ondragstart: props.onDragStart ? (e: DragEvent) => props.onDragStart(e) : undefined,
				ondrop: props.onDrop ? (e: DragEvent) => props.onDrop(e) : undefined,
				onfocus: props.onFocus ? (e: FocusEvent) => props.onFocus(e) : undefined
			};
		},
		getRenameInputProps({ prev }) {
			const { onBlur, onChange, ...props } = prev?.() ?? {};
			return {
				...props,
				[createAttachmentKey()]: (node: HTMLElement) => {
					props.ref?.(node);
				},
				onblur: onBlur ? (e: FocusEvent) => onBlur(e) : undefined,
				// Couldn't get onChange to work, so we're using oninput instead
				oninput: onChange ? (e: Event) => onChange(e) : undefined
			};
		}
	},

	treeInstance: {
		getContainerProps({ prev }, ...rest) {
			const props = prev?.() ?? {};
			return {
				...props,
				...rest,
				[createAttachmentKey()]: (node: HTMLElement) => {
					props.ref(node);
				}
			};
		},
		getSearchInputElementProps({ prev }, ...rest) {
			const { onBlur, onChange, ...props } = prev?.() ?? {};
			return {
				...props,
				...rest,

				[createAttachmentKey()]: (node: HTMLElement) => {
					props.ref?.(node);
				},

				onblur: onBlur ? (e: FocusEvent) => onBlur(e) : undefined,
				// Couldn't get onChange to work, so we're using oninput instead
				oninput: onChange ? (e: Event) => onChange(e) : undefined
			};
		}
	}
};

// Create a reactive proxy for ItemInstance
type ReactiveItemInstance<T> = ItemInstance<T> & {
	[K in keyof ItemInstance<T>]: ItemInstance<T>[K] extends (...args: never[]) => unknown
		? (...args: Parameters<ItemInstance<T>[K]>) => ReturnType<ItemInstance<T>[K]>
		: ItemInstance<T>[K];
};

export class ReactiveTree<T> {
	#tree = $state.raw<TreeInstance<T>>()!;
	#subscribe: () => void;
	#itemProxies = new WeakMap<ItemInstance<T>, ReactiveItemInstance<T>>();

	constructor(config: TreeConfig<T>) {
		const configWithFeatures: TreeConfig<T> = {
			...config,
			features: [...(config.features ?? []), svelteFeatures]
		};

		this.#tree = createTree(configWithFeatures);

		this.#subscribe = createSubscriber((update) => {
			// Store the original methods
			const originalSetState = this.#tree.setState;
			const originalApplySubStateUpdate = this.#tree.applySubStateUpdate;
			const originalGetItems = this.#tree.getItems;

			this.#tree.setState = (state) => {
				originalSetState.call(this.#tree, state);
				tick().then(() => {
					update();
				});
			};

			// Override applySubStateUpdate to handle for example selection and drag-and-drop changes
			this.#tree.applySubStateUpdate = ((
				...args: Parameters<typeof originalApplySubStateUpdate>
			) => {
				originalApplySubStateUpdate.apply(this.#tree, args);
				tick().then(() => {
					update();
				});
			}) as typeof originalApplySubStateUpdate;

			this.#tree.getItems = (...args: Parameters<typeof originalGetItems>) => {
				const items = originalGetItems.apply(this.#tree, args);
				return items.map((item) => this.#createReactiveItemProxy(item));
			};
			return () => {
				this.#tree.setState = originalSetState;
				this.#tree.applySubStateUpdate = originalApplySubStateUpdate;
				this.#tree.getItems = originalGetItems;
			};
		});
	}

	get current(): TreeInstance<T> {
		this.#subscribe();
		return this.#tree;
	}

	// Create a reactive proxy for an item instance
	#createReactiveItemProxy(item: ItemInstance<T>): ReactiveItemInstance<T> {
		if (this.#itemProxies.has(item)) {
			return this.#itemProxies.get(item)!;
		}

		const proxy = new Proxy(item, {
			get: (target, prop: string | symbol) => {
				const value = target[prop as keyof ItemInstance<T>];

				// If it's a function, check if it should be reactive
				// !TODO: this is a hack to make all methods reactive, we should only make the methods that are needed reactive
				if (typeof value === 'function' && typeof prop === 'string') {
					return (...args: unknown[]) => {
						// Make the call reactive
						this.#subscribe();
						return (value as (...args: unknown[]) => unknown).apply(target, args);
					};
				}

				// For non-reactive methods and properties, return as-is
				return value;
			}
		}) as ReactiveItemInstance<T>;

		// Cache the proxy
		this.#itemProxies.set(item, proxy);
		return proxy;
	}

	// Simple reactive helper - call this with any item method to make it reactive
	/**
	 * @param fn - The function to make reactive
	 * @returns The result of the function
	 * @example
	 * ```ts
	 * const isFolder = tree.reactive(() => item.isFolder());
	 * ```
	 */
	reactive<R>(fn: () => R): R {
		this.#subscribe();
		return fn();
	}
}

export const useTree = <T>(config: TreeConfig<T>) => new ReactiveTree<T>(config);

// Export the reactive item instance type for use in components
export type { ReactiveItemInstance };
