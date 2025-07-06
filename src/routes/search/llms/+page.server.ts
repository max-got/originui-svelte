import type { PageServerLoad } from './$types';

import { getCategoriesWithDetails } from '$data/registry/query';

export const load = (async () => {
	const categories = getCategoriesWithDetails();

	const links = [
		{
			links: categories.map((category) => ({
				'aria-label': 'LLMs.txt for ' + category.slug,
				href: '/llms/' + category.slug + '.txt',
				label: 'llms/' + category.slug + '.txt'
			})),
			title: 'llms.txt'
		}
	];

	return { links };
}) satisfies PageServerLoad;
