import type { LayoutServerLoad } from './$types';

import { getComponentRegistry } from '$lib/componentRegistry';

export const load = (async () => {
	const instance = await getComponentRegistry();
	const files = instance.getRegistryMetaData();

	const entries = Object.entries(files.directoriesBreakdown);
	const links = entries.map(([directory, metadata]) => ({
		components: {
			'aria-label': 'Raw JSON for ' + directory,
			href: metadata.apiUrl,
			label: directory + '.json'
		},
		llms: {
			'aria-label': 'LLMs.txt for ' + directory,
			href: metadata.llmsTextUrl,
			label: 'llms/' + directory + '.txt'
		}
	}));

	const footerLinks = [
		{
			links: [
				{
					'aria-label': 'LLMs.txt for all components',
					href: '/llms.txt',
					label: 'llms.txt'
				},
				...links.map((link) => link.llms)
			],
			title: 'llms.txt'
		},
		{
			links: [
				{
					'aria-label': 'Raw JSON for all components',
					href: '/api/v1/components/_meta.json',
					label: '_meta.json'
				},
				...links.map((link) => link.components)
			],
			title: 'components.json'
		}
	];

	return {
		footerLinks
	};
}) satisfies LayoutServerLoad;
