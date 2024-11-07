import {
	COLLAPSIBLE_END_REGEX,
	COLLAPSIBLE_START_REGEX,
	ENHANCED_IMAGE_REGEX,
	IMPORTS_REGEX,
	POSSIBLE_DEPENDENCIES
} from './shared.js';

export function removeShikiComments(source: string) {
	return source
		.split('\n')
		.filter((line) => !line.match(COLLAPSIBLE_START_REGEX) && !line.match(COLLAPSIBLE_END_REGEX))
		.join('\n');
}

export function addPathComment(source: string, path: string) {
	return `${source}\n<!-- Path: ${path} -->`;
}

export function addDependenciesComments(source: string) {
	const dependencies = new Set<(typeof POSSIBLE_DEPENDENCIES)[number]>();

	const matches = source.matchAll(IMPORTS_REGEX);
	for (const match of matches) {
		const importPath = match[1] || match[2];
		const dependency = POSSIBLE_DEPENDENCIES.find((dep) => importPath.includes(dep.name));
		if (dependency) {
			dependencies.add(dependency);
		}
	}

	const enhancedImageMatch = source.match(ENHANCED_IMAGE_REGEX);
	if (enhancedImageMatch) {
		dependencies.add({
			dev: true,
			// @ts-expect-error - i know what i'm doing
			name: 'enhanced-image',
			// @ts-expect-error - i know what i'm doing
			packageName: '@sveltejs/enhanced-img'
		});
	}

	const sortedDependencies = Array.from(dependencies).sort((a, b) => Number(a.dev) - Number(b.dev));

	if (sortedDependencies.length === 0) return source;

	const deps = sortedDependencies.filter((d) => !d.dev).map((d) => d.packageName);
	const devDeps = sortedDependencies.filter((d) => d.dev).map((d) => d.packageName);

	let comment = '<!--\nDependencies:\n';
	if (devDeps.length) comment += `pnpm i -D ${devDeps.join(' ')}\n`;
	if (deps.length) comment += `pnpm i ${deps.join(' ')}\n`;
	comment += '-->';

	return `${source}\n\n${comment}`;
}
