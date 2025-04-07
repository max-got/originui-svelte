import type { PageLoad } from './$types';

import type { Component } from 'svelte';

export const load = (async ({ data }) => {
	const { componentsData: serverComponentsData, ...rest } = data;

	const componentPromises = serverComponentsData.components.map(async (componentData) => {
		try {
			const Component = (await import(
				`$lib/components/${componentData.directory}/${componentData.id}.svelte`
			).then((module) => module.default)) as Component;

			return {
				...componentData,
				Component
			};
		} catch (error) {
			console.error(`Failed to load component ${componentData.path}:`, error);
			return {
				...componentData,
				Component: null
			};
		}
	});

	return {
		componentsData: {
			...serverComponentsData,
			components: await Promise.all(componentPromises)
		},
		...rest
	};
}) satisfies PageLoad;
