import type { Component } from 'svelte';
import type { ComponentMetadata, ComponentRender } from '../types/components.js';
import { removeShikiComments, addPathComment, addDependenciesComments } from './sourceProcessor.js';
import highlighter from './codePreview.js';

interface ComponentImports {
	compiled: Record<string, () => Promise<Component>>;
	source: Record<string, () => Promise<string>>;
}

// Lazy load imports
let imports: ComponentImports | null = null;

function getImports(): ComponentImports {
	if (!imports) {
		imports = {
			compiled: import.meta.glob(
				['/src/lib/components/**/*.svelte', '!/src/lib/components/ui/**/*.svelte'],
				{
					eager: false,
					import: 'default'
				}
			) as Record<string, () => Promise<Component>>,

			source: import.meta.glob(
				['/src/lib/components/**/*.svelte', '!/src/lib/components/ui/**/*.svelte'],
				{
					query: '?raw',
					eager: false,
					import: 'default'
				}
			) as Record<string, () => Promise<string>>
		};
	}
	return imports;
}

function buildComponentPath(directory: string, componentName: string): string {
	return `/src/lib/components/${directory}/${componentName}.svelte`;
}

function createEmptyComponentMetadata(componentName: string, path: string): ComponentMetadata {
	return {
		id: componentName,
		path,
		code: {
			copyable: { content: '' },
			preview: { content: '' },
			highlighted: { content: '' }
		}
	};
}

async function processComponentSource(rawSource: string, path: string) {
	const cleanedSource = removeShikiComments(rawSource);
	const sourceWithDeps = addDependenciesComments(cleanedSource);
	const previewSource = addPathComment(addDependenciesComments(rawSource), path);
	const highlightedSource = await highlighter(previewSource);

	return {
		copyable: { content: sourceWithDeps },
		preview: { content: previewSource },
		highlighted: { content: highlightedSource }
	};
}

export async function getCompiledComponent(path: string): Promise<Component | null> {
	const { compiled } = getImports();
	const importFn = compiled[path];
	if (!importFn) return null;
	return await importFn();
}

export async function getComponentSource(
	directory: string,
	componentName: string
): Promise<ComponentMetadata> {
	const path = buildComponentPath(directory, componentName);
	const { source } = getImports();
	const importFn = source[path];

	if (!importFn) {
		return createEmptyComponentMetadata(componentName, path);
	}

	const rawSource = await importFn();
	return {
		id: componentName,
		path,
		code: await processComponentSource(rawSource, path)
	};
}

export async function fetchComponentsFromAPI(
	fetchFn: typeof fetch,
	directory: string
): Promise<ComponentMetadata[]> {
	const response = await fetchFn(`/api/v1/components/${directory}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch components: ${response.statusText}`);
	}

	const components = (await response.json()) as ComponentMetadata[];
	return components;
}

export async function createComponentRender(metadata: ComponentMetadata): Promise<ComponentRender> {
	const component = await getCompiledComponent(metadata.path);
	if (!component) {
		throw new Error(`Component not found: ${metadata.path}`);
	}

	const render: ComponentRender = {
		render: component,
		...metadata
	};

	return render;
}
