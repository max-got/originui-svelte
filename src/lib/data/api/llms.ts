import { GITHUB_REPO_URL } from '$lib/constants';

import type { ComponentAPIResponseJSON } from './components.handler';

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

	// Title and description
	sections.push(`# Component: ${name}`);
	sections.push('');
	sections.push(`> A reusable UI component built with Svelte and Tailwind CSS`);
	sections.push('');

	// Key metadata
	sections.push('## Component Information');
	sections.push('');
	sections.push(`- **Directory**: \`${directory}\``);
	sections.push(`- **Component ID**: \`${id}\``);
	sections.push(`- **File Path**: \`${path}\``);
	sections.push('');

	//Dependencies section if any
	if (componentDependencies && componentDependencies.length > 0) {
		sections.push('## Dependencies');
		sections.push('');
		componentDependencies.forEach((dep) => {
			sections.push(
				`- [${dep.name}](${dep.url}): ${dep.dev ? 'Development Dependency' : 'Production Dependency'}`
			);
		});
		sections.push('');
	}

	// Source code section
	sections.push('## Implementation');
	sections.push('');
	sections.push('```svelte');
	sections.push(content);
	sections.push('```');
	sections.push('');

	// Links section
	sections.push('## Links');
	sections.push('');
	sections.push(`- [View Source on GitHub](${GITHUB_REPO_URL}tree/main${path})`);

	return sections.join('\n');
}
