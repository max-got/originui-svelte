import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { PROJECT_NAME, SEO_DELIMITER } from '$lib/config';
import {
	type CategoryWithDetails,
	getCategoryWithDetails,
	getComponentsByNames
} from '$lib/data/registry/query';

function generatePageHeader(data: CategoryWithDetails) {
	const total = data.components.length;
	const completed = data.components.filter((component) => component.available).length;

	if (completed === total) {
		return {
			description: `A growing collection of ${total}
		${data.name} components built with Svelte and Tailwind CSS.`,
			title: data.name.charAt(0).toUpperCase() + data.name.slice(1)
		};
	}

	return {
		description: `A growing collection of ${completed}/${total}
		${data.name} components built with Svelte and Tailwind CSS.`,
		title: data.name.charAt(0).toUpperCase() + data.name.slice(1)
	};
}

function generateSEO(data: CategoryWithDetails) {
	const completed = data.components.filter((component) => component.available).length;
	return {
		description: `An extensive collection of ${completed} copy-and-paste ${data.name} components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.`,
		title: `${data.name} ${SEO_DELIMITER} Svelte Components ${SEO_DELIMITER} ${PROJECT_NAME}`
	};
}

export const load = (async ({ params }) => {
	const { directory } = params;
	const category = getCategoryWithDetails(directory);
	if (!category) error(404, 'Category not found');

	const components = getComponentsByNames(
		category.components.map((item) => item.registryItem?.name ?? '').filter(Boolean)
	);

	return {
		components: components ?? [],
		pageHeader: generatePageHeader(category),
		SEO: generateSEO(category)
	};
}) satisfies PageServerLoad;
