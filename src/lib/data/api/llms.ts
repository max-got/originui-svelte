import { GITHUB_REPO_URL } from '$lib/constants';

import type { ComponentAPIResponseJSON } from './components/components.handler';

export function llmsMdGenerator(component: ComponentAPIResponseJSON['components'][number]) {
	const {
		code: {
			raw: { content }
		},
		componentDependencies: { list: componentDependencies },
		directory,
		id,
		name,
		path
	} = component;

	const sections: string[] = [];

	// Title and description following llms.txt spec
	sections.push(`## ${name}`);
	sections.push('');
	sections.push(
		`> A type-safe, accessible ${name} component for building modern UIs. This component is part of the ${directory} collection.`
	);
	sections.push('');

	// Core information section
	sections.push('### Core Information');
	sections.push('');
	sections.push(`- **Component ID**: \`${id}\``);
	sections.push(`- **Location**: \`${path}\``);
	sections.push(`- **Type**: UI Component`);
	sections.push('');

	// Usage section
	sections.push('### Usage');
	sections.push('');
	sections.push('```svelte');

	// Dependencies section if any
	if (componentDependencies?.length) {
		sections.push('### Dependencies');
		sections.push('');
		sections.push('Required packages and components:');
		sections.push('');
		componentDependencies.forEach((dep) => {
			sections.push(`- [\`${dep.name}\`](${dep.url})${dep.dev ? ' (dev dependency)' : ''}`);
		});
		sections.push('');
	}

	// Optional section for full implementation

	sections.push('Full component implementation:');
	sections.push('');
	sections.push('```svelte');
	sections.push(content);
	sections.push('```');
	sections.push('');

	// Links section
	sections.push('### Links');
	sections.push('');
	sections.push(`- [View Source](${GITHUB_REPO_URL}tree/main${path})`);
	sections.push('');

	return sections.join('\n');
}
