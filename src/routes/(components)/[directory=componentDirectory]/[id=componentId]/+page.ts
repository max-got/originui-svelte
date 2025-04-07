import type { PageLoad } from './$types';

import type { Component } from 'svelte';

import { error } from '@sveltejs/kit';

export const load = (async ({ data }) => {
	const { componentMetadata: serverComponentMetadata } = data;

	const componentMetadata = await import(
		`$lib/components/${serverComponentMetadata.directory}/${serverComponentMetadata.id}.svelte`
	)
		.then((module) => module.default as Component)
		.catch((e) => {
			console.error(`Failed to load component ${serverComponentMetadata.id}:`, e);
			error(500, 'Failed to load component');
		});

	if (!componentMetadata) error(500, 'Failed to load component');

	return {
		component: {
			...serverComponentMetadata,
			Component: componentMetadata
		}
	};
}) satisfies PageLoad;
