import type { PageLoad } from './$types';

import type { Component } from 'svelte';

export const load = (async ({ data }) => {
	const components = await Promise.all(
		data.components.map(async (component) => {
			if (component.meta?.todo) {
				return {
					...component,
					Component: null
				} as const;
			}

			const Component = (await import(`$lib/registry/default/components/${component.name}.svelte`))
				.default as Component;
			return {
				...component,
				Component
			} as const;
		})
	);

	return { ...data, components };
}) satisfies PageLoad;
