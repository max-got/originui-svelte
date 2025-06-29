import type { PageLoad } from './$types';

import type { Component } from 'svelte';

import ComponentUnavailable from '$lib/demo/new/component-unavailable.svelte';

export const load = (async ({ data }) => {
	const components = await Promise.all(
		data.components.map(async (component) => {
			if (component.meta?.todo) {
				return {
					...component,
					Component: ComponentUnavailable
				};
			}

			const Component = (await import(`$lib/registry/default/components/${component.name}.svelte`))
				.default as Component;
			return {
				...component,
				Component
			};
		})
	);

	return { ...data, components };
}) satisfies PageLoad;
