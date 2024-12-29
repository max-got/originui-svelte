import {
	OUI_DIRECTORIES,
	type OUIComponent,
	type OUIDirectory,
	type OUIDirectoryToComponent
} from '$lib/componentRegistry.types';

class ComponentRegistry {
	#components: Map<OUIDirectory, Set<OUIComponent>>;

	constructor() {
		this.#components = new Map();
		this.refresh();
	}

	async refresh() {
		this.#components = await this.#initializeComponents();
	}

	#getFileImports = () => {
		return import.meta.glob<OUIComponent>(
			['$lib/components/**/*.svelte', '!$lib/components/ui/**/*.svelte'],
			{ eager: false, import: 'default' }
		);
	};

	async #initializeComponents(): Promise<Map<OUIDirectory, Set<OUIComponent>>> {
		const files = this.#getFileImports();
		const componentMap = new Map<OUIDirectory, Set<OUIComponent>>();

		// In dev mode, we just need the paths
		const paths = Object.keys(files);

		for (const path of paths) {
			const match = path.match(/\/components\/([^/]+)\/([^/]+)\.svelte$/);
			if (!match) continue;

			const [, directory, filename] = match as [string, OUIDirectory, OUIComponent];

			if (!componentMap.has(directory)) {
				componentMap.set(directory, new Set());
			}
			componentMap.get(directory)?.add(filename);
		}

		return componentMap;
	}

	#getFile<T extends OUIDirectory>(directory: T): OUIDirectoryToComponent[T][] {
		const components = this.#components.get(directory);
		if (!components?.size) {
			throw new Error(`Components ${directory} not found. components/${directory}.json/+server.ts`);
		}
		return Array.from(components) as OUIDirectoryToComponent[T][];
	}

	getAllDirectories(): OUIDirectory[] {
		return Array.from(this.#components.keys());
	}

	getDirectories<T extends keyof typeof OUI_DIRECTORIES>(
		directories: T[]
	): (typeof OUI_DIRECTORIES)[T]['directory'][] {
		return directories.map((directory) => OUI_DIRECTORIES[directory].directory);
	}

	getFiles<T extends OUIDirectory>(directories: T[]): OUIDirectoryToComponent[T][] {
		return directories.flatMap((directory) => this.#getFile(directory));
	}
}

export const initComponentRegistry = async () => {
	const registry = new ComponentRegistry();
	await registry.refresh();
	return registry;
};

let componentRegistryInstance: ComponentRegistry | null = null;

export const getComponentRegistry = async () => {
	if (!componentRegistryInstance) {
		componentRegistryInstance = await initComponentRegistry();
	}
	return componentRegistryInstance;
};

/* Helper functions */
export const getComponentDirectories = async () =>
	(await getComponentRegistry()).getAllDirectories();
export type Directory = Awaited<ReturnType<typeof getComponentDirectories>>[number];

export const getComponentFileNames = async <T extends OUIDirectory>(
	directory: T
): Promise<OUIDirectoryToComponent[T][]> => (await getComponentRegistry()).getFiles([directory]);
export type DirectoryFileNames<T extends OUIDirectory> = Awaited<
	ReturnType<typeof getComponentFileNames<T>>
>;
