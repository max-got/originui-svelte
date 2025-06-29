import type { PageLoad } from './$types';

import type { Component } from 'svelte';

import ComponentUnavailable from '$lib/demo/new/component-unavailable.svelte';

export const load = (async ({ data }) => {
	try {
		const components = await Promise.all(
			data.components.map(async (component) => {
				if (component.meta?.todo) {
					return {
						...component,
						Component: ComponentUnavailable
					};
				}

				const Component = (
					await import(`$lib/registry/default/components/${component.name}.svelte`)
				).default as Component;
				return {
					...component,
					Component
				};
			})
		);

		return { components };
	} catch (error) {
		console.error(`Failed to load component ${data.components[0].name}:`, error);
		return { components: null };
	}
}) satisfies PageLoad;
