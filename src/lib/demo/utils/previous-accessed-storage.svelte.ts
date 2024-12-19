import type { ComponentRoutePath } from '$lib/config/routes';

import { useLocalStorage } from '$lib/hooks/use-local-storage.svelte';

const LOCAL_STORAGE_COMPONENTS_KEY = 'svoui:lastAccessedComponents' as const;
type ComponentStats = {
	completed: number;
	todo: number;
	total: number;
};

type LocalStorageComponentsData = {
	[key in ComponentRoutePath]: ComponentStats;
};

export class PreviousAccessedStorage {
	#storage: ReturnType<typeof useLocalStorage>;
	#initialValue = $state<Partial<LocalStorageComponentsData>>({});

	isMismatch = $derived.by(() => {
		const path = Object.keys(this.#initialValue)[0] as ComponentRoutePath;
		if (!path) return false;

		const { completed, todo, total } = this.#initialValue[path] || {};
		const storedValue = this.#storage.current?.data || {};
		const {
			completed: storedCompleted,
			todo: storedTodo,
			total: storedTotal
		} = storedValue[path] || {};

		return storedCompleted !== completed || storedTodo !== todo || storedTotal !== total;
	});

	constructor(initialValue: Partial<LocalStorageComponentsData>) {
		this.#initialValue = { ...initialValue };
		// Initialize storage with memoized value
		this.#storage = useLocalStorage<{ data: Partial<LocalStorageComponentsData> }>(
			LOCAL_STORAGE_COMPONENTS_KEY,
			{ data: initialValue }
		);

		this.#initializeStorage(initialValue);
	}

	#initializeStorage(initialValue: Partial<LocalStorageComponentsData>): void {
		const storedValue = this.#storage.current || {};
		const mergedComponents = { ...initialValue, ...storedValue.data };
		this.#storage.current = { data: mergedComponents };
	}

	getStorage(): ReturnType<typeof useLocalStorage> {
		return this.#storage.current;
	}

	getCurrentComponents(): Partial<LocalStorageComponentsData> {
		return this.#storage.current?.data || {};
	}

	updateComponents(components: Partial<LocalStorageComponentsData>): void {
		this.#storage.current = { data: components };
	}

	getKey() {
		return LOCAL_STORAGE_COMPONENTS_KEY;
	}
}

export function createPreviousAccessedStorage({
	value
}: {
	value: Partial<LocalStorageComponentsData>;
}) {
	return new PreviousAccessedStorage(value);
}
