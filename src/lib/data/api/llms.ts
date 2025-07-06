import type { RegistryItem } from '@shadcn-svelte/registry';

import { GITHUB_REPO_URL } from '$lib/constants';

interface RegistryFile {
	content?: string;
	path?: string;
	target?: string;
	type?: string;
}

export function llmsMdGenerator(component: RegistryItem & { files: RegistryFile[] }) {
	const { files, meta, name, registryDependencies } = component;

	const codeBlocks = files
		.map((file) => (file.content ? file.content : '// No code available for this file.'))
		.join('\n');

	const getFileLocation = (file: RegistryFile) => file.path ?? file.target ?? '';

	return `## ${name}

> A type-safe, accessible ${name} component for building modern UIs. This component is part of the ${meta?.category ?? ''} collection.

### Core Information

- **Component ID**: \`${name}\`
- **Locations**: \`${files.map(getFileLocation).join(', ')}\`
- **Type**: UI Component

### Usage

${renderDependencies(registryDependencies)}
Full component implementation:

\`\`\`svelte
${codeBlocks}
\`\`\`

${renderLinks(files, name)}
`;
}

function renderDependencies(deps?: string[]) {
	if (!deps?.length) return '';
	return `### Dependencies\n\nRequired packages and components:\n\n${deps.map((dep) => `- \`${dep}\``).join('\n')}\n`;
}

function renderLinks(files: RegistryFile[], name: string) {
	if (!files?.length) return '';
	const firstTarget = files[0]?.path ?? files[0]?.target ?? '';
	return `### Links\n\n- [View Source](${GITHUB_REPO_URL}tree/main${firstTarget})\n`;
}
