export const prerender = true;

import type { PageLoad } from './$types.js';
import { createComponentRender } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ data }) => {
	const { componentMetadata } = data;

	const components = await Promise.all(
		componentMetadata.map(async (metadata) => createComponentRender(metadata))
	);

	return { components };
}) satisfies PageLoad;
