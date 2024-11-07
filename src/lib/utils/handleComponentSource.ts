import type { Component } from 'svelte';

import highlighter from './codePreview.js';
import { addDependenciesComments, addPathComment, removeShikiComments } from './sourceProcessor.js';

import type { ComponentMetadata, ComponentRender } from '../types/components.js';

interface ComponentImports {
	compiled: Record<string, Component>;
	source: Record<string, string>;
}

// Lazy load imports
let imports: ComponentImports | null = null;

function getImports(): ComponentImports {
	if (!imports) {
		imports = {
			compiled: import.meta.glob(
				['/src/lib/components/**/*.svelte', '!/src/lib/components/ui/**/*.svelte'],
				{
					eager: true,
					import: 'default'
				}
			) as Record<string, Component>,

			source: import.meta.glob(
				['/src/lib/components/**/*.svelte', '!/src/lib/components/ui/**/*.svelte'],
				{
					eager: true,
					import: 'default',
					query: '?raw'
				}
			) as Record<string, string>
		};
	}
	return imports;
}

function buildComponentPath(directory: string, componentName: string): string {
	return `/src/lib/components/${directory}/${componentName}.svelte`;
}

function createEmptyComponentMetadata(componentName: string, path: string): ComponentMetadata {
	return {
		code: {
			copyable: { content: '' },
			highlighted: { content: '' },
			preview: { content: '' }
		},
		id: componentName,
		path
	};
}

async function processComponentSource(rawSource: string, path: string) {
	const cleanedSource = removeShikiComments(rawSource);
	const sourceWithDeps = addDependenciesComments(cleanedSource);
	const previewSource = addPathComment(addDependenciesComments(rawSource), path);
	const highlightedSource = await highlighter(previewSource);

	return {
		copyable: { content: sourceWithDeps },
		highlighted: { content: highlightedSource },
		preview: { content: previewSource }
	};
}

export async function getCompiledComponent(path: string): Promise<Component | null> {
	const { compiled } = getImports();
	return compiled[path] ?? null;
}

export async function getComponentSource(
	directory: string,
	componentName: string
): Promise<ComponentMetadata> {
	const path = buildComponentPath(directory, componentName);
	const { source } = getImports();
	const rawSource = source[path];

	const metadata = !rawSource
		? createEmptyComponentMetadata(componentName, path)
		: {
				code: await processComponentSource(rawSource, path),
				id: componentName,
				path
			};

	return metadata;
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
