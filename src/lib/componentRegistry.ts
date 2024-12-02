import {
	OUI_DIRECTORIES,
	type OUIComponent,
	type OUIDirectory,
	type OUIDirectoryToComponent
} from '$lib/componentRegistry.types';

const files = import.meta.glob<OUIComponent>(
	['/src/lib/components/**/*.svelte', '!/src/lib/components/ui/**/*.svelte'],
	{ eager: true }
);

class ComponentRegistry {
	#instance: ComponentRegistry | null = null;
	#components: Map<OUIDirectory, Set<OUIComponent>>;

	constructor() {
		this.#components = this.#initializeComponents();
	}

	getInstance(): ComponentRegistry {
		if (!this.#instance) {
			this.#instance = new ComponentRegistry();
		}
		return this.#instance;
	}

	#initializeComponents(): Map<OUIDirectory, Set<OUIComponent>> {
		const componentMap = new Map<OUIDirectory, Set<OUIComponent>>();

		Object.keys(files).forEach((path) => {
			const match = path.match(/\/components\/([^/]+)\/([^/]+)\.svelte$/);
			if (!match) return;

			const [, directory, filename] = match as [string, OUIDirectory, OUIComponent];

			if (!componentMap.has(directory)) {
				componentMap.set(directory, new Set());
			}
			componentMap.get(directory)?.add(filename);
		});

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

export const componentRegistry = new ComponentRegistry().getInstance();

/* Helper functions */
export const getComponentDirectories = () => componentRegistry.getAllDirectories();
export type Directory = ReturnType<typeof getComponentDirectories>[number];

export const getComponentFileNames = <T extends OUIDirectory>(
	directory: T
): OUIDirectoryToComponent[T][] => componentRegistry.getFiles([directory]);
export type DirectoryFileNames<T extends OUIDirectory> = ReturnType<
	typeof getComponentFileNames<T>
>;

/* Buttons */
export const getButtonsDirectories = () => componentRegistry.getDirectories(['BUTTONS']);
export const getButtonsFileNames = () => componentRegistry.getFiles(getButtonsDirectories());
export type ButtonComponents = DirectoryFileNames<'buttons'>;

/* Checks, Radios, Switches */
export const getChecksDirectories = () =>
	componentRegistry.getDirectories(['CHECKBOXES', 'RADIOS', 'SWITCHES']);
export const getChecksFileNames = () => componentRegistry.getFiles(getChecksDirectories());
export type CheckComponents = DirectoryFileNames<'checkboxes' | 'radios' | 'switches'>;

/* Inputs, Textareas */
export const getInputsDirectories = () => componentRegistry.getDirectories(['INPUTS', 'TEXTAREAS']);
export const getInputsFileNames = () => componentRegistry.getFiles(getInputsDirectories());
export type InputComponents = DirectoryFileNames<'inputs' | 'textareas'>;
