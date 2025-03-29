import { getComponentRegistry } from '$lib/componentRegistry';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const instance = await getComponentRegistry();
	const files = instance.getRegistryMetaData();

	const entries = Object.entries(files.directoriesBreakdown);
	const links = entries.map(([directory, metadata]) => ({
		llms: {
			label: 'llms/' + directory + '.txt',
			href: metadata.llmsTextUrl,
			ariaLabel: 'LLMs.txt for ' + directory
		},
		components: {
			label: directory + '.json',
			href: metadata.apiUrl,
			ariaLabel: 'Raw JSON for ' + directory
		}
	}));

	const footerLinks = [
		{
			title: 'llms.txt',
			links: [
				{
					label: 'llms.txt',
					href: '/llms.txt',
					ariaLabel: 'LLMs.txt for all components'
				},
				...links.map((link) => link.llms)
			]
		},
		{
			title: 'components.json',
			links: links.map((link) => link.components)
		}
	];

	return {
		footerLinks
	};
}) satisfies LayoutServerLoad;
