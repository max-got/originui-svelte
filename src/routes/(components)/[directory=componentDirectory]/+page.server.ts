import type { PageServerLoad } from './$types';

import type { ComponentAPIResponseJSON } from '$data/api/components/components.handler';

import { dev } from '$app/environment';
import { fetchComponentsFromAPI } from '$data/api/components/components';
import { getCategory, PROJECT_NAME, SEO_DELIMITER } from '$lib/config';
import { getComponents, getComponentsByNames } from '$lib/data/registry/query';

function generatePageHeader(
	directory: string,
	componentData: Awaited<ReturnType<typeof fetchComponentsFromAPI>>
) {
	const { completed, total } = componentData.meta.fileStats;

	if (completed === total) {
		return {
			description: `A growing collection of ${total}
		${directory} components built with Svelte and Tailwind CSS.`,
			title: directory.charAt(0).toUpperCase() + directory.slice(1)
		};
	}

	return {
		description: `A growing collection of ${completed}/${total}
		${directory} components built with Svelte and Tailwind CSS.`,
		title: directory.charAt(0).toUpperCase() + directory.slice(1)
	};
}

function generateSEO(directory: string, componentsData: ComponentAPIResponseJSON) {
	return {
		description: `An extensive collection of ${componentsData.meta.fileStats.completed} copy-and-paste ${componentsData.meta.directory} components built with Svelte and TailwindCSS. Open-source and ready to drop into your projects.`,
		title: `${directory} ${SEO_DELIMITER} Svelte Components ${SEO_DELIMITER} ${PROJECT_NAME}`
	};
}

export const load = (async ({ fetch, params, setHeaders }) => {
	const { directory } = params;
	const category = getCategory(directory);
	if (!category) {
		return {
			components: []
		};
	}

	const components = getComponentsByNames(category.components.map((item) => item.name));
	// const componentsData = await fetchComponentsFromAPI(fetch, directory);

	return {
		components: components ?? []
	};

	// return {
	// 	componentsData,
	// 	pageHeader: generatePageHeader(directory, componentsData),
	// 	path: directory,
	// 	SEO: generateSEO(directory, componentsData)
	// };
}) satisfies PageServerLoad;
