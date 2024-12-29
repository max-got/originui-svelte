import type { ComponentRoutePath } from '$lib/config/routes';

import { useLocalStorage } from '$lib/hooks/use-local-storage.svelte';

const LOCAL_STORAGE_COMPONENTS_KEY = 'svoui:lastAccessedComponents' as const;

export type ComponentStats = {
	completed: number;
	todo: number;
	total: number;
};

export type LocalStorageComponentsData = {
	[key in ComponentRoutePath]: ComponentStats;
};

export type StorageData = {
	data: Partial<LocalStorageComponentsData>;
};

export type ComponentMetadata = {
	completed: number;
	path: ComponentRoutePath;
	todo: number;
	total: number;
};

export class PreviousAccessedStorage {
	#storage: ReturnType<typeof useLocalStorage<StorageData>>;
	#initialValue = $state<Partial<LocalStorageComponentsData>>({});

	isMismatch = $derived.by(() => {
		const path = Object.keys(this.#initialValue)[0] as ComponentRoutePath;
		if (!path) return false;

		const { completed, todo, total } = this.#initialValue[path] || {};
		const storedValue = this.#storage.current.data;
		const {
			completed: storedCompleted,
			todo: storedTodo,
			total: storedTotal
		} = storedValue[path] || {};

		return storedCompleted !== completed || storedTodo !== todo || storedTotal !== total;
	});

	constructor(initialValue: Partial<LocalStorageComponentsData>) {
		this.#initialValue = { ...initialValue };
		this.#storage = useLocalStorage<StorageData>(LOCAL_STORAGE_COMPONENTS_KEY, {
			data: initialValue
		});
		this.#initializeStorage(initialValue);
	}

	#initializeStorage(initialValue: Partial<LocalStorageComponentsData>): void {
		const storedValue = this.#storage.current;
		const mergedComponents = { ...initialValue, ...storedValue.data };
		this.#storage.current = { data: mergedComponents };
	}

	getStorage(): StorageData {
		return this.#storage.current;
	}

	getCurrentComponents(): Partial<LocalStorageComponentsData> {
		return this.#storage.current.data;
	}

	updateComponents(components: Partial<LocalStorageComponentsData>): void {
		this.#storage.current = { data: components };
	}

	getNewComponentCount(metadata: ComponentMetadata): number {
		const storedTotal = this.getCurrentComponents()[metadata.path]?.total ?? 0;
		return metadata.total - storedTotal;
	}

	updateComponentMetadata(metadata: ComponentMetadata): void {
		const currentComponents = this.getCurrentComponents();
		this.updateComponents({
			...currentComponents,
			[metadata.path]: {
				completed: metadata.completed,
				todo: metadata.todo,
				total: metadata.total
			}
		});
	}
}

export function createPreviousAccessedStorage(
	metadata: ComponentMetadata
): PreviousAccessedStorage {
	return new PreviousAccessedStorage({
		[metadata.path]: {
			completed: metadata.completed,
			todo: metadata.todo,
			total: metadata.total
		}
	});
}
