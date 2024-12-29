import type { OUIComponent, OUIDirectory } from '$lib/componentRegistry.types.js';
import type { Component } from 'svelte';

import { highlighterSvelte, highlighterZsh } from './codePreview.js';
import { COLLAPSIBLE_END_REGEX, COLLAPSIBLE_START_REGEX } from './shiki-transformer/collapsible.js';
import {
	ENHANCED_IMAGE_REGEX,
	POSSIBLE_DEPENDENCIES,
	type PossibleDependency
} from '$lib/constants.js';

const IMPORTS_REGEX =
	/(?<=(?:import|export)[^`'"]*from\s+[`'"])(?<path1>[^`'"]+)(?=[`'"])|(?:import|export)(?:\s+|\s*\(\s*)[`'"](?<path2>[|'"`])/g;

interface ComponentImports {
	compiled: Record<string, () => Promise<Component>>;
	source: Record<string, () => Promise<string>>;
}

const getImports = (): ComponentImports => {
	return {
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
				eager: false,
				import: 'default',
				query: '?raw'
			}
		) as Record<string, () => Promise<string>>
	};
};

function removeShikiComments(source: string) {
	return source
		.split('\n')
		.filter((line) => !line.match(COLLAPSIBLE_START_REGEX) && !line.match(COLLAPSIBLE_END_REGEX))
		.join('\n');
}

function addPathComment(source: string, path: string) {
	return `${source}\n<!-- Path: ${path} -->`;
}

function getDependencies(source: string): PossibleDependency[] {
	const dependencies = new Set<PossibleDependency>();
	const matches = source.matchAll(IMPORTS_REGEX);
	for (const match of matches) {
		const importPath = match[1] || match[2];
		const matchingDeps = POSSIBLE_DEPENDENCIES.filter((dep) => importPath.includes(dep.name));
		matchingDeps.forEach((dep) => dependencies.add(dep));
	}

	const enhancedImageMatch = source.match(ENHANCED_IMAGE_REGEX);
	if (enhancedImageMatch) {
		dependencies.add({
			dev: true,
			//@ts-expect-error  - isn't a direct dependency, but must be treated as such
			name: 'enhanced-image',
			//@ts-expect-error  - isn't a direct dependency, but must be treated as such
			packageName: '@sveltejs/enhanced-img',
			//@ts-expect-error  - isn't a direct dependency, but must be treated as such
			url: 'https://www.npmjs.com/package/@sveltejs/enhanced-img'
		});
	}

	const sortedDependencies = Array.from(dependencies.values()).sort(
		(a, b) => Number(a.dev) - Number(b.dev)
	);

	if (sortedDependencies.length === 0) return [];

	return sortedDependencies;
}

function addDependenciesComments(source: string, dependencies: PossibleDependency[]) {
	if (dependencies.length === 0) return source;

	const deps = dependencies.filter((d) => !d.dev).map((d) => d.packageName);
	const devDeps = dependencies.filter((d) => d.dev).map((d) => d.packageName);

	let comment = '<!--\nDependencies:\n';
	if (devDeps.length) comment += `pnpm i -D ${devDeps.join(' ')}\n`;
	if (deps.length) comment += `pnpm i ${deps.join(' ')}\n`;
	comment += '-->';

	return `${source}\n\n${comment}`;
}

function getDependenciesInstallCommand(dependencies: PossibleDependency[]) {
	if (dependencies.length === 0) return '';

	let command = '';
	const deps = dependencies.filter((d) => !d.dev).map((d) => d.packageName);
	const devDeps = dependencies.filter((d) => d.dev).map((d) => d.packageName);

	if (devDeps.length) command += `pnpm i -D ${devDeps.join(' ')}`;
	if (deps.length) {
		if (command) command += ' && ';
		command += `pnpm i ${deps.join(' ')}`;
	}

	return command;
}

function buildComponentPath(
	directory: string,
	componentName: string
): `/src/lib/components/${string}/${string}.svelte` {
	return `/src/lib/components/${directory}/${componentName}.svelte`;
}

async function processComponentSource(rawSource: string, path: string) {
	const dependencies = getDependencies(rawSource);
	const dependenciesInstallCommand = getDependenciesInstallCommand(dependencies);

	const cleanedSource = removeShikiComments(rawSource);
	const sourceWithDeps = addDependenciesComments(cleanedSource, dependencies);
	const previewSource = addPathComment(addDependenciesComments(rawSource, dependencies), path);

	const [highlightedSource, highlightedCleanedSource, highlightedInstallCommand] =
		await Promise.all([
			highlighterSvelte(previewSource),
			highlighterSvelte(rawSource),
			highlighterZsh(dependenciesInstallCommand)
		]);

	return {
		code: {
			highlighted: { content: highlightedCleanedSource },
			highlightedWithDeps: { content: highlightedSource },
			raw: { content: sourceWithDeps },
			rawWithDeps: { content: previewSource }
		},
		componentDependencies: {
			command: {
				highlighted: { content: dependenciesInstallCommand ? highlightedInstallCommand : '' },
				raw: { content: dependenciesInstallCommand }
			},
			list: dependencies
		}
	} as const;
}

export async function getCompiledComponent(path: string) {
	const imports = getImports();
	if (!imports.compiled[path]) return null;
	return (await imports.compiled[path]()) ?? null;
}

export async function getComponentSource(directory: OUIDirectory, componentName: OUIComponent) {
	const path = buildComponentPath(directory, componentName);
	const imports = getImports();
	const importFn = imports.source[path];

	const processedComponentSource = await processComponentSource(await importFn(), path);

	const hasContent = Boolean(processedComponentSource.code.raw.content?.trim());
	const componentState = {
		isAvailable: hasContent && !componentName.includes('.soon') && !componentName.includes('.todo'),
		isComingSoon: componentName.includes('.soon') && hasContent,
		isTodo: componentName.includes('.todo')
	};

	if (componentState.isTodo) {
		return {
			...processedComponentSource,
			availability: 'todo',
			directory,
			id: componentName,
			name: componentName.replace('.todo', ''),
			path
		} as const;
	}

	if (componentState.isComingSoon) {
		return {
			...processedComponentSource,
			availability: 'soon',
			directory,
			id: componentName,
			name: componentName.replace('.soon', ''),
			path
		} as const;
	}

	return {
		...processedComponentSource,
		availability: 'available',
		directory,
		id: componentName,
		name: componentName,
		path
	} as const;
}
